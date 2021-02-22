/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import {
	View,
	Text,
	Animated,
	AsyncStorage,
	TouchableNativeFeedback,
} from 'react-native';

import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';

interface AppState {
	lastOpen: string
}

class App extends Component<{}, AppState> {
	animatedValue: Animated.Value;

	constructor(props) {
		super(props);
		this.state = {
			lastOpen: ''
		}

		this.animatedValue = new Animated.Value(0);
	}

	static options() {
		return {
			statusBar: {
				backgroundColor: 'black',
				style: 'light'
			}
		}
	}

	componentDidMount() {

		AsyncStorage.getItem('app-last-open')
			.then((lastOpen) => {
				this.setState({ lastOpen });
				Animated.timing(this.animatedValue, {
					duration: 500,
					toValue: 1,
					// delay: 1500
				}).start()

			})
			.catch(() => {
				this.setState({
					lastOpen: ''
				});
			})
			.then(() => {
				AsyncStorage.setItem('app-last-open', (new Date()).toISOString())
			})

	}

	render() {

		const animatedAppLaunchStyle = {
			width: this.animatedValue.interpolate({
				inputRange: [0, 0, 1],
				outputRange: ['0%', '50%', '100%']
			})
		}

		return (
			<View style={{ flex: 1, padding: 20, backgroundColor: '#000' }}>

				<View style={{ flex: 3 }}>
					<LottieView source={require('../assets/lottie/react-logo.json')} autoPlay loop />
				</View>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					{
						this.state.lastOpen ? (
							<Animated.Text style={[{ fontSize: 20, color: '#d3d3d3', marginHorizontal: '20%' }, animatedAppLaunchStyle]}>
								{'Last App Launch : ' + this.state.lastOpen}
							</Animated.Text>
						) : null
					}
				</View>

				<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontSize: 20, color: '#d3d3d3' }}>
						Toggle Side Menu to see content
					</Text>
				</View>

				<View style={{ flex: 1 }}>

					<TouchableNativeFeedback onPress={() => {
						Navigation.mergeOptions('Home', {
							sideMenu: {
								left: {
									visible: true
								}
							}
						})
					}}>
						<View style={{
							padding: 20,
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center',
							borderColor: '#d3d3d3',
							borderRadius: 5,
							borderWidth: 2,
							flexDirection: 'row'
						}}>


							<View style={{ paddingRight: 20 }}>
								<Icon name='md-arrow-back' size={25} color='#d3d3d3' />
							</View>
							<Text style={{ fontSize: 18, color: '#d3d3d3' }}>
								Toggle Side Menu
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>

			</View>
		);
	}

}

export default App;
