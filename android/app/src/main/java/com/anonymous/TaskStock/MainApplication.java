package com.anonymous.TaskStock;

import android.Manifest;
import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import com.anonymous.TaskStock.BuildConfig;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import java.util.List;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(
    this,
    new DefaultReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();

        // Packages that cannot be autolinked yet can be added manually here, for example:
        // packages.add(new MyReactNativePackage());
        //  packages.add(new ReactNativeFirebaseAppPackage());

        // packages.add(new SplashScreenReactPackage());
        return packages;
      }

      @Override
      protected String getJSMainModuleName() {
        return ".expo/.virtual-metro-entry";
      }

      @Override
      protected boolean isNewArchEnabled() {
        return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
      }

      @Override
      protected Boolean isHermesEnabled() {
        return BuildConfig.IS_HERMES_ENABLED;
      }
    }
  );

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */false);
    if (!BuildConfig.REACT_NATIVE_UNSTABLE_USE_RUNTIME_SCHEDULER_ALWAYS) {
      ReactFeatureFlags.unstable_useRuntimeSchedulerAlways = false;
    }
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    if (BuildConfig.DEBUG) {
      ReactNativeFlipper.initializeFlipper(
        this,
        getReactNativeHost().getReactInstanceManager()
      );
    }
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }

  // 추가한 코드
  private static final int REQUEST_EXTERNAL_STORAGE = 1;
  private static final String[] PERMISSIONS_STORAGE = {
    Manifest.permission.READ_EXTERNAL_STORAGE,
  };

  public static void verifyStoragePermissions(Activity activity) {
    // Check if we have write permission
    int permission = ActivityCompat.checkSelfPermission(
      activity,
      Manifest.permission.READ_EXTERNAL_STORAGE
    );

    if (permission != PackageManager.PERMISSION_GRANTED) {
      // We don't have permission so prompt the user
      ActivityCompat.requestPermissions(
        activity,
        PERMISSIONS_STORAGE,
        REQUEST_EXTERNAL_STORAGE
      );
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      if (!Environment.isExternalStorageManager()) {
        Intent intent = new Intent(
          Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION
        );
        activity.startActivity(intent);
      }
    }
  }
}
