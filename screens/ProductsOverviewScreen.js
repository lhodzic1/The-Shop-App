import React from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../components/ProductItem';
import * as cartActions from '../store/actions/cart';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
