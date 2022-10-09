import {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import Button from '../utils/Button';
import {useDispatch, useSelector} from 'react-redux';
import AddNewCustomer from '../components/AddNewCustomer';
import {updateUserCustomersData, updateUserData} from '../redux/apiCalls';

const Customers = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const customers =
    useSelector(
      state => state.user.currentUser?.customers?.arrayValue?.values,
    ) || 0;
  const [nowShowing, setNowShowing] = useState(true);
  const nowShowingHandler = () => {
    setNowShowing(!nowShowing);
  };

  const handleDelete = (id, name) => {
    Alert.alert(
      'Please confirm',
      `You are about to remove this customer: ${name}`,
      [
        {text: 'Cancel', onPress: () => console.log('cancel pressed')},
        {
          text: 'Confirm',
          onPress: () => {
            let updatedCustomers = [...customers];
            updatedCustomers.splice(id, 1);
            const updatedUser = {
              uid: {stringValue: user.uid.stringValue},
              customers: {
                arrayValue: {
                  values: updatedCustomers,
                },
              },
            };
            updateUserCustomersData(dispatch, updatedUser);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        style={styles.container}
        contentContainerStyle={{
          flexDirection: 'column',
        }}>
        {customers === 0 && nowShowing ? (
          <>
            <View style={styles.currentlyShowingView}>
              <Text style={styles.currentlyShowingTitle}>
                List of Customers
              </Text>
              <Button
                style={styles.changeScreenButton}
                title="Add New"
                onPressFunction={nowShowingHandler}
              />
            </View>

            <View>
              <Text style={styles.emptyMessage}>No customer added yet.</Text>
            </View>
          </>
        ) : nowShowing ? (
          <>
            <View style={styles.currentlyShowingView}>
              <Text style={styles.currentlyShowingTitle}>
                List of Customers ({customers.length})
              </Text>
              <Button
                style={styles.changeScreenButton}
                title="Add New"
                onPressFunction={nowShowingHandler}
              />
            </View>

            <View style={styles.TBODY}>
              <View style={styles.TR}>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Name</Text>
                </View>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Phone</Text>
                </View>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Address</Text>
                </View>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Notes</Text>
                </View>
                <View style={styles.TH}>
                  <Text style={styles.THtext}>Action</Text>
                </View>
              </View>
            </View>

            {customers.map((item, i) => (
              <View key={i} style={styles.TBODY}>
                <View style={styles.TR}>
                  <View style={styles.TD}>
                    <Text>{item?.mapValue?.fields?.name?.stringValue}</Text>
                  </View>
                  <View style={styles.TD}>
                    <Text>
                      {item?.mapValue?.fields?.phoneNumber?.stringValue}
                    </Text>
                  </View>
                  <View style={styles.TD}>
                    <Text>{item?.mapValue?.fields?.address?.stringValue}</Text>
                  </View>
                  <View style={styles.TD}>
                    <Text>{item?.mapValue?.fields?.note?.stringValue}</Text>
                  </View>
                  <Button
                    onPressFunction={() =>
                      handleDelete(i, item?.mapValue?.fields?.name?.stringValue)
                    }
                    style={styles.actionButton}
                    title="🗑️"
                  />
                </View>
              </View>
            ))}
          </>
        ) : (
          !nowShowing && (
            <>
              <View style={styles.currentlyShowingView}>
                <Text style={styles.currentlyShowingTitle}>
                  Add New Customer
                </Text>
                <Button
                  style={styles.changeScreenButton}
                  title="Go Back"
                  onPressFunction={nowShowingHandler}
                />
              </View>
              <AddNewCustomer />
            </>
          )
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  currentlyShowingView: {
    marginBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  emptyMessage: {
    color: 'red',
    fontSize: 20,
    backgroundColor: 'whitesmoke',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
  },
  TBODY: {},
  TR: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  TH: {
    width: 100,
    height: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2263a5',
    borderLeftWidth: 1,
    borderColor: '#f1f8ff',
  },
  THtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  TD: {
    borderLeftWidth: 1,
    borderColor: '#ffffff',
    width: 100,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f1f8ff',
  },
  actionButton: {
    backgroundColor: '#DFF6FF',
  },
  changeScreenButton: {
    backgroundColor: '#5F9DF7',
    height: 30,
    width: 90,
  },
  currentlyShowingTitle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default Customers;
