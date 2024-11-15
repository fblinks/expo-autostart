package expo.modules.autostart

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAutostartModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoAutostart')` in JavaScript.
    Name("ExpoAutostart")

    // You can add any additional methods to interact with the BootReceiver
    Function("initializeBootReceiver") {
        // This could be used to configure or initialize the receiver if necessary
    }
  }
}
