import React from 'react';
import {View, Text, Image, StyleSheet, Pressable, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/apiCalls';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const Month = [];
  Month[0] = 'January';
  Month[1] = 'February';
  Month[2] = 'March';
  Month[3] = 'April';
  Month[4] = 'May';
  Month[5] = 'June';
  Month[6] = 'July';
  Month[7] = 'August';
  Month[8] = 'September';
  Month[9] = 'October';
  Month[10] = 'November';
  Month[11] = 'December';
  const d = new Date();
  let month = Month[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  const clearAll = () => {
    logout(dispatch);
  };

  return (
    <>
      {!user && (
        <View style={styles.user}>
          <Text style={styles.text}>Business Tracker</Text>
        </View>
      )}
      {user && (
        <>
          {/* <View style={styles.user}>
            <Text style={styles.text}>Business Tracker</Text>
          </View> */}
          <View style={styles.subbody}>
            <View>
              <Text>Today is {month + ' ' + date + ', ' + year}</Text>
            </View>
            <View style={styles.right}>
              {/* <Text>{user?.username} </Text> */}
              <Pressable onPress={clearAll}>
                <Text style={{color: 'red'}}>(Logout)</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
  },
  image: {
    width: 300,
    height: 220,
  },
  user: {
    backgroundColor: '#87CEEB',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
  },
  subbody: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Header;
