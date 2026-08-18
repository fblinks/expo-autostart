import { requireNativeModule } from 'expo-modules-core';

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
export interface ExpoAutostartModuleType {
  initializeBootReceiver(): void;
  isAutostartEnabled(): boolean;
  setAutostartEnabled(enabled: boolean): Promise<void>;
}

export default requireNativeModule<ExpoAutostartModuleType>('ExpoAutostart');
