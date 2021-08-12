import React, { useEffect, useCallback, useReducer } from 'react';
import { StyleSheet, View, ScrollView, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/UI/HeaderButton';
import * as productsActions from '../store/actions/products';
import Input from '../components/UI/Input';

const fromReducer = (state, action) => {
  if (action.type === 'UPDATE') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedformIsValid = true;
    for (const key in updatedValidities) {
      updatedformIsValid = updatedformIsValid && updatedValidities[key];
    };

    return {
      formIsValid: updatedformIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }

  return state;
};

const EditProductsScreen = props => {

  const productId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state => state.products.userProducts).find(prod => prod.id === productId);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(fromReducer,
    {
      inputValues: {
        title: editedProduct ? editedProduct.title : '',
        imageUrl: editedProduct ? editedProduct.imageUrl : '',
        price: editedProduct ? editedProduct.price : '',
        description: editedProduct ? editedProduct.description : ''
      },
      inputValidities: {
        title: editedProduct ? true : false,
        imageUrl: editedProduct ? true : false,
        price: editedProduct ? true : false,
        description: editedProduct ? true : false
      },
      formIsValid: editedProduct ? true : false
    });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form!', [
        { text: 'OK', style: 'default' }
      ]);
      return;
    }

    if (editedProduct)
      dispatch(productsActions.updateProduct(productId, formState.inputValues.title, formState.inputValues.imageUrl, +formState.inputValues.price, formState.inputValues.description));
    else
      dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.imageUrl, +formState.inputValues.price, formState.inputValues.description))

    props.navigation.goBack();
  }, [dispatch, productId, formState]);


  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);


  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: 'UPDATE',
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormState]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id='title'
          label='Title'
          errorText='Please enter a valid title!'
          autoCapitalize='sentences'
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ''}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id='imageUrl'
          label='ImageUrl'
          errorText='Please enter a valid image url!'
          returnKeyType='next'
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ''}
          initiallyValid={!!editedProduct}
          required
        />

        {editedProduct ? null : (
          <Input
            id='price'
            label='Price'
            errorText='Please enter a valid price!'
            keyboardType='decimal-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.price : ''}
            initiallyValid={!!editedProduct}
            required
            min={0.1}
          />
        )
        }
        <Input
          id='description'
          label='Description'
          errorText='Please enter a valid description!'
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ''}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

EditProductsScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Save'
        iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
        onPress={submitFn} />
    </HeaderButtons>
  }
};

export default EditProductsScreen;
