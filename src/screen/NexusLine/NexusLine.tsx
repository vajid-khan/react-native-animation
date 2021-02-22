import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions
} from "react-native";

import VerticalLine from './VerticalLine';
import HorizontaLine from './HorizontaLine';

const DURATION = 5000;
const { width, height } = Dimensions.get('window');

const getRandomColor = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    return rgb;
}

const getRandomPosition = max => {
    return Math.floor(Math.random() * max)
}

class NexusLine extends Component {

    state = {
        verticalLines: [],
        horizontalLines: []
    }

    static options() {
        return {
            statusBar: {
                backgroundColor: '#000',
                style: 'light'
            }
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setLines();
        }, DURATION * 2);

        this.setLines();
    }

    setLines = () => {
        this.setState({
            verticalLines: [],
            horizontalLines: []
        })
        const verticalLines = [];
        for (let i = 1; i <= 5; i++) {
            verticalLines.push({
                key: i,
                right: getRandomPosition(width),
                color: getRandomColor()
            })
        }

        const horizontalLines = [];

        for (let i = 1; i <= 5; i++) {
            horizontalLines.push({
                key: i + 5,
                right: getRandomPosition(height),
                color: getRandomColor()
            })
        }

        this.setState({
            verticalLines,
            horizontalLines
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.verticalLines.map(line => <VerticalLine
                        key={line.key}
                        right={line.right}
                        backgroundColor={line.color}
                        duration={DURATION} />)
                }

                {
                    this.state.horizontalLines.map(line => <HorizontaLine
                        key={line.key}
                        top={line.right}
                        backgroundColor={line.color}
                        duration={DURATION} />)
                }



            </View>
        );
    }
}

export default NexusLine;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },

});