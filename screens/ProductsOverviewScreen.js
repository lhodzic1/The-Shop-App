import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../components/ProductItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

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
            onViewDetails={() => props.navigation.navigate(
              {
                routeName: 'ProductDetails',
                params: {
                  productId: itemData.item.id,
                  productTitle: itemData.item.title
                }
              })}
          />}
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

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
};

export default ProductsOverviewScreen;
