import {
  loginFailure,
  loginStart,
  loginSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  logoutSuccess,
  logoutFailure,
  logoutStart,
} from './userRedux';
import {
  getEntriesStart,
  getEntriesSuccess,
  getEntriesFailure,
  deleteEntriesStart,
  deleteEntriesSuccess,
  deleteEntriesFailure,
  updateEntriesStart,
  updateEntriesSuccess,
  updateEntriesFailure,
  addEntriesStart,
  addEntriesSuccess,
  addEntriesFailure,
} from './entryRedux';
import axios from 'axios';
import {auth} from '../config/firebaseConfig';
import {Alert} from 'react-native';
const API_KEY = 'AIzaSyA0R6yc4I5Qf7szfOl0_MwJLR3DGFavieI';

export const createUserData = async user => {
  const url = `https://firestore.googleapis.com/v1/projects/business-33109/databases/(default)/documents/users/?documentId=${user.uid.stringValue}`;
  try {
    const res = await axios.post(url, {
      fields: user,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const updateUserData = async (dispatch, user) => {
  dispatch(updateUserStart());
  const url = `https://firestore.googleapis.com/v1/projects/business-33109/databases/(default)/documents/users/${user.uid.stringValue}?updateMask.fieldPaths=shopName&updateMask.fieldPaths=shopDetails&updateMask.fieldPaths=shopAddress&updateMask.fieldPaths=shopOfficePn&updateMask.fieldPaths=shopOtherPn&updateMask.fieldPaths=shopSignature&updateMask.fieldPaths=shopBanner`;
  try {
    const res = await axios.patch(url, {
      fields: user,
    });
    dispatch(updateUserSuccess(res.data.fields));
    Alert.alert('', 'Updated Successfully!', [], {
      cancelable: true,
    });
  } catch (err) {
    dispatch(updateUserFailure());
    Alert.alert('Error', `Failed. ${err.message}`);
  }
};

export const updateUserCustomersData = async (dispatch, user) => {
  dispatch(updateUserStart());
  const url = `https://firestore.googleapis.com/v1/projects/business-33109/databases/(default)/documents/users/${user.uid.stringValue}?updateMask.fieldPaths=customers`;
  try {
    const res = await axios.patch(url, {
      fields: user,
    });
    dispatch(updateUserSuccess(res.data.fields));
    Alert.alert('', 'Updated Successfully!', [], {
      cancelable: true,
    });
  } catch (err) {
    dispatch(updateUserFailure());
    Alert.alert('Error', `Failed. ${err.message}`);
  }
};

export const updateUserProductsData = async (dispatch, user) => {
  dispatch(updateUserStart());
  const url = `https://firestore.googleapis.com/v1/projects/business-33109/databases/(default)/documents/users/${user.uid.stringValue}?updateMask.fieldPaths=products`;
  try {
    const res = await axios.patch(url, {
      fields: user,
    });
    dispatch(updateUserSuccess(res.data.fields));
    Alert.alert('', 'Updated Successfully!', [], {
      cancelable: true,
    });
  } catch (err) {
    dispatch(updateUserFailure());
    Alert.alert('Error', `Failed. ${err.message}`);
  }
};

export const getUserData = async (dispatch, uid) => {
  dispatch(getUserStart());
  const url = `https://firestore.googleapis.com/v1/projects/business-33109/databases/(default)/documents/users/${uid}`;
  try {
    const res = await axios.get(url);
    dispatch(getUserSuccess(res.data.fields));
  } catch (err) {
    dispatch(getUserFailure());
    Alert.alert('Connection Lost', `Failed. ${err.message}`);
  }
};
export const logout = async dispatch => {
  dispatch(logoutStart());
  try {
    await auth.signOut();
    dispatch(logoutSuccess());
  } catch (err) {
    console.log(err);
    dispatch(logoutFailure());
  }
};
