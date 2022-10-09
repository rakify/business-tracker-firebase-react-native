import React, {useEffect, useState} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import {getUserData, getUserData2} from '../redux/apiCalls';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  useEffect(() => {
    getUserData(dispatch, user.uid.stringValue);
  }, []);
  return (
    <>
      <Header />
      <View style={styles.body}>
        <Text>Welcome {user.username['stringValue']}</Text>
      </View>
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
