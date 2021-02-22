import React, { Component } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Easing,
    ScrollView
} from "react-native";

import Svg, { Rect, Polyline, Circle } from 'react-native-svg';
const AnimatedRect = Animated.createAnimatedComponent(Rect);

class SvgClass extends Component {
    animValue: Animated.Value;
    dashArray: Animated.ValueXY;
    element: any;

    constructor(props) {
        super(props);
        this.animValue = new Animated.Value(0);
        this.dashArray = new Animated.ValueXY({ x: 140, y: 540 });
    }

    componentDidMount() {

        this.dashArray.addListener((dashArray) => {
            this.element.setNativeProps(
                {
                    strokeDasharray: [
                        dashArray["x"].toString(),
                        dashArray["y"].toString()
                    ]
                });
        });
    }

    resetPie = () => {
        this.animValue.setValue(0);
        this.dashArray.setValue({ x: 140, y: 540 });
    };

    animate = () => {

        Animated.parallel([
            Animated.timing(
                this.animValue,
                {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.inOut(Easing.quad),
                }
            ),
            Animated.timing(
                this.dashArray,
                {
                    toValue: { x: 760, y: 0 },
                    duration: 500,
                    easing: Easing.inOut(Easing.quad),
                }
            )

        ]).start(() => {
            setTimeout(this.resetPie, 100);
        });

    };

    render() {
        let interpolatedDashOffset = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-470, 0]
        });
        let interpolatedWidth = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['8', '2']
        });
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Svg
                            height="60"
                            width="320"

                        >
                            <AnimatedRect
                                height="60"
                                width="320"
                                strokeDasharray={[140, 540]}
                                strokeDashoffset={interpolatedDashOffset}
                                strokeWidth={interpolatedWidth}
                                stroke="#19f6e8"
                                ref={(ref) => this.element = ref}
                                onPress={this.animate}
                            />
                        </Svg>
                        <Text style={styles.hover}>
                            TAP ME
                        </Text>
                    </View>

                    <Svg height="500" width="100%">
                        <Polyline
                            points="0,300 125,300 125,125 150,125 150,300 450,300 450,320 200,320 250,350 220,350 180,320 50,320 0,300"
                            fill="red"
                            strokeDasharray={[15, 5]}
                            stroke="white"
                            strokeWidth="2"
                        />

                        <Polyline
                            points="30,10 125,10 250,275 100,150 80,50 30,10"
                            fill="red"
                            strokeDasharray={[15, 5]}
                            stroke="white"
                            strokeWidth="2"
                        />
                        <Circle cx="100" cy="30" r="5" fill="#000" stroke="#fff" strokeWidth="2" />

                    </Svg>

                    <Svg height="150" width="300">
                        <Polyline
                            points="10,10 10,100 100,100 100,10 10,10 100,100"
                            fill="red"
                            strokeDasharray={[15, 5]}
                            stroke="white"
                            strokeWidth="2"
                        />
                    </Svg>

                    <Svg height="400" width="200">


                        <Polyline
                            points="0,0 200,0 200,350 0,350 0,0"
                            fill="green"
                            strokeDasharray={[15, 5]}
                            stroke="white"
                            strokeWidth="2"
                        />
                        <Circle cx="100" cy="100" r="70" fill="pink" />
                        <Polyline
                            points="25,100 100,300 175,100"
                            fill="brown"
                            stroke="black"
                            strokeWidth="2"
                        />

                    </Svg>
                </ScrollView>
            </View>
        );
    }
}

export default SvgClass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#333',
    },
    pieSVG: {
        shadowColor: "rgba(59, 74, 116, 0.35)",
        shadowOffset: {
            width: 0,
            height: 32
        },
        elevation: 12,
        shadowRadius: 12.5,
        shadowOpacity: 1,
    },
    hover: {
        color: '#fff',
        letterSpacing: 8,
        fontSize: 22,
        lineHeight: 32,
        position: "relative",
        top: -45
    }
});