import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

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
    cost: 0, // todays total cost
    commitionPercentage: 0, // perchantage of discount
    commitionValue: 0, //
    finalCost: 0, // after commition the final cost
    previousReserve: 0, // previous date final reserved
    reserve: 0, // todays reserve
    finalReserve: 0, // (previousReserve-cost)+reserve
    by: '', //buyer
  });

  console.log(inputs);
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
  const [quantity, setQuantity] = useState({...initialQuantity});
  const [subtotal, setSubtotal] = useState({...initialQuantity});

  // Handle change in quantity and also update subtotal
  const handleQuantity = (valuePassed, price, name) => {
    let value = 0;
    if (valuePassed !== '') value = valuePassed;
    setSubtotal(prev => {
      return {...prev, [name]: value * price};
    });
    setQuantity(prev => {
      return {...prev, [name]: value};
    });
  };

  //with change in subtotal, update total cost value
  useEffect(() => {
    let total = 0;
    for (let item in subtotal) {
      total += subtotal[item];
    }
    setInputs(prev => ({...prev, cost: total}));
  }, [subtotal]);

  //with change in commition, update commition Value and final total
  useEffect(() => {
    let finalCost = 0;
    let commitionValue = 0;
    if (inputs.commitionPercentage !== 0)
      commitionValue = (inputs.commitionPercentage / 100) * inputs.cost;
    finalCost = inputs.cost - commitionValue;
    setInputs(prev => ({...prev, commitionValue: commitionValue.toFixed()}));
    setInputs(prev => ({...prev, finalCost: finalCost.toFixed()}));
  }, [inputs.commitionPercentage, inputs.cost]);

  //with change in finalCost, previous reserve and todays reserve, update final reserve
  useEffect(() => {
    let totalCost = inputs.previousReserve - inputs.finalCost;
    let finalReserve = totalCost + parseInt(inputs.reserve);
    setInputs(prev => ({...prev, finalReserve: finalReserve}));
  }, [inputs.finalCost, inputs.previousReserve, inputs.reserve]);

  return (
    <>
      <ScrollView style={styles.container}>
        <ScrollView
          horizontal
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
                  <Text style={styles.calculationPartText}>Entry: 1</Text>
                  <Text style={styles.calculationPartText}>
                    Date: {dateArray[1]}
                  </Text>
                  <Text style={styles.calculationPartText}>
                    Day: {dateArray[0]}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.calculationPartText}>
                    Name: {inputs.by}
                  </Text>
                  <TextInput
                    style={styles.nameInput}
                    placeholderTextColor="green"
                    value={inputs.commitionPercentage}
                    onChangeText={value => handleSelectChange('by', value)}
                  />
                </View>
              </View>
              <View style={styles.TBODY}>
                <View style={styles.TR}>
                  <View style={styles.TH}>
                    <Text style={styles.THtext}>Price</Text>
                  </View>
                  <View style={styles.TH}>
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

              {products.map((item, i) => (
                <View key={i} style={styles.TBODY}>
                  <View style={styles.TR}>
                    <View style={styles.TD}>
                      <Text style={{color: 'red'}}>
                        {item?.mapValue?.fields?.price?.doubleValue}
                      </Text>
                    </View>
                    <View style={styles.TD}>
                      <Text>{item?.mapValue?.fields?.name?.stringValue}</Text>
                    </View>
                    <View style={styles.TD}>
                      <TextInput
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="green"
                        value={
                          quantity[item?.mapValue?.fields?.name?.stringValue]
                        }
                        onChangeText={value =>
                          handleQuantity(
                            value,
                            item?.mapValue?.fields?.price?.doubleValue,
                            item?.mapValue?.fields?.name?.stringValue,
                          )
                        }
                      />
                    </View>
                    <View style={styles.TD}>
                      <Text>
                        {subtotal[item?.mapValue?.fields?.name?.stringValue]}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
              <View style={styles.calculationPart}>
                <View style={styles.calculationSubPart}>
                  <Text style={styles.calculationPartText}>Total</Text>
                  <Text style={styles.calculationPartText}>{inputs.cost}৳</Text>
                  <Text></Text>
                </View>
                <View style={styles.calculationSubPart}>
                  <Text style={styles.calculationPartText}>Commition (-)</Text>
                  <Text style={styles.calculationPartText}>
                    {inputs.commitionValue}৳
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor="green"
                    placeholder="%"
                    value={inputs.commitionPercentage}
                    onChangeText={value =>
                      handleChange('commitionPercentage', value)
                    }
                  />
                </View>
                <View style={styles.calculationSubPart}>
                  <Text style={styles.calculationPartText}>Final Total</Text>
                  <Text style={styles.calculationPartText}>
                    {inputs.finalCost}৳
                  </Text>
                  <Text style={styles.calculationPartText}></Text>
                </View>
                <View style={styles.calculationSubPart}>
                  <Text style={styles.calculationPartText}>
                    Previous Reserve
                  </Text>
                  <Text style={styles.calculationPartText}>
                    {inputs.previousReserve}৳
                  </Text>
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
                <View style={styles.calculationSubPart}>
                  <Text style={styles.calculationPartText}>Todays Reserve</Text>
                  <Text style={styles.calculationPartText}>
                    {inputs.reserve}৳
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor="green"
                    placeholder="0"
                    value={inputs.reserve}
                    onChangeText={value => handleChange('reserve', value)}
                  />
                </View>
                <View style={styles.calculationSubPart}>
                  <Text style={styles.calculationPartText}>Final Reserve</Text>
                  <Text style={styles.calculationPartText}>
                    {inputs.finalReserve}৳
                  </Text>
                  <Text style={styles.calculationPartText}></Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  shopName: {
    fontWeight: 'bold',
    fontSize: 25,
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
    height: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f1f8ff',
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
  input: {
    fontSize: 13,
    height: 35,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  nameInput: {
    fontSize: 13,
    width: 200,
    height: 35,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  calculationPart: {
    margin: 10,
    width: 300,
  },
  calculationSubPart: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    borderLeftColor: 'gray',
    borderLeftWidth: 0.2,
    height: 40,
  },
  calculationPartText: {
    fontWeight: 'bold',
  },
});

export default EntryForm;
