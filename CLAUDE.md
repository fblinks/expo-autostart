# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`expo-autostart` is an Android-only Expo native module that relaunches the host app automatically when the device finishes booting. Platform scope is fixed in `expo-module.config.json` (`"platforms": ["android"]`) — there is no iOS implementation and none is planned.

## Commands

Run from the repo root unless noted:

- `npm run build` — compiles `src/` to `build/` via `expo-module build` (a thin wrapper around `tsc`). Compiled output in `build/` is committed to git, so re-run this and commit the result after any `src/` change.
- `npm run lint` — `expo-module lint`, ESLint via the flat config in `eslint.config.js` (extends `expo-module-scripts/eslint.config.base`).
- `npm run clean` — removes `build/`.
- `npm run test` — `expo-module test` (Jest). No test files exist in this repo yet; running it will fail since `jest` isn't installed as a dependency.
- `npm run prepare` — runs on `npm install`/publish; rebuilds `build/`.

Type-check or lint a subset directly (bypasses the `expo-module` CLI, useful for quick iteration):
```
npx tsc -p tsconfig.json --noEmit
npx eslint src example/App.tsx --ext .ts,.tsx
```

### Example app (`example/`)

`example/` is a separate npm project (own `package.json`/lockfile/`node_modules`) that depends on `expo-autostart` via a `file:` dependency (`"expo-autostart": "../"`). This is required for Android autolinking to discover the module — Metro's own resolution of the module (for JS bundling) is separately configured in `example/metro.config.js` via `extraNodeModules`/`watchFolders`, but that alone does **not** wire up the native Gradle side.

- `cd example && npm run android` (`expo run:android`) / `npm run ios` (`expo run:ios`) — build and launch the example app on a connected device/emulator.
- After changing anything under `android/` or `src/`, run `npm install` inside `example/` if `package.json` there hasn't picked up the change, since it resolves the module via a filesystem symlink into the parent directory.
- To compile-check the native Kotlin directly without a full app build: `cd example/android && ./gradlew.bat :expo-autostart:compileDebugKotlin` (requires `local.properties` with `sdk.dir=<path>` using forward slashes — backslashes are a `.properties` escape character and will corrupt the path on Windows).
- `example/ios/` is currently stale relative to `example/android/` (last regenerated for an older React Native version) — `expo prebuild` cannot regenerate iOS from Windows without Xcode. Since the module is Android-only, this doesn't block Android development.

## Architecture

**Two-layer split, thin JS/TS layer over native Kotlin:**

- `src/index.ts` exports the public API and delegates directly to the native module (`src/ExpoAutostartModule.ts`, which calls `requireNativeModule('ExpoAutostart')`). There is no business logic in TS — all behavior lives in Kotlin.
- `android/src/main/java/expo/modules/autostart/ExpoAutostartModule.kt` defines the Expo Modules API surface (`Name("ExpoAutostart")`, `Function`/`AsyncFunction` blocks). Native `Context` access uses `appContext.reactContext ?: throw Exceptions.ReactContextLost()` — the convention also used by `expo-font`/`expo-asset` in `expo-modules-core`, not `applicationContext`.
- `android/src/main/java/expo/modules/autostart/BootReceiver.kt` is the actual mechanism: a `BroadcastReceiver` on `ACTION_BOOT_COMPLETED` that calls `startActivity` on the app's own launch intent. It runs independent of any JS call — registration comes entirely from the manifest, not from module initialization.
- `android/src/main/AndroidManifest.xml` declares `RECEIVE_BOOT_COMPLETED` and registers `BootReceiver` with `android:enabled="true"`. This is the *default* enabled state; `setAutostartEnabled()`/`isAutostartEnabled()` toggle/read it at runtime via `PackageManager.setComponentEnabledSetting`/`getComponentEnabledSetting`, always passing `PackageManager.DONT_KILL_APP` on writes (its absence kills the app's running process the instant the call is made). `COMPONENT_ENABLED_STATE_DEFAULT` (unset) is treated as enabled, matching the manifest default — a fresh install reports `isAutostartEnabled() === true` with no extra code.
- `initializeBootReceiver()` is a deprecated no-op kept only for backward compatibility with the `0.1.0` public API; it does nothing on the native side.
- There is no config plugin (`app.plugin.js`/`plugin/`) — the manifest merge into consumer apps relies entirely on standard Expo autolinking.

## Known repo quirks

- The compiled `build/` directory is committed to git rather than gitignored (the `.gitignore` rule for it is present but commented out, under the "Xcode" section where it doesn't belong). Keep `build/` in sync with `src/` manually via `npm run build` before committing source changes.
- `expo-module.config.json` duplicates the module name already in `package.json` (`"name": "expo-autostart"` in both) — a second source of truth if the package is ever renamed.
