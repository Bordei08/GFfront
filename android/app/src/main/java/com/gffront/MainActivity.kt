package com.gffront

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "GFfront"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Important pentru API 34/35: fă fereastra să NU mai deseneze sub system bars
    WindowCompat.setDecorFitsSystemWindows(window, true)

    // (opțional) setează stilul iconițelor din status bar
    // true = iconițe închise (dark) pe status bar deschis; false invers
    val controller = WindowInsetsControllerCompat(window, window.decorView)
    controller.isAppearanceLightStatusBars = false
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
