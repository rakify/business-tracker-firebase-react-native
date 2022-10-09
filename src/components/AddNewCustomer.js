import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserCustomersData, updateUserData} from '../redux/apiCalls';
import Button from '../utils/Button';

const AddNewCustomer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const customers =
    useSelector(
      state => state.user.currentUser?.customers?.arrayValue?.values,
    ) || 0;
  const [inputs, setInputs] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    note: '',
  });

  const handleChange = (name, value) => {
    setInputs(prev => {
      return {...prev, [name]: value};
    });
  };

  const handleSubmit = () => {
    if (inputs.name === '') {
      Alert.alert('Name is required.');
    } else {
      let newCustomer = [
        {
          mapValue: {
            fields: {
              name: {stringValue: inputs.name},
              address: {stringValue: inputs.address},
              phoneNumber: {stringValue: inputs.phoneNumber},
              note: {stringValue: inputs.note},
            },
          },
        },
      ];
      const updatedUser = {
        uid: {stringValue: user.uid.stringValue},
        customers: {
          arrayValue: {
            values: customers
              ? [...customers, ...newCustomer]
              : [...newCustomer],
          },
        },
      };
      updateUserCustomersData(dispatch, updatedUser);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Customer Name</Text>
        <TextInput
          style={styles.input}
          value={inputs.name}
          onChangeText={value => handleChange('name', value)}
          placeholderTextColor="green"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={inputs.phoneNumber}
          onChangeText={value => handleChange('phoneNumber', value)}
          placeholderTextColor="green"
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Address</Text>
        <TextInput
          style={styles.input}
          value={inputs.address}
          onChangeText={value => handleChange('address', value)}
          placeholderTextColor="green"
        />
      </View>

      <View style={styles.inputField}>
        <Text style={styles.caption}>Note</Text>
        <TextInput
          style={styles.input}
          value={inputs.note}
          onChangeText={value => handleChange('note', value)}
          placeholderTextColor="green"
        />
      </View>
      <Button
        style={{alignSelf: 'center'}}
        title={'Add'}
        color="#1eb900"
        onPressFunction={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  caption: {
    color: '#0f6a94',
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputField: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    fontSize: 14,
    width: 200,
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.2,
    borderColor: '#555',
    marginTop: 10,
  },
});

export default AddNewCustomer;
