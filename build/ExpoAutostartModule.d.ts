export interface ExpoAutostartModuleType {
    initializeBootReceiver(): void;
    isAutostartEnabled(): boolean;
    setAutostartEnabled(enabled: boolean): Promise<void>;
}
declare const _default: ExpoAutostartModuleType;
export default _default;
//# sourceMappingURL=ExpoAutostartModule.d.ts.map