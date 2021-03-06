package com.victorrik.miniprojects;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // Import this.
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  @Override
  public void invokeDefaultOnBackPressed() {
      moveTaskToBack(true);
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
      super.onCreate(savedInstanceState);
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MiniProyects";
  }
}
