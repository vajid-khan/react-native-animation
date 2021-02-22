import { Navigation } from "react-native-navigation"

import registerScreens from './src/navigation/registerScreens';

registerScreens();

Navigation.setDefaultOptions({
    topBar: {
        visible: false,
        drawBehind: true,
        background: 'translucent'
    },
    statusBar: {
        backgroundColor: 'white',
        style: 'dark'
    }
});

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            sideMenu: {
                left: {
                    component: {
                        name: 'LeftDrawer'
                    }
                },
                center: {
                    stack: {
                        children: [
                            {
                                component: {
                                    id: 'Home',
                                    name: 'Home'
                                }
                            },
                        ]
                    }
                }
            },

        },
    });
});