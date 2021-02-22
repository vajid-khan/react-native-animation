import React, { Component } from "react";
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback,
} from "react-native";


const { width, height } = Dimensions.get('window');
const buttonWidth = width / 5;

import Icon from 'react-native-vector-icons/Ionicons'

class BottomBarNavigation extends Component {
    animatedValue: Animated.Value;
    activeTab: number;

    constructor(props) {
        super(props);

        this.activeTab = 0
        this.animatedValue = new Animated.Value(this.activeTab);
        this.state = {
            activeButton: 1,
            buttons: [
                {
                    name: 'Home',
                    icon: 'md-home'
                },
                {
                    name: 'News',
                    icon: 'md-menu'
                },
                {
                    name: 'Profile',
                    icon: 'md-contact'
                },
                {
                    name: 'Setting',
                    icon: 'md-cog'
                },
                {
                    name: 'Logout',
                    icon: 'md-log-out'
                }
            ]
        }

    }

    switchTabs = index => {

        Animated.timing(this.animatedValue, {
            toValue: index,
            duration: 500,
        }).start(() => {
            this.activeTab = index
        })
    }

    renderButton = (button, index) => {

        return (
            <View style={styles.buttonContainer} key={button.name} >
                <TouchableNativeFeedback onPress={() => this.switchTabs(index)} >
                    <Icon name={button.icon} color='#fff' size={25} />
                </TouchableNativeFeedback>
            </View>
        )
    }

    render() {

        const animatedButtonStyle = {
            left: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 3, 4],
                outputRange: [buttonWidth * 1 - 65, buttonWidth * 2 - 65, buttonWidth * 3 - 65, buttonWidth * 4 - 65, buttonWidth * 5 - 65],
                extrapolate: 'clamp'
            })
        }

        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    {
                        this.state.buttons.map((button, index) => this.renderButton(button, index))
                    }
                </View>
                <Animated.View style={[styles.activeButton, animatedButtonStyle]} />
            </View>
        );
    }
}
export default BottomBarNavigation;

const styles = StyleSheet.create({
    container: {
        height: 60,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'red',
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    buttonContainer: {
        padding: 15,
        borderRadius: 30,
    },

    activeButton: {
        position: 'absolute',
        top: 5,
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 10,
    },


});