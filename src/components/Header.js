import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/apiCalls';
import Button from '../utils/Button';

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
      {user && (
        <>
          <View style={styles.body}>
            <Text style={{color: 'green'}}>
              Today is {month + ' ' + date + ', ' + year}
            </Text>
            <Button
              onPressFunction={clearAll}
              style={{
                backgroundColor: 'red',
                height: 20,
                width: 60,
                marginTop: 0,
              }}
              title="Logout"
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
  },
  body: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingLeft: 5,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Header;
