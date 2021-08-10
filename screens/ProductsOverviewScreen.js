import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const ProductsOverviewScreen = props => {
  return (
    <View>
      <FlatList />
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

export default ProductsOverviewScreen;
