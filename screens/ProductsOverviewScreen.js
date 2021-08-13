import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../components/ProductItem';
import * as cartActions from '../store/actions/cart';
import * as productsActions from '../store/actions/products'
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback( async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate(
      {
        routeName: 'ProductDetails',
        params: {
          productId: id,
          productTitle: title
        }
      })
  };

  if (error) {
    return (
      <View style={styles.centerd}>
        <Text>An error occured: {error}</Text>
        <Button title='Try again' onPress={loadProducts} color={Colors.primary}/>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerd}>
        <ActivityIndicator
          size='large'
          color={Colors.accent} />
      </View>
    );
  };

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centerd}>
        <Text>No products found</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            imageUrl={itemData.item.imageUrl}
            onSelect={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() =>
                selectItemHandler(itemData.item.id, itemData.item.title)}>
            </Button>
            <Button
              color={Colors.primary}
              title="Add To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}>
            </Button>
          </ProductItem>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Cart'
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => {
          navData.navigation.navigate({ routeName: 'Cart' });
        }} />
    </HeaderButtons>,
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

export default ProductsOverviewScreen;
