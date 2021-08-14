import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import OrderItem from '../components/OrderItem';
import HeaderButton from '../components/UI/HeaderButton';
import * as ordersActions from '../store/actions/orders';
import Colors from '../constants/Colors';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() =>
      setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centerd}>
        <ActivityIndicator
          size='large'
          color={Colors.accent} />
      </View>
    );
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
}

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Menu'
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons>
  }
};

const styles = StyleSheet.create({
  centerd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default OrdersScreen;
