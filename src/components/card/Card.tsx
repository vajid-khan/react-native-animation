import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from "react-native";

interface CardProps {
    card: {
        index: number,
        name: String,
        uri: String,
    }
}

const { height, width } = Dimensions.get('window');

class Card extends Component<CardProps> {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={this.props.card.uri}
                />
                <View style={styles.detail}>
                    <Text style={styles.name}>
                        {this.props.card.age}. {this.props.card.name}
                    </Text>
                </View>
            </View>
        );
    }
}
export default Card;

const styles = StyleSheet.create({
    container: {
        width: width - 60,
        height: height - 120,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    detail: {
        flex: 1,
        left: 0,
        padding: 10,
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.25)',

    },
    name: {
        fontSize: 30,
        color: 'white',
        textTransform: 'capitalize',
    }
});