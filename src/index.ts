// Android only — see expo-module.config.json. Importing this module on other platforms throws.
import ExpoAutostartModule from './ExpoAutostartModule';

/**
 * @deprecated No-op retained for backward compatibility.
 * Use `setAutostartEnabled` to control launch-on-boot instead.
 */
export function initializeBootReceiver(): void {
  return ExpoAutostartModule.initializeBootReceiver();
}

/** Returns whether the app is currently set to launch automatically on device boot. */
export function isAutostartEnabled(): boolean {
  return ExpoAutostartModule.isAutostartEnabled();
}

/**
 * Enables or disables launching the app automatically on device boot.
 * Does not kill or restart the current app process.
 */
export function setAutostartEnabled(enabled: boolean): Promise<void> {
  return ExpoAutostartModule.setAutostartEnabled(enabled);
}
