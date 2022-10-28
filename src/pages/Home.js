import React, {useEffect, useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData} from '../redux/apiCalls';
import EntryForm from '../components/EntryForm';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const products =
    useSelector(
      state => state.user.currentUser?.products?.arrayValue?.values,
    ) || 0;
  useEffect(() => {
    getUserData(dispatch, user.uid.stringValue);
  }, []);
  return (
    <>
      {user?.approved?.booleanValue === false ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 20,
              padding: 20,
              color: 'white',
              textAlign: 'center',
            }}>
            ⚠️
          </Text>
          <Text
            style={{
              fontSize: 20,
              padding: 20,
              flex: 1,
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            It seems like your account is either not approved yet or banned by
            admin for some reason. Please contact admin for approval.
          </Text>
        </View>
      ) : products === 0 ? (
        <View>
          <Text style={{fontSize: 20, margin: 20, color: 'black'}}>
            You have successfully logged into Buisness Tracker. You can logout
            anytime from Settings tab.
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              color: 'black',
            }}>
            In this tab you are going to see a cash memo for your shop.
          </Text>
          <Text style={{fontSize: 20, margin: 20, color: 'black'}}>
            But before we begin you must add at least one product from Products
            tab below.
          </Text>
        </View>
      ) : (
        <EntryForm />
      )}
    </>
  );
};

export default Home;
