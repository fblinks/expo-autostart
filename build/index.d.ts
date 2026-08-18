/**
 * @deprecated No-op retained for backward compatibility.
 * Use `setAutostartEnabled` to control launch-on-boot instead.
 */
export declare function initializeBootReceiver(): void;
/** Returns whether the app is currently set to launch automatically on device boot. */
export declare function isAutostartEnabled(): boolean;
/**
 * Enables or disables launching the app automatically on device boot.
 * Does not kill or restart the current app process.
 */
export declare function setAutostartEnabled(enabled: boolean): Promise<void>;
//# sourceMappingURL=index.d.ts.map