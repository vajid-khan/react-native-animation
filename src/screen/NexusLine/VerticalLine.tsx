import React, { Component } from "react";
import {
    Animated,
    StyleSheet,
    Dimensions
} from "react-native";

const { width, height } = Dimensions.get('window');

interface VerticalLineProps {
    right: number,
    backgroundColor: string,
    duration: number
}

class VerticalLine extends Component<VerticalLineProps> {
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
            height: this.animatedHeight.interpolate({
                inputRange: [0, height],
                outputRange: [0, height],
                extrapolate: 'clamp'
            }),
            top: this.animatedTop.interpolate({
                inputRange: [0, height],
                outputRange: [0, height],
                extrapolate: 'clamp'
            }),
        }

        const { right, backgroundColor } = this.props

        return (
            <Animated.View style={[styles.line, { right, backgroundColor }, animatedStyle]} />
        );
    }
}
export default VerticalLine;

const styles = StyleSheet.create({
    line: {
        width: 10,
        borderRadius: 5,
        position: 'absolute',
    }
});