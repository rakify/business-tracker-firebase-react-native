import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import Header from '../components/Header';
import {updateUserData} from '../redux/apiCalls';

export default function UpdateUser() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const [next, setNext] = useState();
  const [inputs, setInputs] = useState({
    email: user.email,
    key: '0000',
    shopName: '',
    name: '',
    address: '',
    phoneNumber: '',
    note: '',
    pname: '',
    price: '',
    unit: '',
  });

  const handleChange = (name, value) => {
    setInputs(prev => {
      return {...prev, [name]: value};
    });
  };

  const handleSubmit = () => {
    let customers = [
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
    let products = [
      {
        mapValue: {
          fields: {
            name: {stringValue: inputs.pname},
            price: {doubleValue: inputs.price},
            unit: {stringValue: inputs.unit},
          },
        },
      },
    ];
    const updatedUser = {
      uid: {stringValue: user.uid.stringValue},
      shopName: {stringValue: inputs.shopName},
      adminKey: {stringValue: inputs.key},
      customers: {
        arrayValue: {
          values: customers,
        },
      },
      products: {
        arrayValue: {
          values: products,
        },
      },
    };
    updateUserData(dispatch, updatedUser).then(res =>
      Alert.alert('Success', 'User updated successfully.'),
    );
  };
  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {!user.customers && (
          <View style={styles.title}>
            <Text style={styles.titleText}>Update Information</Text>
          </View>
        )}

        {/*No customers means new user*/}
        {!user.customers && !next && (
          <>
            <View style={styles.inputField}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#0f6a94',
                  fontSize: 15,
                }}>
                WELCOME AND HOPE YOU ARE THE MANAGER SINCE YOU'RE REGISTERING.
                {'\n\n'}⍟ First step is to set a key which will be required to
                update anything here and will only be available to the manager
                who holds the email associate with this account.
                {'\n\n'}⍟ If you already have the key please proceed to next.
                {'\n'}
              </Text>
            </View>
            <View style={styles.inputFieldRow2}>
              <Button
                style={{width: 70, height: 25}}
                title={'Set Key'}
                color="#1eb900"
              />
              <Button
                style={{width: 70, height: 25}}
                title={'Next ➽'}
                color="#1eb900"
                onPress={setNext(true)}
              />
            </View>
          </>
        )}

        {(user.customers || next) && (
          <>
            <View style={styles.inputField}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#0f6a94',
                  fontSize: 25,
                }}>
                Second & Final Step{'\n\n'}All you need to do is set your
                business name and add a product and customer. You can change
                them later so no worries. :){'\n\n'}
              </Text>
            </View>
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
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#0f6a94',
                  fontSize: 15,
                }}>
                Add a Customer
              </Text>
            </View>
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

            <View style={styles.inputField}>
              <Text
                style={{
                  letterSpacing: 1,
                  color: '#0f6a94',
                  fontSize: 15,
                }}>
                Add a Product
              </Text>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.caption}>Product Name</Text>
              <TextInput
                style={styles.input}
                value={inputs.pname}
                onChangeText={value => handleChange('pname', value)}
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
              <Text style={styles.caption}>Manager Key</Text>
              <TextInput
                style={styles.input}
                value={inputs.key}
                onChangeText={value => handleChange('key', value)}
                placeholder="0000"
                placeholderTextColor="green"
              />
            </View>

            <Button
              style={{alignSelf: 'center'}}
              title={'Update'}
              onPress={handleSubmit}
            />
          </>
        )}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    margin: 20,
    marginTop: 5,
    alignSelf: 'center',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    textDecorationLine: 'underline',
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
  inputFieldRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 20,
  },
  inputFieldRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
