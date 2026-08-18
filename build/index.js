// Import the native module. On web, it will be resolved to ExpoAutostart.web.ts
// and on native platforms to ExpoAutostart.ts
import ExpoAutostartModule from './ExpoAutostartModule';
/**
 * @deprecated No-op retained for backward compatibility.
 * Use `setAutostartEnabled` to control launch-on-boot instead.
 */
export function initializeBootReceiver() {
    return ExpoAutostartModule.initializeBootReceiver();
}
/** Returns whether the app is currently set to launch automatically on device boot. */
export function isAutostartEnabled() {
    return ExpoAutostartModule.isAutostartEnabled();
}
/**
 * Enables or disables launching the app automatically on device boot.
 * Does not kill or restart the current app process.
 */
export function setAutostartEnabled(enabled) {
    return ExpoAutostartModule.setAutostartEnabled(enabled);
}
//# sourceMappingURL=index.js.map