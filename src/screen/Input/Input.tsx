import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";

import FloatingLabelInput from '../../components/input/floatingLabelInput/FloatingLabelInput';

class Input extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FloatingLabelInput label='Enter Name' color='#d3d3d3' text='' />
                <FloatingLabelInput label='Enter Age' color='cyan' text='' />
                <FloatingLabelInput label='Enter Email' color='red' text='' />
                <FloatingLabelInput label='Enter Phone' color='black' text='9022903205' />

            </View>
        );
    }
}
export default Input;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});