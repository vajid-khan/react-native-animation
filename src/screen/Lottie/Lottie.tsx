import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";

import _ from "lodash";
import LottieView from 'lottie-react-native';

const animations = [
    {
        uri: require('../../assets/lottie/react-logo.json')
    },
    {
        uri: require('../../assets/lottie/sedan-car-animation.json')
    },
    // {
    //     uri: require('../../assets/lottie/walking-dog.json')
    // },
    {
        uri: require('../../assets/lottie/error-animation.json')
    },
    {
        uri: require('../../assets/lottie/hotel-food.json')
    },
    // {
    //     uri: require('../../assets/lottie/iota.json')
    // },
    {
        uri: require('../../assets/lottie/morning-scenery.json')
    },
    {
        uri: require('../../assets/lottie/tick-animation.json')
    },
    {
        uri: require('../../assets/lottie/well-done.json')
    },
    {
        uri: require('../../assets/lottie/14158-loading-boxes-in-the-truck.json')
    },
    {
        uri: require('../../assets/lottie/13255-loader.json')
    },
    {
        uri: require('../../assets/lottie/13679-fast-food-mobile-app-loading.json')
    }

]

class Lottie extends Component {
    render() {
        return (
            <ScrollView>
                {
                    _.chunk(animations, 2).map((rowAnimation, i) => <Row key={i} cards={rowAnimation} />)
                }
            </ScrollView>
        );
    }
}

const Row = (props) => (
    <View style={styles.cardRow}>
        {
            props.cards.map((animation, i) => <LottieCard key={i} animation={animation} />)
        }
    </View>
)

const LottieCard = (props) => (
    <View style={styles.card}>
        <LottieView source={props.animation.uri} autoPlay loop />
    </View>
)
export default Lottie;

const styles = StyleSheet.create({
    cardRow: {
        flex: 1,
        flexDirection: 'row',
        height: 250,
    },
    card: {
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }
});