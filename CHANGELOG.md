# Changelog

## Unpublished

### 🛠 Breaking changes

### 🎉 New features

### 🐛 Bug fixes

### 💡 Others

## 0.2.0 — 2026-08-20

### 🛠 Breaking changes

### 🎉 New features

- Added `setAutostartEnabled(enabled)` and `isAutostartEnabled()` to control and query launch-on-boot at runtime, without killing the app process. `initializeBootReceiver()` is now deprecated in favor of these.

### 🐛 Bug fixes

- Fix `npm install` of this package as a git dependency failing entirely during `prepare`: `typescript` was never declared as a dependency, so `npx tsc` could resolve an unrelated abandoned `tsc` package from the registry instead of the TypeScript compiler when `typescript` wasn't incidentally hoisted from a sub-dependency. Added `typescript` as an explicit devDependency.

### 💡 Others
