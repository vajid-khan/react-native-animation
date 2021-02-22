import React, { Component } from "react";
import {
    View,
    Animated,
    StyleSheet,
    ScrollView,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons'

const MAX_SCROLL = 100;
const MAX_HEADER_HEIGHT = 150;
const MIN_HEADER_HEIGHT = 75;
const MAX_IMG_SIZE = 150;
const MIN_IMG_SIZE = 75;


class ScrollableHeader extends Component {
    scrollY: Animated.Value;

    constructor(props) {
        super(props);

        this.scrollY = new Animated.Value(0);
    }

    static options() {
        return {
            statusBar: {
                backgroundColor: 'red',
                style: 'light'
            }
        }
    }


    render() {

        const headerAimatedStle = {
            height: this.scrollY.interpolate({
                inputRange: [0, MAX_SCROLL],
                outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
                extrapolate: 'clamp'
            }),
            backgroundColor: this.scrollY.interpolate({
                inputRange: [0, MAX_SCROLL],
                outputRange: ['rgba(255,0,0,1)', 'rgba(255, 0, 0, 1)'],
                extrapolate: 'clamp'
            })
        };

        const imgheight = this.scrollY.interpolate({
            inputRange: [0, MAX_SCROLL],
            outputRange: [MAX_IMG_SIZE, MIN_IMG_SIZE],
            extrapolate: 'clamp'
        });

        const headerTextBottom = this.scrollY.interpolate({
            inputRange: [0, MAX_SCROLL / 2, MAX_SCROLL],
            outputRange: [-20, -20, 25],
            extrapolate: 'clamp'
        })

        const headerTextOpacity = this.scrollY.interpolate({
            inputRange: [0, MAX_SCROLL],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        const imgTop = this.scrollY.interpolate({
            inputRange: [0, MAX_SCROLL],
            outputRange: [MAX_HEADER_HEIGHT - MAX_IMG_SIZE / 2, 0],
            extrapolate: 'clamp'
        });

        const backArrowLeftPos = this.scrollY.interpolate({
            inputRange: [0, MAX_SCROLL],
            outputRange: [25, -50],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.header, headerAimatedStle]}>

                    <Animated.View style={{
                        position: 'absolute',
                        left: backArrowLeftPos,
                        top: 25
                    }} >
                        <Icon name='md-arrow-round-back' color='white' size={24} />
                    </Animated.View>

                    <Animated.Text style={[styles.headerText, {
                        bottom: headerTextBottom, opacity: headerTextOpacity
                    }]}>
                        VAJID KHAN
                    </Animated.Text>

                    <Icon name='md-settings' color='white' size={24} style={{
                        position: 'absolute',
                        right: 20,
                        top: 25
                    }} />

                </Animated.View>

                <Animated.View style={[styles.profileImgContainer, {
                    height: imgheight,
                    width: imgheight,
                    top: imgTop
                }]}>
                    <Animated.Image
                        style={styles.profileImg}
                        source={require('../../assets/images/image-1.jpg')}
                    />
                </Animated.View>

                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])}
                >

                    <View style={{ height: 1000 }} />

                </ScrollView>
            </View>
        );
    }
}
export default ScrollableHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        top: 0,
        right: 0,
        left: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        position: 'absolute',
    },
    profileImgContainer: {
        position: 'absolute',
        padding: 10,
    },
    profileImg: {
        flex: 1,
        width: null,
        height: null,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 75,
    },
});