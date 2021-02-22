import React, { Component } from "react";
import {
    View,
    Animated,
    TextInput,
    StyleSheet,
} from "react-native";

interface FloatingLabelInputProps {
    label: string,
    name: string,
    color: string,
    text: string
}

interface FloatingLabelInputState {
    text: string
}

class FloatingLabelInput extends Component<FloatingLabelInputProps, FloatingLabelInputState> {

    static defaultProps: { label: string; name: string; color: string; };
    animatedValue: Animated.Value;
    isLabelFloating: boolean;

    constructor(props) {
        super(props)
        this.isLabelFloating = false;
        this.animatedValue = new Animated.Value(0);

        this.state = {
            text: props.text
        }
    }

    componentDidMount() {
        if (this.state.text.length) {
            this.isLabelFloating = true;
            this.animatedValue.setValue(1);
        }
    }

    toggleAnimation = () => {
        Animated.timing(this.animatedValue, {
            toValue: this.isLabelFloating && !this.state.text.length ? 0 : 1,
            duration: 250,
        }).start(() => this.isLabelFloating = !this.isLabelFloating)
    }

    textChange = (text: string) => {
        this.setState({ text });
    }

    render() {
        const { label, color } = this.props

        const animatedLabelStyle = {
            top: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [40, 10],
                extrapolate: 'clamp',
            }),
        }
        const animatedLabelTextStyle = {
            fontSize: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 18],
                extrapolate: 'clamp',
            }),
            // to remove view flicker cause due to font size increase/decrease
            paddingBottom: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 2],
                extrapolate: 'clamp',
            }),
        }

        return (

            <View style={[styles.container, styles.containerBorder, { borderColor: color }]}>
                <Animated.View style={[styles.labelContainer, animatedLabelStyle]}>
                    <Animated.Text style={[styles.labelText, animatedLabelTextStyle]}>
                        {label}
                    </Animated.Text>
                </Animated.View>
                <TextInput
                    onChangeText={this.textChange}
                    onBlur={this.toggleAnimation}
                    onFocus={this.toggleAnimation}
                    value={this.state.text}
                    style={[styles.input, { borderBottomColor: color }]}
                />
            </View>
        );
    }
}

FloatingLabelInput.defaultProps = {
    label: 'Label',
    name: ' Name',
    color: 'red'
}
export default FloatingLabelInput;

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    containerBorder: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderColor: 'red',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
    },
    labelContainer: {
        paddingHorizontal: 10,
    },
    labelText: {
    },
    input: {
        fontSize: 20,
        borderBottomWidth: 1,
        paddingLeft: 10
    }
});