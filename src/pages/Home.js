import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  console.log(user);

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
