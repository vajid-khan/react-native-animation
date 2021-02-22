import React, { Component } from "react";
import {
    View,
    Text,
    Animated,
    TextInput,
    StyleSheet,
} from "react-native";

import Button from '../../components/button/OutLineButton';

interface Time {
    minute: number,
    second: number,
}

interface TimerState {
    timer: Time,
}

class Timer extends Component<null, TimerState> {
    timerInterval: number;
    animatedSecond: Animated.Value;
    animatedMinuteValue: Animated.Value;
    animatedSecondValue: Animated.Value;

    constructor(props: Object) {
        super(props);
        this.state = {
            timer: {
                minute: 0,
                second: 60,
            },
        }
        this.timerInterval = 0;
        this.animatedSecond = new Animated.Value(0)
        this.animatedSecondValue = new Animated.Value(this.state.timer.second)
        this.animatedMinuteValue = new Animated.Value(this.state.timer.minute)
    }

    startTimer = () => {

        clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            let { second, minute } = this.state.timer;

            second--;

            if (second <= 0 && minute <= 0) {
                clearInterval(this.timerInterval)
                this.setState({
                    timer: { minute: 0, second: 0 }
                })
            } else {
                if (second <= 0) {
                    minute--;
                    second = 60;
                }
                this.setState({
                    timer: { second, minute }
                })
                this.animatedMinuteValue.setValue(minute);
                this.animatedSecondValue.setValue(second);
                Animated.sequence([
                    Animated.timing(this.animatedSecond, {
                        toValue: 0,
                        duration: 500
                    }),
                    Animated.timing(this.animatedSecond, {
                        toValue: 1,
                        duration: 500
                    }),
                ]).start()
            }
        }, 1000);
    }

    stopTimer = () => {
        clearInterval(this.timerInterval)
    }

    resetTimer = async () => {
        clearInterval(this.timerInterval);
        this.setState({
            timer: { minute: 0, second: 60 }
        })
    }


    renderTimer = () => {

        const { timer } = this.state;

        const animatedSecondTextStyle = {
            fontSize: this.animatedSecondValue.interpolate({
                inputRange: [0, 60],
                outputRange: [100, 125],
                extrapolate: 'clamp'
            }),
            opacity: this.animatedSecond.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.5],
                extrapolate: 'clamp'
            }),
            transform: [
                {
                    scale: this.animatedSecond.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2],
                        extrapolate: 'clamp'
                    })
                }
            ]
        }
        const animatedHourTextStyle = {
            fontSize: this.animatedMinuteValue.interpolate({
                inputRange: [0, 60],
                outputRange: [100, 125],
                extrapolate: 'clamp'
            })
        }
        return (
            <React.Fragment>
                <Animated.Text style={[styles.timerText, animatedHourTextStyle]}>
                    {timer.minute <= 9 ? '0' + timer.minute : timer.minute}
                </Animated.Text>
                <Text style={[styles.timerText]}>
                    {' : '}
                </Text>
                <Animated.Text style={[styles.timerText, animatedSecondTextStyle]}>
                    {timer.second <= 9 ? '0' + timer.second : timer.second}
                </Animated.Text>
            </React.Fragment>
        )
    }

    renderTimerPicker = () => {
        return (
            <React.Fragment>
                <TextInput
                    maxLength={2}
                    numberOfLines={1}
                    keyboardType='number-pad'
                    style={styles.input}
                    onChangeText={(minute) => this.setState({ timer: { minute: parseInt(minute) } })}
                />
                <Text style={styles.timerText}>
                    :
                </Text>
                <TextInput
                    maxLength={2}
                    numberOfLines={1}
                    keyboardType='number-pad'
                    style={styles.input}
                    onChangeText={(second) => this.setState({ timer: { minute: parseInt(second) } })}

                />
            </React.Fragment>
        )
    }

    render() {



        return (
            <View style={styles.container}>
                <View style={styles.timerContainer}>
                    {
                        this.renderTimer()
                    }
                </View>

                <View style={styles.controlContainer}>
                    <Button
                        // label='Start'
                        color='green'
                        icon='md-play'
                        press={this.startTimer}
                        style={styles.startButton}
                    />
                    <Button
                        // label='Stop'
                        color='grey'
                        icon='md-pause'
                        press={this.stopTimer}
                        style={styles.stopButton}
                    />
                    <Button
                        // label='Stop'
                        color='red'
                        icon='md-refresh'
                        press={this.resetTimer}
                        style={styles.stopButton}
                    />
                </View>
            </View>
        );
    }
}
export default Timer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    timerContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    timerText: {
        color: '#d3d3d3',
        fontSize: 100
    },
    controlContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    startButton: {
        flex: 1,
        borderRadius: 50
    },
    stopButton: {
        flex: 1,
        borderRadius: 50
    },
});