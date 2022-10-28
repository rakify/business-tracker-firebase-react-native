import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert, Text, Button} from 'react-native';
import Header from '../components/Header';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebaseConfig';
import {getUserData, login, resetPassword} from '../redux/apiCalls';

const Login = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const forgotPassHandler = () => {
    if (email === '')
      Alert.alert('Please enter your email to reset password', '', [], {
        cancelable: true,
      });
    else
      resetPassword(email).then(res => {
        res === 200 &&
          Alert.alert(
            '',
            'We have sent an email with instruction on how to reset your password. Please check spam folders also.',
            [],
            {
              cancelable: true,
            },
          );
        res !== 200 &&
          Alert.alert(
            '',
            'Could not reset. Please check if email address you provided is correct.',
            [],
            {
              cancelable: true,
            },
          );
      });
  };

  const LoginHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(credential => {
        getUserData(dispatch, credential.user.uid);
      })
      .catch(error => {
        console.log(error);
        Alert.alert(
          'Error',
          error.code === 'auth/invalid-email'
            ? 'Invalid email.'
            : error.code === 'auth/user-not-found'
            ? 'User not found.'
            : error.code === 'auth/wrong-password'
            ? 'Wrong password.'
            : 'Network error.',
          [],
          {
            cancelable: true,
          },
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
          <Button
            title={showPassword ? '🔒' : '🔓'}
            color="transparent"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <Button
          title={user.isFetching ? 'Wait..' : 'Login'}
          color="#1eb900"
          onPress={() => LoginHandler()}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <Text style={{marginRight: 5}}>Can't remember your password?</Text>
          <Button
            title="Reset Password"
            color="black"
            onPress={() => forgotPassHandler()}
          />
        </View>
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
