import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image} from 'react-native';

const LoadingScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f3a9dc" />
        <Text style={styles.title}>Please Wait...</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f3a9dc',
  },
});

export default LoadingScreen;
