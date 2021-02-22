import React, { Component } from "react";
import {
    View,
    StyleSheet,
} from "react-native";

import Mails from './Mails';
import GmailHeader from "./Header";
import FloatingActionButton from "../FloatingActionButton/FloatingActionButton";

class Gmail extends Component {

    state = {
        actionButtonVisibility: 1
    }

    toggleAnimation = (value: number) => {
        this.setState({
            actionButtonVisibility: value
        })
    }

    static options() {
        return {
            statusBar: {
                backgroundColor: 'black',
                style: 'light'
            }
        }
    }

    render() {

        return (
            <View style={styles.container}>

                <GmailHeader toggleActionButton={this.toggleAnimation} />
                <Mails />
                {
                    this.state.actionButtonVisibility ? <FloatingActionButton fullContainer={false} scaleBackground={false} />
                        : null
                }

            </View>
        );
    }
}
export default Gmail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
});