// Import the native module. On web, it will be resolved to ExpoAutostart.web.ts
// and on native platforms to ExpoAutostart.ts
import ExpoAutostartModule from './ExpoAutostartModule';

export function initializeBootReceiver(): void {
  return ExpoAutostartModule.initializeBootReceiver();
}

