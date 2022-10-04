import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import {getUserData} from '../redux/apiCalls';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  
  useEffect(() => {
    getUserData(user.uid['stringValue']);
  }, []);

  return (
    <>
      <Header />
      <View>
        <Text>Welcome {user.username['stringValue']}</Text>
      </View>
    </>
  );
};

export default Home;
