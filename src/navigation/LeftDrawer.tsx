import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
} from "react-native";


import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const routes = [
    {
        name: 'Floating Action Button',
        route: 'FloatingActionButton',
        icon: 'md-arrow-forward'
    },
    {
        name: 'Scrollable Header',
        route: 'ScrollableHeader',
        icon: 'md-arrow-forward'
    },
    {
        name: 'Gmail',
        route: 'Gmail',
        icon: 'md-arrow-forward'
    },
    {
        name: 'Floating Input Label',
        route: 'InputField',
        icon: 'md-arrow-forward'
    },
    {
        name: 'Tinder Card',
        route: 'SwipeCard',
        icon: 'md-arrow-forward'
    },
    {
        name: 'Nexus Line',
        route: 'NexusLine',
        icon: 'md-arrow-forward'
    },
    {
        name: 'Timer',
        route: 'Timer',
        icon: 'md-arrow-forward'
    },
    {
        name: 'Svg',
        route: 'Svg',
        icon: 'md-arrow-forward'
    },
    {
        name: 'Lottie',
        route: 'Lottie',
        icon: 'md-arrow-forward'
    },
];

const navigate = route => {
    Navigation.mergeOptions('Home', {
        sideMenu: {
            left: {
                visible: false
            }
        }
    });
    Navigation.push('Home', {
        component: {
            name: route.route,
        }
    });
}

const LeftSideMenu = (props) => (
    <View style={[styles.container]}>
        {
            routes.map(route => <NavigationItem route={route} key={route.route} />)
        }
    </View>
)

const NavigationItem = ({ route }) => (
    <TouchableNativeFeedback
        onPress={() => navigate(route)}
    >
        <View style={styles.navigationItem}>
            <Text style={styles.navigationItemText}>
                {route.name}
            </Text>
            <Icon
                color='green'
                name={route.icon}
                style={styles.navigationItemIcon}
            />
        </View>
    </TouchableNativeFeedback>
)
export default LeftSideMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'white',
    },
    navigationItem: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
    },
    navigationItemIcon: {
        fontSize: 20,
    },
    navigationItemText: {
        fontSize: 20,
        marginRight: 10
    }
});