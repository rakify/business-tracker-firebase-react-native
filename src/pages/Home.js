import React, {useEffect, useState} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
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
      {products === 0 ? (
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
          <Text style={{fontSize: 20, margin: 20, color: 'red'}}>
            But before we begin you must add at least one product from
            Products tab below.
          </Text>
        </View>
      ) : (
        <EntryForm />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  body: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingLeft: 5,
  },
});

export default Home;
