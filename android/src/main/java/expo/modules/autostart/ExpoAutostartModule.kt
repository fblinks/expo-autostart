package expo.modules.autostart

import android.content.ComponentName
import android.content.Context
import android.content.pm.PackageManager
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAutostartModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  private val bootReceiverComponentName: ComponentName
    get() = ComponentName(context, BootReceiver::class.java)

  override fun definition() = ModuleDefinition {
    Name("ExpoAutostart")

    // Deprecated no-op retained for backward compatibility.
    // Use `setAutostartEnabled` / `isAutostartEnabled` instead.
    Function("initializeBootReceiver") {
      // no-op
    }

    Function("isAutostartEnabled") {
      val state = context.packageManager.getComponentEnabledSetting(bootReceiverComponentName)
      state == PackageManager.COMPONENT_ENABLED_STATE_DEFAULT ||
        state == PackageManager.COMPONENT_ENABLED_STATE_ENABLED
    }

    AsyncFunction("setAutostartEnabled") { enabled: Boolean ->
      val newState = if (enabled) {
        PackageManager.COMPONENT_ENABLED_STATE_ENABLED
      } else {
        PackageManager.COMPONENT_ENABLED_STATE_DISABLED
      }
      context.packageManager.setComponentEnabledSetting(
        bootReceiverComponentName,
        newState,
        PackageManager.DONT_KILL_APP
      )
    }
  }
}
