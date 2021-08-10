import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default createAppContainer(ProductsNavigator);