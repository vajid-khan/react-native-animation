package com.cloneapp;

import java.util.List;
import java.util.Arrays;
import android.app.Application;
import com.horcrux.svg.SvgPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.PackageList;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactApplication;
import com.reactnativenavigation.react.ReactGateway;
import com.airbnb.android.react.lottie.LottiePackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;

public class MainApplication extends NavigationApplication{

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new SvgPackage(),
            new LottiePackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

}
