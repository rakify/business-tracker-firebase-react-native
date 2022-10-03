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

export const createUserData = async user => {
  const url = `https://firestore.googleapis.com/v1/projects/business-33109/databases/(default)/documents/users/?documentId=Rkib`;
  try {
    const res = await axios.post(url, {
      fields: [...user],
    });
    console.log(res.data);
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserData = async (dispatch, uid) => {
  dispatch(loginStart());
  const url = `https://firestore.googleapis.com/v1/projects/business-33109/databases/(default)/documents/users/${uid}`;
  try {
    const res = await axios.get(url);
    dispatch(loginSuccess(res.data.fields));
  } catch (err) {
    dispatch(loginFailure());
    console.log(err);
  }
};
export const logout = async dispatch => {
  dispatch(logoutStart());
  try {
    await auth.signOut();
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
};
