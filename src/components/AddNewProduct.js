import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserData, updateUserProductsData} from '../redux/apiCalls';
import Button from '../utils/Button';
import uuid from 'react-native-uuid';
// import CheckBox from '@react-native-community/checkbox';

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const products =
    useSelector(
      state => state.user.currentUser?.products?.arrayValue?.values,
    ) || 0;

  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    price: '',
    unit: '',
    note: '',
    acceptCommition: false,
  });

  const handleChange = (name, value) => {
    setInputs(prev => {
      return {...prev, [name]: value};
    });
  };

  const handleSubmit = () => {
    if (
      inputs.name === '' ||
      inputs.price === '' ||
      inputs.price <= 0 ||
      isNaN(inputs.price)
    ) {
      Alert.alert(
        'Fix these errors',
        `Name and Price is required.\n Price must be greater than 0.`,
      );
    } else {
      let newProduct = [
        {
          mapValue: {
            fields: {
              id: {stringValue: uuid.v4()},
              name: {stringValue: inputs.name},
              price: {doubleValue: inputs.price},
              unit: {stringValue: inputs.unit},
              note: {stringValue: inputs.note},
              acceptCommition: {booleanValue: inputs.acceptCommition},
            },
          },
        },
      ];

      const updatedUser = {
        uid: {stringValue: user.uid.stringValue},
        products: {
          arrayValue: {
            values: products ? [...products, ...newProduct] : [...newProduct],
          },
        },
      };

      updateUserProductsData(dispatch, updatedUser);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          value={inputs.name}
          onChangeText={value => handleChange('name', value)}
          placeholderTextColor="green"
          placeholder="Product Name"
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          value={inputs.price}
          onChangeText={value => handleChange('price', value)}
          placeholderTextColor="green"
          keyboardType="numeric"
          placeholder="Price"
        />
      </View>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          value={inputs.unit}
          onChangeText={value => handleChange('unit', value)}
          placeholderTextColor="green"
          placeholder="Unit"
        />
      </View>

      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          value={inputs.note}
          onChangeText={value => handleChange('note', value)}
          placeholderTextColor="green"
          placeholder="Note"
        />
      </View>

      <View style={styles.inputField}>
        <CheckBox
          value={inputs.acceptCommition}
          onValueChange={value => handleChange('acceptCommition', value)}
        />
        <Text style={styles.caption}>Accept Commition</Text>
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
  container: {},
  caption: {
    color: '#0f6a94',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  inputField: {
    marginBottom: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    width: 300,
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#555',
    marginTop: 10,
  },
});

export default AddNewProduct;
