import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import ProductItem from '../components/ProductItem';
import * as cartActions from '../store/actions/cart';

const ProductDetailsScreen = props => {
  const productId = props.navigation.getParam('productId');
  const dispatch = useDispatch();

  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId))

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.buttonContainer}>
        <Button color={Colors.primary} title='Add to Cart' onPress={() => {
          dispatch(cartActions.addToCart(selectedProduct));
        }} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

ProductDetailsScreen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('productTitle')
  }
}

export default ProductDetailsScreen;
