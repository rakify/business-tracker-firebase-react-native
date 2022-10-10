import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserData} from '../redux/apiCalls';
import Button from '../utils/Button';

const EditSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    shopName: user?.shopName?.stringValue || '',
    shopDetails: user?.shopDetails?.stringValue || '',
    shopAddress: user?.shopAddress?.stringValue || '',
    shopOfficePn: user?.shopOfficePn?.stringValue || '',
    shopOtherPn: user?.shopOtherPn?.stringValue || '',
    shopSignature: user?.shopSignature?.stringValue || '',
    shopBanner: user?.shopBanner?.stringValue || '',
  });

  const handleChange = (name, value) => {
    setInputs(prev => {
      return {...prev, [name]: value};
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    if (
      inputs.shopName === '' ||
      inputs.shopAddress === '' ||
      inputs.shopDetails === '' ||
      inputs.shopOfficePn === '' ||
      inputs.shopOtherPn === ''
    ) {
      Alert.alert(
        'Fix these errors',
        `Shop name, address, details, office phone, others phone is required.`,
      );
    } else {
      const updatedUser = {
        uid: {stringValue: user.uid.stringValue},
        shopName: {stringValue: inputs.shopName},
        shopAddress: {stringValue: inputs.shopAddress},
        shopDetails: {stringValue: inputs.shopDetails},
        shopOfficePn: {stringValue: inputs.shopOfficePn},
        shopOtherPn: {stringValue: inputs.shopOtherPn},
        shopSignature: {stringValue: inputs.shopSignature},
        shopBanner: {stringValue: inputs.shopBanner},
      };

      updateUserData(dispatch, updatedUser).then(setLoading(false));
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Shop Name</Text>
        <TextInput
          style={styles.input}
          value={inputs.shopName}
          onChangeText={value => handleChange('shopName', value)}
          placeholderTextColor="green"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Shop Address</Text>
        <TextInput
          style={styles.input}
          value={inputs.shopAddress}
          onChangeText={value => handleChange('shopAddress', value)}
          placeholderTextColor="green"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.caption}>Shop Details</Text>
        <TextInput
          style={styles.input}
          value={inputs.shopDetails}
          onChangeText={value => handleChange('shopDetails', value)}
          placeholderTextColor="green"
        />
      </View>

      <View style={styles.inputField}>
        <Text style={styles.caption}>Office Phone</Text>
        <TextInput
          style={styles.input}
          value={inputs.shopOfficePn}
          onChangeText={value => handleChange('shopOfficePn', value)}
          placeholderTextColor="green"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputField}>
        <Text style={styles.caption}>Other Phone</Text>
        <TextInput
          style={styles.input}
          value={inputs.shopOtherPn}
          onChangeText={value => handleChange('shopOtherPn', value)}
          placeholderTextColor="green"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputField}>
        <Text style={styles.caption}>Shop Signature (image url)</Text>
        <TextInput
          style={styles.input}
          value={inputs.shopSignature}
          onChangeText={value => handleChange('shopSignature', value)}
          placeholderTextColor="green"
          placeholder="http://"
          keyboardType="url"
        />
      </View>

      <View style={styles.inputField}>
        <Text style={styles.caption}>Shop Banner (image url)</Text>
        <TextInput
          style={styles.input}
          value={inputs.shopBanner}
          onChangeText={value => handleChange('shopBanner', value)}
          placeholderTextColor="green"
          placeholder="http://"
          keyboardType="url"
        />
      </View>

      <Button
        style={{alignSelf: 'center'}}
        title={'Save'}
        disabled={loading}
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
    borderWidth: 1,
    borderColor: '#555',
    marginTop: 10,
  },
});

export default EditSettings;
