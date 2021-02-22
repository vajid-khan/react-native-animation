import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Animated,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
} from "react-native";

import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

interface GmailHeaderProps {
    toggleActionButton: Function;
}

class GmailHeader extends Component<GmailHeaderProps> {
    animatedvalue: Animated.Value;
    searchViewVisible: boolean;
    searchInputField: string | ((instance: TextInput | null) => void) | RefObject<TextInput> | null | undefined;

    constructor(props) {
        super(props);
        this.searchViewVisible = false;
        this.animatedvalue = new Animated.Value(0);
        this.searchInputField = React.createRef();
        this.state = {
            searchInputEnable: this.searchViewVisible
        }
    }

    toggleView = () => {
        Animated.timing(this.animatedvalue, {
            toValue: this.searchViewVisible ? 0 : 1,
            duration: 500,
        }).start(() => {
            this.searchViewVisible = !this.searchViewVisible
            this.setState({
                searchInputEnable: this.searchViewVisible
            }, () => {
                if (this.state.searchInputEnable) {
                    this.searchInputField.current.focus();
                }
                this.props.toggleActionButton(this.searchViewVisible ? 0 : 1);
            })
        })
    }

    render() {

        const containerAnimatedStyle = {
            marginHorizontal: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 5],
                extrapolate: 'clamp'
            }),
            marginTop: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 5],
                extrapolate: 'clamp'
            }),
        }

        const recentcontainerAnimatedStyle = {
            opacity: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            }),
            height: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height],
                extrapolate: 'clamp'
            }),
            marginHorizontal: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [15, 5],
                extrapolate: 'clamp'
            })
        }

        const firstLayerIconAnimatedStyle = {
            opacity: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: 'clamp'
            }),
            zIndex: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
                extrapolate: 'clamp'
            }),
            transform: [
                {
                    rotateX: this.animatedvalue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                        extrapolate: 'clamp'
                    }),
                },
            ]
        }

        const secondLayerIconAnimatedStyle = {
            opacity: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            }),
            zIndex: this.animatedvalue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: 'clamp'
            }),
            transform: [
                {
                    rotateX: this.animatedvalue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['180deg', '0deg'],
                        extrapolate: 'clamp'
                    }),
                },
            ]
        }

        return (
            <React.Fragment>
                <Animated.View style={[styles.container, containerAnimatedStyle]}>
                    <View style={styles.header}>

                        <View style={{ flex: 1 }}>
                            <Animated.View style={[styles.iconContainer, styles.leftStackIcons, firstLayerIconAnimatedStyle]}>
                                <TouchableNativeFeedback
                                    onPress={() => {

                                        Navigation.mergeOptions('Home', {
                                            sideMenu: {
                                                left: {
                                                    visible: true
                                                }
                                            }
                                        })
                                    }}
                                >
                                    <Icon name='md-menu' size={25} color='#ADADC9' />
                                </TouchableNativeFeedback>
                            </Animated.View>

                            <Animated.View style={[styles.iconContainer, styles.leftStackIcons, secondLayerIconAnimatedStyle]}>
                                <TouchableNativeFeedback
                                    onPress={this.toggleView}
                                >
                                    <Icon name='md-arrow-round-back' size={25} color='#ADADC9' />
                                </TouchableNativeFeedback>
                            </Animated.View>
                        </View>

                        <TouchableWithoutFeedback
                            onPress={this.toggleView}
                        >
                            <View style={styles.inputButton}>
                                <TextInput
                                    ref={this.searchInputField}
                                    placeholder='Search Mail'
                                    placeholderTextColor='white'
                                    editable={this.state.searchInputEnable}
                                    style={styles.searchInput}
                                />
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{ flex: 1 }}>
                            <Animated.View style={[styles.iconContainer, styles.rightStackIcons, firstLayerIconAnimatedStyle]}>
                                <TouchableNativeFeedback>
                                    <Image
                                        style={{
                                            height: 30,
                                            width: 30,
                                            borderRadius: 20
                                        }}
                                        source={require('../../assets/images/image-3.jpg')}
                                    />
                                </TouchableNativeFeedback>
                            </Animated.View>

                            <Animated.View style={[styles.iconContainer, styles.rightStackIcons, secondLayerIconAnimatedStyle]}>
                                <TouchableNativeFeedback>
                                    <Icon name='md-mic' size={25} color='#ADADC9' />
                                </TouchableNativeFeedback>
                            </Animated.View>
                        </View>

                    </View>
                </Animated.View>

                <Animated.View style={[styles.recentSeachContainer, recentcontainerAnimatedStyle]}>
                    <ScrollView>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item, index) => <RecentSearchItem item={item} key={index} />)
                        }
                    </ScrollView>
                </Animated.View>

            </React.Fragment>

        );
    }
}


const RecentSearchItem = (props) => (
    <TouchableNativeFeedback>
        <View style={styles.recentSeachItem}>
            <View style={styles.recentSeachItemIcon}>
                <Icon name='md-time' size={25} color='#ADADC9' />
            </View>
            <Text style={styles.recentSeachItemText}>
                Recent Search Item #{props.item}
            </Text>
        </View>
    </TouchableNativeFeedback>
)



export default GmailHeader;

const styles = StyleSheet.create({
    container: {
        height: 60,
    },
    header: {
        flex: 1,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#3b444b',
    },
    leftStackIcons: {
        position: 'absolute',
        left: 10,
        top: 17
    },
    rightStackIcons: {
        position: 'absolute',
        right: 10,
        top: 15
    },
    iconContainer: {
        // alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 5
    },
    inputButton: {
        flex: 8,
        justifyContent: 'center',
    },
    searchInput: {
        fontSize: 18,
        color: 'white',
        paddingLeft: 10,
    },
    recentSeachContainer: {
        backgroundColor: '#3b444b',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    recentSeachItem: {
        padding: 20,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#000',
        justifyContent: 'center',
    },
    recentSeachItemIcon: {
        flex: 1
    },
    recentSeachItemText: {
        flex: 9,
        color: '#eee',
        fontSize: 16
    }

});