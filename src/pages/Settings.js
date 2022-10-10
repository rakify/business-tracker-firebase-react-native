import {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import Button from '../utils/Button';
import {useDispatch, useSelector} from 'react-redux';
import AddNewProduct from '../components/AddNewProduct';
import {updateUserData, updateUserProductsData} from '../redux/apiCalls';
import EditSettings from '../components/EditSettings';
import Header from '../components/Header';

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const [nowShowing, setNowShowing] = useState(true);
  const nowShowingHandler = () => {
    setNowShowing(!nowShowing);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <ScrollView
          horizontal
          style={styles.container}
          contentContainerStyle={{
            flexDirection: 'column',
          }}>
          <Header />
          {nowShowing ? (
            <>
              <View style={styles.currentlyShowingView}>
                <Text style={styles.currentlyShowingTitle}>
                  Your Saved Settings
                </Text>
                <Button
                  style={styles.changeScreenButton}
                  title="Edit Now"
                  onPressFunction={nowShowingHandler}
                />
              </View>
              <View style={styles.savedSettings}>
                <Text style={styles.savedSettingsTitle}>User Information</Text>
                <Text style={styles.savedSettingsText}>
                  Username:{' '}
                  {user?.username?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
                <Text style={styles.savedSettingsText}>
                  Email:{' '}
                  {user?.email?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
                <Text style={styles.savedSettingsText}>
                  Phone Number:{' '}
                  {user?.phoneNumber?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>

                <Text style={styles.savedSettingsTitle}>
                  Business Information
                </Text>

                <Text style={styles.savedSettingsText}>
                  Shop Name:{' '}
                  {user?.shopName?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
                <Text style={styles.savedSettingsText}>
                  Shop Address:{' '}
                  {user?.shopAddress?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
                <Text style={styles.savedSettingsText}>
                  Shop Details:{' '}
                  {user?.shopDetails?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
                <Text style={styles.savedSettingsText}>
                  Shop Office Phone:{' '}
                  {user?.shopOfficePn?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
                <Text style={styles.savedSettingsText}>
                  Shop Other Phone:{' '}
                  {user?.shopOtherPn?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
                <Text style={styles.savedSettingsText}>
                  Shop Signature:{' '}
                  {user?.shopSignature?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
                <Text style={styles.savedSettingsText}>
                  Shop Banner:{' '}
                  {user?.shopBanner?.stringValue || (
                    <Text style={{color: 'red'}}>Blank</Text>
                  )}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.currentlyShowingView}>
                <Text style={styles.currentlyShowingTitle}>Edit Settings</Text>
                <Button
                  style={styles.changeScreenButton}
                  title="Go Back"
                  onPressFunction={nowShowingHandler}
                />
              </View>
              <EditSettings />
            </>
          )}
        </ScrollView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  currentlyShowingView: {
    marginBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  savedSettings: {
    marginTop: 10,
    marginLeft: 20,
  },
  savedSettingsTitle: {
    marginTop: 20,
    fontSize: 20,
    marginBottom: 10,
  },
  savedSettingsText: {
    marginTop: 5,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
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

export default Settings;
