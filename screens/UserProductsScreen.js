import React from 'react';
import { StyleSheet, Text, View, FlatList, Platform, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../components/ProductItem';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onSelect={() => {}}
        >
          <Button color={Colors.primary} title="Edit" onPress={props.onViewDetails}></Button>
          <Button color={Colors.primary} title="Delete" onPress={props.onAddToCart}></Button>
        </ProductItem>}
    />
  );
}

const styles = StyleSheet.create({
});

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
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

export default UserProductsScreen;
