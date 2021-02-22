import * as screens from '../screen/index';
import LeftDrawer from '../navigation/LeftDrawer';
import { Navigation } from "react-native-navigation"

export default registerScreens = () => {
    Navigation.registerComponent('Home', () => screens.App);
    Navigation.registerComponent('Svg', () => screens.Svg);
    Navigation.registerComponent('Gmail', () => screens.Gmail);
    Navigation.registerComponent('Timer', () => screens.Timer);
    Navigation.registerComponent('Lottie', () => screens.Lottie);
    Navigation.registerComponent('InputField', () => screens.Input);
    Navigation.registerComponent('SwipeCard', () => screens.SwipeCard);
    Navigation.registerComponent('NexusLine', () => screens.NexusLine);
    Navigation.registerComponent('ScrollableHeader', () => screens.ScrollableHeader);
    Navigation.registerComponent('FloatingActionButton', () => screens.FloatingActionButton);

    Navigation.registerComponent('LeftDrawer', () => LeftDrawer);
}