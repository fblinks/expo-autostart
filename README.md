# expo-autostart

A module to automatically start an app at boot.

> **Android only.** There is no iOS implementation — iOS does not allow apps to launch themselves in the background on boot.

## Installation

```
npx expo install expo-autostart
```

Autolinking wires up the native `BootReceiver` and the `RECEIVE_BOOT_COMPLETED` permission automatically — no config plugin or manual native setup is needed. By default, the app will relaunch itself when the device finishes booting.

## Usage

```ts
import * as ExpoAutostart from 'expo-autostart';

// Check whether the app is currently set to launch on boot (enabled by default).
const enabled = ExpoAutostart.isAutostartEnabled();

// Let the user toggle it, e.g. from a settings screen.
await ExpoAutostart.setAutostartEnabled(false);
```

### API

- `isAutostartEnabled(): boolean` — returns whether the app is currently set to launch automatically on device boot.
- `setAutostartEnabled(enabled: boolean): Promise<void>` — enables or disables launch-on-boot. Does not kill or restart the current app process.
- `initializeBootReceiver(): void` — **deprecated**, no-op kept for backward compatibility. Use `setAutostartEnabled` instead.

## Example

See [`example/`](./example) for a runnable Expo app with a toggle UI. From the repo root:

```
cd example
npm install
npm run android
```
