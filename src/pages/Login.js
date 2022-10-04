import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert, Text, Button} from 'react-native';
import Header from '../components/Header';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebaseConfig';
import {getUserData} from '../redux/apiCalls';

const Login = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const LoginHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(credential => {
        getUserData(dispatch, credential.user.uid);
      })
      .catch(error => {
        Alert.alert(
          error.code === 'auth/invalid-email'
            ? 'Invalid email.'
            : error.code === 'auth/user-not-found'
            ? 'User not found.'
            : error.code === 'auth/wrong-password'
            ? 'Wrong password.'
            : 'Network error.',
        );
      });
  };
  return (
    <>
      <Header />
      <View style={styles.body}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            placeholderTextColor="green"
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={showPassword}
            onChangeText={setPassword}
            placeholderTextColor="green"
          />
        </View>

        <Button
          title={user.isFetching ? 'Wait..' : 'Login'}
          color="#1eb900"
          onPress={LoginHandler}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 5,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 5,
    borderWidth: 0.2,
    borderColor: '#555',
    backgroundColor: '#dddfff',
    borderRadius: 5,
  },
  input: {
    fontSize: 20,
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Login;
