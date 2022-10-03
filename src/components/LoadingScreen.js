import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';

const LoadingScreen = () => {
  return (
    <>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={{uri: 'https://i.ibb.co/JrnGG6g/meal-tracker.png'}}
        />
      </View>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f3a9dc" />
        <Text style={styles.title}>Please Wait...</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
  },
  image: {
    width: 300,
    height: 220,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f3a9dc',
  },
});

export default LoadingScreen;
