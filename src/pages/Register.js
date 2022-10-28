import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert, Text, Button} from 'react-native';
import Header from '../components/Header';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebaseConfig';
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
import {db} from '../config/firebaseConfig';
import {createUserData, getData} from '../redux/apiCalls';
import {useSelector} from 'react-redux';

const Register = () => {
  const user = useSelector(state => state.user);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const RegisterHandler = () => {
    password !== confirmPassword && Alert.alert('Passwords do not match.');
    password === confirmPassword &&
      createUserWithEmailAndPassword(auth, email, password)
        .then(credential => {
          if (credential && credential.user) {
            createUserData({
              // user model
              email: {stringValue: credential.user.email},
              uid: {stringValue: credential.user.uid},
              username: {stringValue: username},
              phoneNumber: {stringValue: phoneNumber},
              customers: {
                arrayValue: {
                  values: [],
                },
              },
              products: {
                arrayValue: {
                  values: [],
                },
              },
              shopName: {stringValue: 'Demo Bread & Buiscuits Factory'},
              shopAddress: {stringValue: 'Demo, Dhaka'},
              shopBanner: {stringValue: ''},
              shopDetails: {
                stringValue: 'Demo details: We sell buiscuits and bread etc',
              },
              shopOfficePn: {stringValue: '+8801'},
              shopOtherPn: {stringValue: '+8801'},
              shopSignature: {stringValue: ''},
              approved: {booleanValue: false}, // without approve being true user cant use the app
            }).then(
              Alert.alert(
                '',
                'Account created successfully! You may login now.',
                [],
                {cancelable: true},
              ),
            );
          }
        })
        .catch(error => {
          console.log(error.code);
          Alert.alert(
            'Error',
            error.code === 'auth/invalid-email'
              ? 'Invalid email.'
              : error.code === 'auth/email-already-in-use'
              ? 'This email is already in use.'
              : error.code === 'auth/weak-password'
              ? 'Password must contain at least 6 characters.'
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
            placeholder="Username"
            onChangeText={setUsername}
            placeholderTextColor="green"
          />
          <Button title="♛" color="transparent" />
        </View>

        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            placeholderTextColor="green"
          />
          <Button title="☏" color="transparent" />
        </View>

        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            placeholderTextColor="green"
            keyboardType="email-address"
          />
          <Button title="@" color="transparent" />
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

        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={showPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="green"
          />
          <Button
            title={showPassword ? '🔒' : '🔓'}
            color="transparent"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <Button
          title={user.isFetching ? 'Wait..' : 'Register'}
          color="#1eb911"
          onPress={RegisterHandler}
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

export default Register;
