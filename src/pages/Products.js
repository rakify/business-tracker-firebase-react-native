import {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert, Modal} from 'react-native';
import Button from '../utils/Button';
import {useDispatch, useSelector} from 'react-redux';
import AddNewProduct from '../components/AddNewProduct';
import {updateUserProductsData} from '../redux/apiCalls';
import EditProduct from '../components/EditProduct';
import {documentToJson} from '../config/firebaseDataHandle';
const Products = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  const products =
    useSelector(
      state => state.user.currentUser?.products?.arrayValue?.values,
    ) || 0;

  const [nowShowing, setNowShowing] = useState('List');
  const [editProduct, setEditProduct] = useState();
  const [editProductPosition, setEditProductPosition] = useState();

  const handlePosition = (from, to) => {
    let updatedProducts = [...products];
    [updatedProducts[from], updatedProducts[to]] = [
      updatedProducts[to],
      updatedProducts[from],
    ];
    const updatedUser = {
      uid: {stringValue: user.uid.stringValue},
      products: {
        arrayValue: {
          values: updatedProducts,
        },
      },
    };
    updateUserProductsData(dispatch, updatedUser);
  };

  const handleEdit = (id, item) => {
    setEditProduct(item);
    setEditProductPosition(id);
    setNowShowing('Edit');
  };

  const handleDelete = (id, name) => {
    Alert.alert(
      'Please confirm',
      `You are going to delete this item from products list: ${name}`,
      [
        {text: 'Cancel', onPress: () => console.log('cancel pressed')},
        {
          text: 'Confirm',
          onPress: () => {
            let updatedProducts = [...products];
            updatedProducts.splice(id, 1);
            const updatedUser = {
              uid: {stringValue: user.uid.stringValue},
              products: {
                arrayValue: {
                  values: updatedProducts,
                },
              },
            };
            updateUserProductsData(dispatch, updatedUser);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {products === 0 && nowShowing === 'List' ? (
          <>
            <View style={styles.currentlyShowingView}>
              <Text style={styles.currentlyShowingTitle}>List of Products</Text>
              <Button
                style={styles.changeScreenButton}
                title="Add New"
                onPressFunction={() => setNowShowing('Add')}
              />
            </View>

            <View>
              <Text style={styles.emptyMessage}>No product added yet.</Text>
            </View>
          </>
        ) : nowShowing === 'List' ? (
          <>
            <View style={styles.currentlyShowingView}>
              <Text style={styles.currentlyShowingTitle}>
                List of Products ({products.length})
              </Text>
              <Button
                style={styles.changeScreenButton}
                title="Add New"
                onPressFunction={() => setNowShowing('Add')}
              />
            </View>
            <ScrollView
              horizontal
              style={styles.container}
              contentContainerStyle={{
                flexDirection: 'column',
              }}>
              <View style={styles.TBODY}>
                <View style={styles.TR}>
                  <View style={styles.TH2}>
                    <Text style={styles.THtext}>Name</Text>
                  </View>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Price</Text>
                  </View>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Unit</Text>
                  </View>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Commition</Text>
                  </View>
                  <View style={styles.TH2}>
                    <Text style={styles.THtext}>Action</Text>
                  </View>
                </View>
              </View>

              {products.map((item, position) => (
                <View
                  key={item?.mapValue?.fields?.id?.stringValue}
                  style={styles.TBODY}>
                  <View style={styles.TR}>
                    <View style={styles.TD2}>
                      <Text style={styles.title}>
                        {item?.mapValue?.fields?.name?.stringValue}
                      </Text>
                    </View>
                    <View style={styles.TD}>
                      <Text style={{color: 'red'}}>
                        {item?.mapValue?.fields?.price?.doubleValue}
                      </Text>
                    </View>
                    <View style={styles.TD}>
                      <Text style={styles.title}>
                        {item?.mapValue?.fields?.unit?.stringValue}
                      </Text>
                    </View>
                    <View style={styles.TD}>
                      <Text style={styles.title}>
                        {item?.mapValue?.fields?.acceptCommition
                          ?.booleanValue === true
                          ? 'Available'
                          : 'Unavailable'}
                      </Text>
                    </View>
                    <Button
                      onPressFunction={() =>
                        handleDelete(
                          position,
                          item?.mapValue?.fields?.name?.stringValue,
                        )
                      }
                      style={styles.actionButton}
                      title="🗑️"
                    />
                    <Button
                      onPressFunction={() => {
                        handleEdit(position, item);
                      }}
                      style={styles.actionButton}
                      title="✎"
                    />
                    {position !== 0 && (
                      <Button
                        disabled
                        onPressFunction={() => {
                          handlePosition(position - 1, position);
                        }}
                        style={styles.actionButton}
                        title="↑"
                      />
                    )}
                    {position !== products.length - 1 && (
                      <Button
                        onPressFunction={() => {
                          handlePosition(position, position + 1);
                        }}
                        style={styles.actionButton}
                        title="↓"
                      />
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        ) : nowShowing === 'Add' ? (
          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={nowShowing === 'Add'}
              onRequestClose={() => {
                setNowShowing('List');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.currentlyShowingView}>
                    <Text style={styles.currentlyShowingTitle}>
                      Add Product
                    </Text>
                    <Button
                      style={styles.changeScreenButton}
                      title="Go Back"
                      onPressFunction={() => setNowShowing('List')}
                    />
                  </View>
                  <AddNewProduct />
                </View>
              </View>
            </Modal>
          </>
        ) : (
          nowShowing === 'Edit' && (
            <>
              <Modal
                animationType="slide"
                transparent={true}
                visible={nowShowing === 'Edit'}
                onRequestClose={() => {
                  setNowShowing('List');
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.currentlyShowingView}>
                      <Text style={styles.currentlyShowingTitle}>
                        Edit Product
                      </Text>
                      <Button
                        style={styles.changeScreenButton}
                        title="Go Back"
                        onPressFunction={() => setNowShowing('List')}
                      />
                    </View>
                    <EditProduct item={editProduct} id={editProductPosition} />
                  </View>
                </View>
              </Modal>
            </>
          )
        )}
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
  TH2: {
    width: 200,
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
  TD2: {
    borderLeftWidth: 1,
    borderColor: '#ffffff',
    width: 200,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f1f8ff',
  },
  title: {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#5F9DF7',
    width: 50,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#fff',
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

  centeredView: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Products;
