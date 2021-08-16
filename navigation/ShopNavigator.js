import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import UserProductsScreen from '../screens/UserProductsScreen';
import EditProductsScreen from '../screens/EditProductScreen';
import AuthScreen from '../screens/AuthScreen';
import Colors from '../constants/Colors';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: defaultNavigationOptions,
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
    }
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
}, {
    defaultNavigationOptions: defaultNavigationOptions,
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
    }
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductsScreen
}, {
    defaultNavigationOptions: defaultNavigationOptions,
    navigationOptions: {
        drawerIcon: drawerConfig =>
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
    }
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    UserProducts: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavigationOptions
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);