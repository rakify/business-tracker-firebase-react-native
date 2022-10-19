import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData} from '../redux/apiCalls';
import Button from '../utils/Button';

const EntryForm = () => {
  const user = useSelector(state => state.user.currentUser);
  const products =
    useSelector(
      state => state.user.currentUser?.products?.arrayValue?.values,
    ) || 0;

  const date = new Date().toLocaleString('en-us', {
    //this is so we can let only todays entry the access to remove
    weekday: 'long',
  });
  const dateArray = date.split(',');

  const [inputs, setInputs] = useState({
    user: user.username['stringValue'],
    entryNo: 1, //if no entries set 1 or set first entries(sorted so) entryNo+1
    date: date,
    costForWithCommition: 0, // todays total cost for commision based product
    commitionPercentage: 0, // perchantage of discount
    commitionValue: 0, // discount ammount
    costAfterCommition: 0,
    costForWithoutCommition: 0, // todays total cost for without commision based product
    finalCost: 0, // costAfterCommition+costWithoutCommition
    previousReserve: 0, // previous date final reserve
    finalCost2: 0, //abs(previousReserve-finalCost)
    reserve: 0, // todays reserve
    finalReserve: 0, // (previousReserve-cost)+reserve
    by: '', //buyer
  });

  //handle string value
  const handleSelectChange = (name, value) => {
    setInputs(prev => ({...prev, [name]: value}));
  };

  //handle number values
  const handleChange = (name, value) => {
    //if client forgets to put any number greater then 0 or just empty string set it auto as 0
    (isNaN(value) || value === '') &&
      setInputs(prev => ({
        ...prev,
        [name]: 0,
      }));
    !isNaN(value) &&
      value !== '' &&
      setInputs(prev => ({
        ...prev,
        [name]: parseInt(value),
      }));
  };

  //set initialQuantity per product as 0
  let initialQuantity = {};
  for (let i = 0; i < products.length; i++) {
    initialQuantity[products[i].mapValue.fields.name.stringValue] = 0;
  }
  // for product with commition
  const [quantity, setQuantity] = useState({...initialQuantity});
  const [subtotal, setSubtotal] = useState({...initialQuantity});
  // for product without commision
  const [quantity2, setQuantity2] = useState({...initialQuantity});
  const [subtotal2, setSubtotal2] = useState({...initialQuantity});

  // Handle change in quantity and also update subtotal for commision based product
  const handleQuantity = (valuePassed, price, name) => {
    let value = 0;
    if (valuePassed !== '' && !isNaN(valuePassed)) value = valuePassed;
    setSubtotal(prev => {
      return {...prev, [name]: value * price};
    });
    setQuantity(prev => {
      return {...prev, [name]: value};
    });
  };

  // Handle change in quantity and also update subtotal for without commision based product
  const handleQuantity2 = (valuePassed, price, name) => {
    let value = 0;
    if (valuePassed !== '' && !isNaN(valuePassed)) value = valuePassed;
    setSubtotal2(prev => {
      return {...prev, [name]: value * price};
    });
    setQuantity2(prev => {
      return {...prev, [name]: value};
    });
  };

  //with change in subtotal, update total cost value for commision based product
  useEffect(() => {
    let total = 0;
    for (let item in subtotal) {
      total += subtotal[item];
    }
    setInputs(prev => ({...prev, costForWithCommition: total}));
  }, [subtotal]);

  //with change in subtotal2, update total cost value for without commision product
  useEffect(() => {
    let total = 0;
    for (let item in subtotal2) {
      total += subtotal2[item];
    }
    setInputs(prev => ({...prev, costForWithoutCommition: total}));
  }, [subtotal2]);

  //with change in commition, update commition Value and cost after commition
  useEffect(() => {
    let costAfterCommition = 0;
    let commitionValue = 0;
    if (inputs.commitionPercentage !== 0)
      commitionValue =
        (inputs.commitionPercentage / 100.0) * inputs.costForWithCommition;
    costAfterCommition = inputs.costForWithCommition - commitionValue;
    setInputs(prev => ({...prev, commitionValue: commitionValue.toFixed(2)}));
    setInputs(prev => ({
      ...prev,
      costAfterCommition: costAfterCommition.toFixed(2),
    }));
  }, [inputs.commitionPercentage, inputs.costForWithCommition]);

  //with change in costAfterCommition, costForWithoutCommition, update final cost
  useEffect(() => {
    let finalCost =
      parseFloat(inputs.costAfterCommition) +
      parseFloat(inputs.costForWithoutCommition);
    setInputs(prev => ({...prev, finalCost: finalCost}));
  }, [inputs.costAfterCommition, inputs.costForWithoutCommition]);

  //with change in finalCost, previous reserve and todays reserve, update final reserve, finalCost2
  useEffect(() => {
    let finalCost2 =
      -parseFloat(inputs.previousReserve) - parseFloat(inputs.finalCost);
    let finalReserve = parseFloat(inputs.reserve) + finalCost2;
    setInputs(prev => ({...prev, finalReserve: finalReserve}));
    setInputs(prev => ({...prev, finalCost2: finalCost2}));
  }, [inputs.finalCost, inputs.previousReserve, inputs.reserve]);

  let productWithoutCommition = products.filter(
    item => item?.mapValue?.fields?.acceptCommition?.booleanValue !== true,
  );

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexDirection: 'column',
        }}>
        <View style={styles.top}>
          <Text style={styles.shopName}>
            {user?.shopName?.stringValue || ''}
          </Text>
          <Text style={styles.shopAddress}>
            {user?.shopAddress?.stringValue || ''}
          </Text>
          <Text style={styles.shopDetails}>
            {user?.shopDetails?.stringValue || ''}
          </Text>
          <Text style={styles.shopPn}>
            Mobile: {user?.shopOtherPn?.stringValue || ''}, Office:{' '}
            {user?.shopOfficePn?.stringValue || ''}
          </Text>
        </View>
        {products === 0 ? (
          <View>
            <Text style={{fontSize: 20}}>
              Please add products before continue.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.beforeTable}>
              <View style={styles.BeforeTableView}>
                <Text style={styles.calculationUpperText}>Entry: 1</Text>
                <Text style={styles.calculationUpperText}>
                  Date: {dateArray[1]}
                </Text>
                <Text style={styles.calculationUpperText}>
                  Day: {dateArray[0]}
                </Text>
              </View>
              <View style={styles.BeforeTableView}>
                <Text style={styles.calculationUpperText}>Name:</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholderTextColor="green"
                  value={inputs.by}
                  onChangeText={value => handleSelectChange('by', value)}
                />
                <Text style={styles.calculationUpperText}></Text>
                <Text style={styles.calculationUpperText}></Text>
                <Text style={styles.calculationUpperText}></Text>
              </View>
            </View>

            {productWithoutCommition.length !== products.length && (
              <View style={styles.TBODY}>
                <View style={styles.TR}>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Price</Text>
                  </View>
                  <View style={styles.TH2}>
                    <Text style={styles.THtext}>Name</Text>
                  </View>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Quantity</Text>
                  </View>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Subtotal</Text>
                  </View>
                </View>
              </View>
            )}
            {/* Product With Commition */}
            {products
              .filter(
                item =>
                  item?.mapValue?.fields?.acceptCommition?.booleanValue ===
                  true,
              )
              .map((item, i) => (
                <View key={i} style={styles.TBODY}>
                  <View style={styles.TR}>
                    <View style={styles.TD}>
                      <Text style={{color: 'red'}}>
                        {item?.mapValue?.fields?.price?.integerValue}
                      </Text>
                    </View>
                    <View style={styles.TD2}>
                      <Text style={styles.title}>
                        {item?.mapValue?.fields?.name?.stringValue}
                      </Text>
                    </View>
                    <View style={styles.TD}>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="green"
                        placeholder="0"
                        value={quantity[item.mapValue.fields.name.stringValue]}
                        onChangeText={value =>
                          handleQuantity(
                            value,
                            item?.mapValue?.fields?.price?.integerValue,
                            item?.mapValue?.fields?.name?.stringValue,
                          )
                        }
                      />
                    </View>
                    <View style={styles.TD}>
                      <Text>
                        {subtotal[item?.mapValue?.fields?.name?.stringValue]}৳
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

            <View style={styles.TBODY}>
              {productWithoutCommition.length !== products.length && (
                <>
                  <View style={styles.calculationRow}>
                    <Text style={styles.calculationData}></Text>
                    <View style={styles.calculationData2}>
                      <Text style={styles.title}>মোট</Text>
                    </View>
                    <Text style={styles.calculationData}></Text>
                    <View style={styles.calculationData}>
                      <Text>{inputs.costForWithCommition}৳</Text>
                    </View>
                  </View>

                  <View style={styles.calculationRow}>
                    <View style={styles.calculationData}></View>
                    <View style={styles.calculationData2}>
                      <Text style={styles.title}>কমিশন (-)</Text>
                    </View>
                    <View style={styles.calculationData}>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="green"
                        placeholder="0"
                        value={inputs.commitionPercentage}
                        onChangeText={value =>
                          handleChange('commitionPercentage', value)
                        }
                      />
                    </View>
                    <View style={styles.calculationData}>
                      <Text>{inputs.commitionValue}৳</Text>
                    </View>
                  </View>
                  <View style={styles.calculationRow}>
                    <View style={styles.calculationData}></View>
                    <View style={styles.calculationData2}></View>
                    <View style={styles.calculationData}></View>
                    <View style={styles.calculationData}>
                      <Text>= {inputs.costAfterCommition}৳</Text>
                    </View>
                  </View>
                </>
              )}
            </View>

            {productWithoutCommition.length !== 0 && (
              <View style={styles.TBODY}>
                <View style={styles.TR}>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Price</Text>
                  </View>
                  <View style={styles.TH2}>
                    <Text style={styles.THtext}>Name</Text>
                  </View>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Quantity</Text>
                  </View>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Subtotal</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Product Without Commition */}
            {products
              .filter(
                item =>
                  item?.mapValue?.fields?.acceptCommition?.booleanValue !==
                  true,
              )
              .map((item, i) => (
                <View key={i} style={styles.TBODY}>
                  <View style={styles.TR}>
                    <View style={styles.TD}>
                      <Text style={{color: 'red'}}>
                        {item?.mapValue?.fields?.price?.integerValue}
                      </Text>
                    </View>
                    <View style={styles.TD2}>
                      <Text style={styles.title}>
                        {item?.mapValue?.fields?.name?.stringValue}
                      </Text>
                    </View>
                    <View style={styles.TD}>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="green"
                        placeholder="0"
                        value={quantity2[item.mapValue.fields.name.stringValue]}
                        onChangeText={value =>
                          handleQuantity2(
                            value,
                            item?.mapValue?.fields?.price?.integerValue,
                            item?.mapValue?.fields?.name?.stringValue,
                          )
                        }
                      />
                    </View>
                    <View style={styles.TD}>
                      <Text>
                        {subtotal2[item?.mapValue?.fields?.name?.stringValue]}৳
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

            <View style={styles.TBODY}>
              {productWithoutCommition.length !== 0 && (
                <>
                  <View style={styles.calculationRow}>
                    <Text style={styles.calculationData}></Text>
                    <View style={styles.calculationData2}></View>
                    <Text style={styles.calculationData}></Text>
                    <View style={styles.calculationData}>
                      <Text>= {inputs.costForWithoutCommition}৳</Text>
                    </View>
                  </View>

                  {(productWithoutCommition.length !== 0 ||
                    productWithoutCommition.length !== products.length) && (
                    <View style={styles.calculationRow}>
                      <Text style={styles.calculationData}></Text>
                      <View style={styles.calculationData2}>
                        <Text style={styles.title}>
                          {inputs.costForWithoutCommition} +{' '}
                          {inputs.costAfterCommition}
                        </Text>
                      </View>
                      <Text style={styles.calculationData}></Text>
                      <View style={styles.calculationData}>
                        <Text>{inputs.finalCost}৳</Text>
                      </View>
                    </View>
                  )}
                </>
              )}

              <View style={styles.calculationRow}>
                <View style={styles.calculationData}></View>
                <View style={styles.calculationData2}>
                  <Text style={styles.title}>সাবেক টাকা</Text>
                </View>
                <View style={styles.calculationData}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor="green"
                    placeholder="0"
                    value={inputs.previousReserve}
                    onChangeText={value =>
                      handleChange('previousReserve', value)
                    }
                  />
                </View>
                <View style={styles.calculationData}>
                  <Text>{inputs.previousReserve}৳</Text>
                </View>
              </View>

              <View style={styles.calculationRow}>
                <View style={styles.calculationData}></View>
                <View style={styles.calculationData2}></View>
                <View style={styles.calculationData}></View>
                <View style={styles.calculationData}>
                  <Text>{inputs.finalCost2}৳</Text>
                </View>
              </View>

              <View style={styles.calculationRow}>
                <View style={styles.calculationData}></View>
                <View style={styles.calculationData2}>
                  <Text style={styles.title}>জমা</Text>
                </View>
                <View style={styles.calculationData}>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor="green"
                    placeholder="0"
                    value={inputs.reserve}
                    onChangeText={value => handleChange('reserve', value)}
                  />
                </View>
                <View style={styles.calculationData}>
                  <Text>{inputs.reserve}৳</Text>
                </View>
              </View>

              <View style={styles.calculationRow}>
                <Text style={styles.calculationData}></Text>
                <View style={styles.calculationData2}>
                  <Text style={styles.title}>মোট বাকি টাকা</Text>
                </View>
                <Text style={styles.calculationData}></Text>
                <View style={styles.calculationData}>
                  <Text>{inputs.finalReserve}৳</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  top: {
    marginBottom: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  beforeTable: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  BeforeTableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calculationUpperText: {
    fontWeight: 'bold',
  },
  shopName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  shopAddress: {
    fontWeight: 'bold',
  },
  shopDetails: {},
  shopPn: {
    fontWeight: 'bold',
  },
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
  TBODY: {
    alignItems: 'center',
  },
  TR: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  TH: {
    width: 70,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2263a5',
    borderLeftWidth: 1,
    borderColor: '#f1f8ff',
  },
  TH2: {
    width: 160,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2263a5',
    borderLeftWidth: 1,
    borderColor: '#f1f8ff',
  },
  THtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  TD: {
    borderLeftWidth: 1,
    borderColor: '#ffffff',
    width: 70,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f1f8ff',
  },
  TD2: {
    borderLeftWidth: 1,
    borderColor: '#ffffff',
    width: 160,
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
  },
  input: {
    height: 50,
    width: 70,
    textAlign: 'center',
    backgroundColor: '#dddfff',
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
  nameInput: {
    height: 40,
    width: 200,
    textAlign: 'center',
    backgroundColor: '#dddfff',
  },
  calculationRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#7393b3',
  },
  calculationData: {
    width: 70,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
  },
  calculationData2: {
    width: 160,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EntryForm;
