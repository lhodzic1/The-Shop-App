import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../components/CartItem';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';
import * as cartActions from '../store/actions/cart';
import * as ordersActions from '../store/actions/orders';


const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      })
    }
    return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text></Text>
        {isLoading ?
          <ActivityIndicator
            size='small'
            color={Colors.accent} />
          :
          <Button
            color={Colors.accent}
            title='Order Now'
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler} />}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => {
          return <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }} />
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary
  }
});

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
};

export default CartScreen;
