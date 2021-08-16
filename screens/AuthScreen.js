import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

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

const AuthScreen = props => {
    const [isSignup, setIsSignUp] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [formState, dispatchFormState] = useReducer(fromReducer,
        {
            inputValues: {
                email: '',
                password: ''
            },
            inputValidities: {
                email: false,
                password: false
            },
            formIsValid: false
        });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occured!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: 'UPDATE',
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    const dispatch = useDispatch();

    const authHandler = async () => {
        let action;

        if (isSignup)
            action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
        else
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);

        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };


    return (
        <View style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-mail"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email adress"
                            onInputChange={inputChangeHandler}
                            initialValue="" />
                        <Input
                            id="password"
                            label="password"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password"
                            onInputChange={inputChangeHandler}
                            initialValue="" />
                        <View style={styles.buttonContainer}>
                            {isLoading ?
                                <ActivityIndicator
                                    size='small'
                                    color={Colors.primary}
                                />
                                :
                                <Button
                                    title={isSignup ? 'Sign up' : 'Login'}
                                    color={Colors.primary}
                                    onPress={authHandler} />}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
                                color={Colors.accent}
                                onPress={() => { setIsSignUp(prevState => !prevState) }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

AuthScreen.navigationOptions = {
    headerTitle: 'Authentication'
};

export default AuthScreen;