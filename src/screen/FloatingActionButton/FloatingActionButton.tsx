import React, { Component } from "react";
import {
    View,
    Animated,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome'

interface FloatingActionButtonProps {
    fullContainer: boolean;
    scaleBackground: boolean;
}

class FloatingActionButton extends Component<FloatingActionButtonProps> {
    animatedvalue: Animated.Value;
    isMenuOpen: boolean;
    static defaultProps: { fullContainer: boolean, scaleBackground: boolean };

    constructor(props) {
        super(props);
        this.isMenuOpen = false;
        this.animatedvalue = new Animated.Value(0)
    }

    toggleMenu = () => {
        Animated.timing(this.animatedvalue, {
            toValue: this.isMenuOpen ? 0 : 1,
            duration: 750
        }).start(() => {
            this.isMenuOpen = !this.isMenuOpen
        });
    }

    render() {

        const toggleButtonStyle = {

            transform: [
                {
                    rotate: this.animatedvalue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '225deg'],
                        extrapolate: 'clamp',
                    })
                }
            ]
        }
        const translateHomeY = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        })
        const translateCarY = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -110],
            extrapolate: 'clamp',
        })
        const translateInrY = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -175],
            extrapolate: 'clamp',
        })
        const opacity = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        })
        const scale = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
            extrapolate: 'clamp',
        })
        const bgScale = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, this.props.scaleBackground ? 50 : 1],
            extrapolate: 'clamp',
        })

        const labelAimatedStle = {
            width: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
                extrapolate: 'clamp',
            }),
            opacity: this.animatedvalue.interpolate({
                inputRange: [0, 0.5, 0.8, 1],
                outputRange: [0, 0, 0.5, 1],
                extrapolate: 'clamp',
            })
        }

        return (
            <View style={this.props.fullContainer ? styles.content : {}}>

                <Animated.View
                    style={[
                        styles.container,
                        { width: 60, height: 60, backgroundColor: 'rgba(152,191,100,0.4)', zIndex: -1, borderRadius: 30 },
                        {
                            transform: [
                                {
                                    scale: bgScale
                                }
                            ]
                        }
                    ]}
                />
                <Animated.View
                    style={[styles.menuContainer, {
                        opacity: opacity,
                        transform: [
                            {
                                translateY: translateInrY,
                            }, {
                                scale: scale
                            }
                        ]
                    }]}
                >
                    <TouchableOpacity>
                        <View style={[styles.button, styles.menuButton]}>
                            <Animated.Text style={[styles.label, labelAimatedStle]}>
                                INR
                            </Animated.Text>
                            <Icon name='inr' size={18} color='white' />
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={[styles.menuContainer, {
                        opacity: opacity,
                        transform: [
                            {
                                translateY: translateCarY
                            }, {
                                scale: scale
                            }
                        ]
                    }]}
                >
                    <TouchableOpacity>
                        <View style={[styles.button, styles.menuButton]}>
                            <Animated.Text style={[styles.label, labelAimatedStle]}>
                                CAR
                            </Animated.Text>
                            <Icon name='car' size={18} color='white' />
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={[styles.menuContainer, {
                        opacity: opacity,
                        transform: [
                            {
                                translateY: translateHomeY
                            }, {
                                scale: scale
                            }
                        ]
                    }]}
                >
                    <TouchableOpacity>
                        <View style={[styles.button, styles.menuButton]}>
                            <Animated.Text style={[styles.label, labelAimatedStle]}>
                                HOME
                            </Animated.Text>
                            <Icon name='home' size={18} color='white' />
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={[styles.container, toggleButtonStyle]}
                >
                    <TouchableOpacity
                        onPress={this.toggleMenu}
                    >
                        <View style={styles.button}>
                            <Icon name='plus' size={22} color='white' />
                        </View>
                    </TouchableOpacity>
                </Animated.View>


            </View>
        );
    }
}

FloatingActionButton.defaultProps = {
    fullContainer: true,
    scaleBackground: true,
}

export default FloatingActionButton;

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    container: {
        bottom: 20,
        right: 20,
        position: 'absolute',
    },
    menuContainer: {
        bottom: 50,
        right: 25,
        position: 'absolute',
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    menuButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    label: {
        top: 12,
        right: 60,
        padding: 3,
        fontSize: 16,
        color: 'white',
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: 'red',
        position: 'absolute',
    }
});