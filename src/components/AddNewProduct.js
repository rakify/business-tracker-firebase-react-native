import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserData, updateUserProductsData} from '../redux/apiCalls';
import Button from '../utils/Button';

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const products =
    useSelector(
      state => state.user.currentUser?.products?.arrayValue?.values,
    ) || 0;
  const [inputs, setInputs] = useState({
    name: '',
    price: '',
    unit: '',
    note: '',
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
              name: {stringValue: inputs.name},
              price: {doubleValue: inputs.price},
              unit: {stringValue: inputs.unit},
              note: {stringValue: inputs.note},
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
        <Text style={styles.caption}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={inputs.name}
          onChangeText={value => handleChange('name', value)}
          placeholderTextColor="green"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Price</Text>
        <TextInput
          style={styles.input}
          value={inputs.price}
          onChangeText={value => handleChange('price', value)}
          placeholderTextColor="green"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Unit</Text>
        <TextInput
          style={styles.input}
          value={inputs.unit}
          onChangeText={value => handleChange('unit', value)}
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

export default AddNewProduct;
