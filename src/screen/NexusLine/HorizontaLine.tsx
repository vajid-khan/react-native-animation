import React, { Component } from "react";
import {
    Animated,
    StyleSheet,
    Dimensions
} from "react-native";

const { width, height } = Dimensions.get('window');

interface HorizontalProps {
    top: number,
    backgroundColor: string,
    duration: number
}

class Horizontal extends Component<HorizontalProps> {
    animatedHeight: Animated.Value;
    animatedTop: Animated.Value;

    constructor(props) {
        super(props);
        this.animatedHeight = new Animated.Value(0);
        this.animatedTop = new Animated.Value(0);
    }

    componentDidMount() {

        Animated.sequence([
            Animated.timing(this.animatedHeight, {
                toValue: height,
                duration: this.props.duration
            }),
            Animated.timing(this.animatedTop, {
                toValue: height,
                duration: this.props.duration - 500,
            })
        ]).start()

    }

    render() {

        const animatedStyle = {
            width: this.animatedHeight.interpolate({
                inputRange: [0, width],
                outputRange: [0, width],
                extrapolate: 'clamp'
            }),
            left: this.animatedTop.interpolate({
                inputRange: [0, width],
                outputRange: [0, width],
                extrapolate: 'clamp'
            }),
        }

        const { top, backgroundColor } = this.props

        return (
            <Animated.View style={[styles.line, { top, backgroundColor }, animatedStyle]} />
        );
    }
}
export default Horizontal;

const styles = StyleSheet.create({
    line: {
        right: 0,
        width: 100,
        height: 10,
        borderRadius: 5,
        position: 'absolute',
    }
});