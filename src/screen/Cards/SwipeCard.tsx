import React, { Component } from "react";
import {
    View,
    Text,
    Animated,
    StatusBar,
    StyleSheet,
    Dimensions,
    PanResponder,
    TouchableNativeFeedback,
} from "react-native";


import Card from '../../components/card/Card';
import Icon from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('window');
const SWIPE_LIMIT = 120;

interface CardInterface {
    index: Number, name: String, uri: String, age: number
}

interface SwipeCardState {
    currenIndex: number,
    cards: Array<CardInterface>
}

class SwipeCard extends Component<{}, SwipeCardState> {
    panResponder: any;
    animatedValue: Animated.ValueXY;
    frontCardAnimatedStyle: {};
    otherCardAnimatedStyle: {};
    containerStyle: {};


    constructor(props) {
        super(props);

        this.animatedValue = new Animated.ValueXY({ x: 0, y: 0 });

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,

            onPanResponderMove: (evt, gestureState) => {
                this.animatedValue.setValue({
                    x: gestureState.dx,
                    y: gestureState.dy
                })
            },
            onPanResponderRelease: (evt, gestureState) => {
                let currentIndex = this.state.currenIndex;

                if (gestureState.dx <= -SWIPE_LIMIT) {

                    Animated.spring(this.animatedValue, {
                        toValue: { x: -2000, y: gestureState.dy },
                    }).start(() => {
                        this.setState({
                            currenIndex: ++currentIndex
                        });
                    });
                    this.animatedValue.setValue({ x: 0, y: 0 })


                } else if (gestureState.dx >= SWIPE_LIMIT) {
                    Animated.spring(this.animatedValue, {
                        toValue: { x: 2000, y: gestureState.dy },
                    }).start(() => {
                        this.setState({
                            currenIndex: ++currentIndex
                        });
                    });
                    this.animatedValue.setValue({ x: 0, y: 0 })

                } else {
                    Animated.spring(this.animatedValue, {
                        toValue: { x: 0, y: 0 },
                        friction: 5
                    }).start()
                }
            }

        });

        this.frontCardAnimatedStyle = {
            transform: [
                {
                    rotate: this.animatedValue.x.interpolate({
                        inputRange: [-width, 0, width],
                        outputRange: ['-30deg', '0deg', '30deg'],
                        extrapolate: 'clamp'
                    })
                },
                {
                    scale: this.animatedValue.x.interpolate({
                        inputRange: [-width, 0, width],
                        outputRange: [2, 1, 2],
                        extrapolate: 'clamp'
                    })
                },
                ...this.animatedValue.getTranslateTransform()
            ]
        }

        this.otherCardAnimatedStyle = {
            transform: [
                {
                    scale: this.animatedValue.x.interpolate({
                        inputRange: [-width, 0, width],
                        outputRange: [1, 0.8, 1],
                        extrapolate: 'clamp'
                    })
                }
            ],
        }

        this.containerStyle = {
            backgroundColor: this.animatedValue.x.interpolate({
                inputRange: [-width / 2, 0, width / 2],
                outputRange: ['rgba(255,0,0,1)', 'rgba(0,0,0,0.25)', 'rgba(0,128,0,0.5)'],
                extrapolate: 'clamp'
            })
        }

        this.state = {
            currenIndex: 1,
            cards: [
                {
                    index: 1,
                    age: 1,
                    name: 'Nature',
                    uri: require('../../assets/images/image-1.jpg')
                },
                {
                    index: 2,
                    age: 2,
                    name: 'Nature',
                    uri: require('../../assets/images/image-2.jpg')
                },
                {
                    index: 3,
                    age: 3,
                    name: 'Nature',
                    uri: require('../../assets/images/image-3.jpg')
                },
                {
                    index: 4,
                    age: 4,
                    name: 'Nature',
                    uri: require('../../assets/images/image-4.jpg')
                },
                {
                    index: 5,
                    age: 5,
                    name: 'Nature',
                    uri: require('../../assets/images/image-5.jpg')
                },
                {
                    index: 6,
                    age: 6,
                    name: 'Nature',
                    uri: require('../../assets/images/image-6.jpg')
                },
                {
                    index: 7,
                    age: 8,
                    name: 'Nature',
                    uri: require('../../assets/images/image-7.jpg')
                }
            ]
        }
    }

    reset = () => {
        this.setState({
            currenIndex: 1
        }, () => {
            this.animatedValue.setValue({ x: 0, y: 0 })
        })
    }

    renderResetCard = () => (
        <TouchableNativeFeedback
            onPress={this.reset}
        >
            <View style={[styles.card, {
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                flexDirection: 'row'
            }]}>
                <Text style={{
                    fontSize: 25,
                    marginRight: 10
                }}>
                    Start Again
                </Text>
                <Icon name="md-refresh" size={25} />
            </View>
        </TouchableNativeFeedback>
    )

    cardItem = (card: CardInterface) => {

        if (card.index < this.state.currenIndex) {
            return null;
        }
        if (card.index == this.state.currenIndex) {

            return (
                <Animated.View style={[styles.card, {
                }, this.frontCardAnimatedStyle]} key={card.index}
                    {...this.panResponder.panHandlers}
                >
                    <Card card={card} />
                </Animated.View>
            );
        }
        return (
            <Animated.View style={[styles.card, this.otherCardAnimatedStyle]} key={card.index}>
                <Card card={card} />
            </Animated.View>
        )

    }

    render() {
        return (
            <Animated.View style={[styles.container, this.containerStyle]}>
                <StatusBar backgroundColor='rgba(0,0,0,0.25)' barStyle='dark-content' />
                <View style={styles.cardContainer}>
                    {
                        this.state.currenIndex >= 8 ? this.renderResetCard() :
                            this.state.cards.map(card => this.cardItem(card)).reverse()
                    }
                </View>
            </Animated.View>
        );
    }
}

export default SwipeCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
    }
});