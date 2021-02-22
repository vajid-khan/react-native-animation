import React, { Component } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    TouchableNativeFeedback,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons'

interface OutLineButtonProps {
    label?: string,
    icon: string,
    color?: string,
    press: Function,
    style?: Object
}

class OutLineButton extends Component<OutLineButtonProps> {
    animatedvalue: Animated.Value;

    constructor(props) {
        super(props);
        this.animatedvalue = new Animated.Value(0);
    }

    toggleAnimation = () => {

        this.props.press();

        Animated.timing(this.animatedvalue, {
            toValue: 1,
            duration: 500
        }).start(() => {
            setTimeout(() => {
                Animated.timing(this.animatedvalue, {
                    toValue: 0,
                    duration: 500
                }).start();
            }, 0);
        })
    }

    render() {

        const animatedBgStyle = {

            transform: [
                {
                    scale: this.animatedvalue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.975],
                        extrapolate: 'clamp'
                    }),
                }
            ]
        }

        const { icon, label, style, color } = this.props;

        return (
            <TouchableNativeFeedback
                onPress={this.toggleAnimation}
            >
                <Animated.View style={[styles.container, style, animatedBgStyle]}>

                    <Icon
                        name={icon}
                        size={25}
                        color={color}
                    />
                    {
                        label ? (
                            <Text style={[styles.buttonText, { color }]}>
                                {label}
                            </Text>
                        ) : null
                    }

                </Animated.View>
            </TouchableNativeFeedback>
        );
    }
}
export default OutLineButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        borderWidth: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    buttonText: {
        fontSize: 20,
        paddingHorizontal: 10,
        textTransform: 'uppercase',
    },
});