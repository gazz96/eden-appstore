import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Modal,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import Toast from 'react-native-toast-message';
import { Colors } from '../constant';
import { ProductAction } from '../actions';

//Components
import {
  BadgeItem,
  Gap,
  HeaderWithBackButton,
  PropertiInlineCard,
} from '../components';

import { BranchAction } from '../actions';
import { ShopContext } from '../context';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import { useHookstate } from '@hookstate/core';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { UserContext } from '../context';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateOrderScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [packages, setPackages] = useState([]);

  const [timeDelivery, setTimeDelivery] = useState(new Date());
  const [openModalTimeDelivery, setOpenModalTimeDelivery] = useState(false);
  const [timePickup, setTimePickup] = useState(new Date());
  const [openModalTimePickup, setOpenModalTimePickup] = useState(false);
  const auth = UserContext();
  const [isLoadingAddBowl, setIsLoadingAddBowl] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [total, setTotal] = useState(0);

  const [flavours, setFlavours] = useState([
    {
      id: 'Fruits',
      name: 'Fruits',
      checked: false,
    },
    {
      id: 'Berries',
      name: 'Berries',
      checked: false,
    },
    {
      id: 'Deserts',
      name: 'Deserts',
      checked: false,
    },
    {
      id: 'Drink',
      name: 'Drink',
      checked: false,
    },
    {
      id: 'Spicy',
      name: 'Spicy',
      checked: false,
    },
  ]);

  const [tastes, setTastes] = useState([
    {
      id: 'Sweet',
      name: 'Sweet',
      checked: false,
    },
    {
      id: 'Acid',
      name: 'Acid',
      checked: false,
    },
    {
      id: 'Tart (Bitter)',
      name: 'Tart (Bitter)',
      checked: false,
    },
    {
      id: 'Flower',
      name: 'Flower',
      checked: false,
    },
    {
      id: 'Creamy',
      name: 'Creamy',
      checked: false,
    },
    {
      id: 'Chocolate',
      name: 'Chocolate',
      checked: false,
    },
    {
      id: 'Coffee',
      name: 'Coffee',
      checked: false,
    },
    {
      id: 'Fresh',
      name: 'Fresh',
      checked: false,
    },
  ]);

  // const packagePrice = {
  //   'Premium (Tombacco, AlFakher, Adalya)': 300000,
  //   'Elite (Tangiers, DarkSide, MustHave)': 350000
  // };


  const bowls = [1, 2, 3];
  const levelOfStrength = ['Soft', 'Medium', 'Strong'];
  const minOrIce = ['Mint', 'Ice'];

  const messageInputRef = useRef(null);
  const addressInputRef = useRef(null);

  const form = useHookstate({
    product_id: null,
    branch_id: null,
    user_id: auth.get().id,
    package: null,
    how_many_bowl: null,
    // level_of_strength: null,
    // flavour: null,
    // mint_or_ice: null,
    // comments: null,
    address: auth.get().address || '',
    time_of_delivery: null,
    time_of_pickup: null,
    amount: null,
    details: [],
  });

  const [formModal, setFormModal] = useState({
    level_of_strength: null,
    mint_or_ice: null,
    comments: null,
    taste: null,
    flavour: null,
    package: null
  });

  const getProducts = async() => {
    setLoading(true)
    try {
      const response = await ProductAction.list({
        is_mobile: 1,
        posts_per_page: 100
      });
      console.log('getProducts', response);
      setPackages(response.data || [])
    }
    catch(error) {
      Toast.show({
        type: 'error',
        text1: 'Information',
        text2: 'Something wrong'
      });
    }
    finally {
      setLoading(false)
    }
  }

  const addDetails = async () => {
    setIsLoadingAddBowl(true);
    try {

      // let selectedFlavour = [];
      // flavours.map((value, index) => {
      //   if (value.checked) {
      //     selectedFlavour.push(value.name);
      //     value.checked = false;
      //   }
      //   return value;
      // });

      // setFlavours(flavours)

      // let selectedFlavourString = selectedFlavour.join(',')

      // setFormModal(prevFormModal => ({
      //   ...prevFormModal,
      //   ['flavour']: selectedFlavourString
      // }));

      //await delay(5000);

      // setFormModal(prevFormModal => ({
      //   ...prevFormModal,
      //   taste: getSelectedTaste(),
      // }));



      form.details.set(p => [...p, formModal]);
      // if ((form.get().details).length) {
      //   let total = 0;
      //   (form.get().details).map(detail => {
      //     (total = total + packagePrice[detail.package])
      //   })
      //   setTotal(total)
      // }


    } catch (error) {
      console.log('adddetails', error);
    } finally {
      resetFormModal()
      //setFlavours(flavours)
      //setTastes(tastes)
      setIsLoadingAddBowl(false)
      setModalVisible(false)

    }
  };

  const resetFormModal = () => {
    getSelectedFlavour()
    getSelectedTaste()
    setFormModal({
      level_of_strength: null,
      mint_or_ice: null,
      comments: null,
      taste: null,
      flavour: null,
    })
  }

  const getSelectedFlavour = async () => {
    let selectedFlavour = [];
    flavours.map((value, index) => {
      if (value.checked) {
        selectedFlavour.push(value.name);
        value.checked = false;
      }
      return value;
    });

    return selectedFlavour.join(',');
  };

  const getSelectedTaste = async () => {
    let selectedTaste = [];
    tastes.map((value, index) => {
      if (value.checked) {
        selectedTaste.push(value.name);
        value.checked = false;
      }
      return value;
    });
    return selectedTaste.join(',');
  };

  const orderProduct = async () => {
    setLoading(true);
    try {
      const response = await ProductAction.order(form.get());

      form.how_many_bowl.set(null);

      console.log(response);
      navigation.navigate('My Order');

      Toast.show({
        type: 'success',
        text1: 'Information',
        text2: 'Success'
      });

      setFlavours(flavours);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        if (error.response.status == 422) {
          let errors = error.response.data.errors;
          for (let err in errors) {
            console.log(err);
            for (let message in errors[err]) {
              console.log('messagees', errors[err][message]);
              Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: errors[err][message],
              });
            }
          }
        }

        if (error.response.status == 404) {
          let errors = error.response.data.errors;
          for (let err in errors) {
            Toast.show({
              type: 'error',
              text1: 'Warning',
              text2: errors[err],
            });
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        canInput();
        getBranch();
        getProducts()
        form.time_of_delivery.set(
          moment(timeDelivery).format('YYYY-MM-DD HH:mm'),
        );
        form.time_of_pickup.set(moment(timePickup).format('YYYY-MM-DD HH:mm'));
      },
      [navigation],
    );
    console.log('formModal')
  }, [formModal]);

  const getBranch = async () => {
    try {
      let response = await BranchAction.list();
      setBranches(response.data);
    } catch (err) {
      console.log('err', err);
    }
  };

  const canInput = () => {
    let currentDate = new Date();
    if (currentDate.getHours() > 23 && currentDate.getHours() < 14) {
      Toast.show({
        text1: 'Order start from 2PM - 11PM',
      });
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
          <ImageBackground
            source={require('../assets/images/long-background.png')}
            resizeMode="cover"
            style={{ width: '100%', flex: 1, height: '100%' }}>
            <ScrollView style={styles.container}>
              <View style={{ paddingHorizontal: 20 }}>
                <Gap height={20} />
                <HeaderWithBackButton
                  onPress={() => goBack(navigation)}
                  title={'DELIVERY ORDER'}
                />
                <Gap height={25} />
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}>
                    <Gap height={30} />
                    <View style={{ width: '100%' }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Montserrat-SemiBold',
                          marginBottom: 5,
                        }}>
                        Location
                      </Text>
                      <SelectDropdown
                        data={branches}
                        defaultButtonText="Select Store"
                        buttonStyle={{
                          width: '100%',
                          borderBottomWidth: 1,
                          borderRadius: 15,
                          paddingLeft: 0,
                        }}
                        buttonTextStyle={{
                          fontFamily: 'Montserrat-SemiBold',
                          color: '#A3A3A3',
                        }}
                        dropdownStyle={{}}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          form.branch_id.set(selectedItem.id);
                          return selectedItem.name;
                        }}
                        rowTextForSelection={(item, index) => {
                          //console.log('item', item.name)
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return item.name;
                        }}
                      />
                    </View>
                    <Gap height={20} />

                    {/* <View style={{width: '100%'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Montserrat-SemiBold',
                        marginBottom: 5,
                      }}>
                      How many bowls
                    </Text>
                    <SelectDropdown
                      data={bowls}
                      defaultButtonText="How many bowls"
                      buttonStyle={{
                        width: '100%',
                        borderBottomWidth: 1,
                        borderRadius: 15,
                        paddingLeft: 0,
                      }}
                      buttonTextStyle={{
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#A3A3A3',
                      }}
                      dropdownStyle={{}}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        form.how_many_bowl.set(selectedItem);
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>
                  <Gap height={20} /> */}

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {isLoadingAddBowl ? (
                        <ActivityIndicator />
                      ) : (
                        form.details.get().map((detail, index) => (
                          <View
                            key={index}
                            style={{
                              backgroundColor: '#eee',
                              width: '100%',
                              borderRadius: 15,
                              padding: 15,
                              marginBottom: 10,
                            }}>
                            <Text>
                              Package {detail.package}
                            </Text>
                            <Text>
                              Level of strength: {detail.level_of_strength}
                            </Text>
                            <Text>Taste: {detail.taste}</Text>
                            <Text>Flavour: {detail.flavour}</Text>
                            <Text>Mint or ice: {detail.mint_or_ice}</Text>
                            <Text>Comments: {detail.comments}</Text>
                            <Gap height={10} />
                            <TouchableOpacity
                              style={{
                                backgroundColor: 'red',
                                width: '100%',
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 15,
                              }}
                              onPress={() => {
                                form.details.set(current =>
                                  current.filter(
                                    (value, valueIndex) => index != valueIndex,
                                  ),
                                );

                                // if ((form.get().details).length) {
                                //   let total = 0;
                                //   (form.get().details).map(detail => {
                                //     (total = total + packagePrice[detail.package])
                                //   })
                                //   setTotal(total)
                                // }
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontFamily: 'Montserrat-SemiBold',
                                }}>
                                Delete
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ))
                      )}
                    </View>

                    {
                      (form.get().details).length < 3 ?
                        <TouchableOpacity
                          style={{ width: '100%', borderRadius: 15, overflow: 'hidden' }}
                          onPress={() => setModalVisible(true)}>
                          <Text
                            style={{
                              color: '#222',
                              backgroundColor: '#eee',
                              height: 50,
                              width: '100%',
                              textAlign: 'center',
                              borderRadius: 15,
                              lineHeight: 50,
                              fontFamily: 'Montserrat-SemiBold',
                              color: '#A3A3A3',
                              fontSize: 18,
                            }}>
                            Add Bowl
                          </Text>
                        </TouchableOpacity>
                        : <></>
                    }

                    <Gap height={20} />

                    <View style={{ width: '100%' }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Montserrat-SemiBold',
                          color: '#FFFFF0',
                          marginBottom: 5,
                        }}
                        onPress={() => {
                          addressInputRef.current.focus();
                        }}>
                        Your Address:{' '}
                      </Text>
                      <TextInput
                        ref={addressInputRef}
                        multiline={true}
                        onChangeText={text => form.address.set(text)}
                        defaultValue={form.address.get()}
                        style={{
                          borderColor: 'rgba(255, 255, 255, 1)',
                          borderWidth: 1,
                          height: 100,
                          fontFamily: 'Montserrat-Regular',
                          borderRadius: 8,
                          padding: 8,
                          backgroundColor: '#fff',
                          color: '#222'
                        }}
                      />
                      <Text
                        style={{
                          color: '#eee',
                          marginTop: 5,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        Free delivery applies within a 5 km radius of our location.
                        Delivery beyond 5 km requires a charge of 50K IDR for every 3 km.
                      </Text>
                    </View>
                    <Gap height={20} />
                    <View style={{ width: '100%' }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Montserrat-SemiBold',
                          color: '#FFFFF0',
                          marginBottom: 5,
                        }}>
                        Time of delivery
                      </Text>
                      <Pressable
                        onPress={() => {
                          setOpenModalTimeDelivery(true);
                        }}>
                        <Text
                          style={{
                            backgroundColor: '#eee',
                            padding: 15,
                            textAlign: 'center',
                            width: '100%',
                            borderRadius: 15,
                            fontFamily: 'Montserrat-SemiBold',
                            color: '#A3A3A3',
                            fontSize: 18,
                            overflow: 'hidden',
                          }}>
                          {form.time_of_delivery.get()}
                        </Text>
                        <Text
                          style={{
                            color: '#eee',
                            marginTop: 5,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          Time of delivery: 12 pm - 9 pm.
                        </Text>
                      </Pressable>

                      <DatePicker
                        date={timeDelivery}
                        onDateChange={setTimeDelivery}
                        mode="datetime"
                        fadeToColor="#eee"
                        textColor="#A3A3A3"
                        modal={true}
                        open={openModalTimeDelivery}
                        style={{ fontFamily: "Montserrat-SemiBold" }}
                        onConfirm={(date) => {
                          let currentDate = new Date();
                          let endDate = moment(date);
                          var duration = moment.duration(endDate.diff(currentDate))
                          var hours = duration.asHours();
                          console.log('hours', hours)
                          if (hours <= 1) {
                            form.time_of_delivery.set(
                              moment(currentDate).add(1, "hours").format("YYYY-MM-DD HH:mm")
                            );
                          } else {
                            form.time_of_delivery.set(
                              moment(date).format("YYYY-MM-DD HH:mm")
                            );
                          }

                          setOpenModalTimeDelivery(false);
                        }}
                        onCancel={() => {
                          setOpenModalTimeDelivery(false);
                        }}
                      />
                    </View>
                    <Gap height={30} />

                    <View style={{ width: '100%' }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Montserrat-SemiBold',
                          color: '#FFFFF0',
                          marginBottom: 5,
                        }}>
                        Time of pickup
                      </Text>
                      <Text
                        style={{
                          backgroundColor: '#eee',
                          padding: 15,
                          textAlign: 'center',
                          width: '100%',
                          borderRadius: 15,
                          fontFamily: 'Montserrat-SemiBold',
                          color: '#A3A3A3',
                          fontSize: 18,
                          overflow: 'hidden',
                        }}
                        onPress={() => {
                          setOpenModalTimePickup(true);
                        }}>
                        {form.time_of_pickup.get()}
                      </Text>
                      {/* <Text
                        style={{
                          color: '#eee',
                          marginTop: 5,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        Pick up time from 12 pm - 23 pm, during 24 hours after delivery.
                      </Text> */}

                      <DatePicker
                        date={timePickup}
                        onDateChange={setTimePickup}
                        mode="datetime"
                        fadeToColor="#eee"
                        textColor="#A3A3A3"
                        modal={true}
                        open={openModalTimePickup}
                        style={{ fontFamily: "Montserrat-SemiBold" }}
                        onConfirm={(date) => {
                          let oneDay = 24;
                          let currentDate = new Date();
                          let endDate = moment(date);
                          var duration = moment.duration(endDate.diff(currentDate))
                          var hours = duration.asHours()

                          if (date < currentDate) {
                            form.time_of_pickup.set(
                              moment(currentDate)
                                .add(24, "hours")
                                .format("YYYY-MM-DD HH:mm")
                            );
                            setOpenModalTimePickup(false);
                          }

                          if (hours < oneDay) {
                            form.time_of_pickup.set(
                              moment(currentDate)
                                .add(24, "hours")
                                .format("YYYY-MM-DD HH:mm")
                            );
                          }
                          else {
                            form.time_of_pickup.set(
                              moment(date).format("YYYY-MM-DD HH:mm")
                            );
                          }

                          setTimePickup(
                            new Date(form.time_of_pickup.get())
                          );
                          setOpenModalTimePickup(false);
                        }}
                        onCancel={() => {
                          setOpenModalTimePickup(false);
                        }}
                      />
                    </View>
                    {/*
                    
                    <Gap height={30} /> 
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: 20,
                        }}>
                        Total
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Montserrat-SemiBold',
                          fontSize: 24,
                        }}>
                        Rp
                        {
                          isLoadingAddBowl ? <ActivityIndicator/> : Rp(total)
                        }
                      </Text>
                    </View> */}
                    <Gap height={30} />
                    <TouchableOpacity onPress={() => { }} style={{ width: '100%' }}>
                      <LinearGradient
                        colors={['#FFDD9C', '#BC893C']}
                        style={{ borderRadius: 15 }}>
                        <Text
                          style={styles.btnPrimary}
                          onPress={() => {
                            orderProduct();
                          }}>
                          SUBMIT ORDER
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <Gap height={30} />
                  </View>
                )}
              </View>
              <Gap height={20} />
              {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => {
                  setPage(page => page - 1)
                  getProperties({
                    page: page,
                  });
                }} style={styles.btnLoadMore}>
                <Icon name={'chevron-left'} size={12} solid color={'#fff'}/>
                <Text style={{color: Colors.white, marginLeft: 10}}>Sebelumnya</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                  setPage(page => page + 1)
                  getProperties({
                    page: page,
                  });
                }} style={styles.btnLoadMore}>
                <Text style={{color: Colors.white, marginRight: 10}}>Selanjutnya</Text>
                <Icon name={'chevron-right'} size={12} solid color={'#fff'}/>
              </TouchableOpacity>
            </View> */}
            </ScrollView>
          </ImageBackground>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
              <ScrollView style={styles.centeredView} >
                <View style={styles.modalView}>
                  <View style={{ width: '100%' }}>
                    <View style={{ width: '100%' }}>
                      <Text
                        style={{
                          color: '#222',
                          fontFamily: 'Montserrat-SemiBold',
                          marginBottom: 5,
                        }}>
                        Package
                      </Text>
                      <SelectDropdown
                        data={packages}
                        defaultButtonText="Select Package"
                        buttonStyle={{
                          width: '100%',
                          borderBottomWidth: 0,
                          borderRadius: 15,
                          paddingLeft: 0,
                          marginBottom: 10,
                          backgroundColor: '#fff',
                        }}
                        buttonTextStyle={{
                          fontFamily: 'Montserrat-SemiBold',
                          color: '#A3A3A3',
                        }}
                        dropdownStyle={{}}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                          setFormModal(prevFormModal => ({
                            ...prevFormModal,
                            ['package']: selectedItem.name
                          }))
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          form.product_id.set(selectedItem.id)
                          return selectedItem.name;
                        }}
                        rowTextForSelection={(item, index) => {
                          form.product_id.set(item.id)
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return item.name;
                        }}
                      />
                    </View>
                    <Gap height={20} />
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        marginBottom: 5,
                      }}>
                      Strength level
                    </Text>

                    <SelectDropdown
                      data={levelOfStrength}
                      defaultButtonText="Select strength level"
                      buttonStyle={{
                        width: '100%',
                        borderBottomWidth: 0,
                        borderRadius: 15,
                        paddingLeft: 0,
                        marginBottom: 10,
                        backgroundColor: '#fff',
                      }}
                      buttonTextStyle={{
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#A3A3A3',
                      }}
                      dropdownStyle={{}}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setFormModal(prevFormModal => ({
                          ...prevFormModal,
                          ['level_of_strength']: selectedItem,
                        }));
                        return selectedItem;
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected

                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>
                  <Gap height={20} />

                  <View style={{ width: '100%' }}>
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        marginBottom: 5,
                      }}>
                      Flavour
                    </Text>

                    {/* MultiSelect */}
                    <Gap height={5} />
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                      {flavours.map((value, flavourIndex) => (
                        <Pressable
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '48%',
                            marginBottom: 10,
                          }}
                          key={value.id}
                          onPress={() => {

                            setFlavours(
                              flavours.map((value, index) => {
                                if (index == flavourIndex) {
                                  value.checked = !value.checked;
                                }
                                return value;
                              }),
                            );
                            let selectedFlavour = [];
                            flavours.map((value, index) => {
                              if (value.checked) {
                                selectedFlavour.push(value.name)
                              }
                            })
                            setFormModal(prevFormModal => ({
                              ...prevFormModal, ['flavour']: selectedFlavour.join(',')
                            }))
                          }}>
                          <CheckBox
                            tintColor="#222"
                            tintColors={{
                              true: '#000',
                              false: '#222',
                            }}
                            boxType='square'
                            value={value.checked}
                            style={{ padding: 0 }}
                            onTintColor='#222'
                            onFillColor='#222'
                            onCheckColor='#fff'
                          />
                          <Text
                            style={{
                              color: '#222',
                              fontFamily: 'Montserrat-SemiBold',
                              fontSize: 16,
                              marginLeft: 5
                            }}>
                            {value.name}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  <Gap height={20} />

                  <View style={{ width: '100%' }}>
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        marginBottom: 5,
                      }}>
                      Taste
                    </Text>

                    {/* MultiSelect */}
                    <Gap height={5} />
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                      {tastes.map((value, tasteIndex) => (
                        <Pressable
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '48%',
                            marginBottom: 10,
                            marginRight: '2%'
                          }}
                          key={value.id}
                          onPress={() => {
                            setTastes(
                              tastes.map((value, index) => {
                                if (index == tasteIndex) {
                                  value.checked = !value.checked;
                                }
                                return value;
                              }),
                            );
                            let selectedTaste = [];
                            tastes.map((value, index) => {
                              if (value.checked) {
                                selectedTaste.push(value.name)
                              }
                            })
                            setFormModal(prevFormModal => ({
                              ...prevFormModal, ['taste']: selectedTaste.join(',')
                            }))

                          }}>
                          <CheckBox
                            tintColor="#222"
                            tintColors={{
                              true: '#000',
                              false: '#222',
                            }}
                            boxType='square'
                            value={value.checked}
                            style={{ padding: 0 }}
                            onTintColor='#222'
                            onFillColor='#222'
                            onCheckColor='#fff'
                          />
                          <Text
                            style={{
                              color: '#222',
                              fontFamily: 'Montserrat-SemiBold',
                              fontSize: 16,
                              marginLeft: 10
                            }}>
                            {value.name}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  <Gap height={20} />


                  <View style={{ width: '100%' }}>
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        marginBottom: 5,
                      }}>
                      Mint or ice
                    </Text>
                    <SelectDropdown
                      data={minOrIce}
                      defaultButtonText="Select"
                      buttonStyle={{
                        width: '100%',
                        borderBottomWidth: 0,
                        borderRadius: 15,
                        paddingLeft: 0,
                        backgroundColor: '#fff',
                      }}
                      buttonTextStyle={{
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#A3A3A3',
                      }}
                      dropdownStyle={{}}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setFormModal(prevFormModal => ({
                          ...prevFormModal,
                          ['mint_or_ice']: selectedItem,
                        }));
                        return selectedItem;
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        //setFormModal({mint_or_ice: selectedItem});
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>
                  <Gap height={20} />
                  <View style={{ width: '100%' }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#222',
                        marginBottom: 5,
                      }}
                      onPress={() => {
                        messageInputRef.current.focus();
                      }}>
                      Your Comment:{' '}
                    </Text>
                    <TextInput
                      placeholder={
                        'Example:\n1.Proportion of ice \n2.Which flavour has to be excluded'
                      }
                      placeholderTextColor={'#ababab'}
                      ref={messageInputRef}
                      multiline={true}
                      onChangeText={text => {
                        setFormModal(prevFormModal => ({
                          ...prevFormModal,
                          ['comments']: text,
                        }));
                      }}
                      style={{
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 1,
                        height: 100,
                        fontFamily: 'Montserrat-Regular',
                        borderRadius: 8,
                        padding: 8,
                        width: '100%',
                        backgroundColor: '#fff',
                        color: '#222'
                      }}
                    />
                  </View>
                  <Gap height={20} />
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}>
                    <Pressable
                      style={{
                        width: '49%',
                        backgroundColor: 'red',
                        height: 50,
                        borderRadius: 8,
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text
                        style={[
                          styles.textStyle,
                          { color: '#fff', textAlign: 'center' },
                        ]}>
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{
                        width: '49%',
                        backgroundColor: '#222',
                        height: 50,
                        borderRadius: 8,
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={addDetails}>
                      <Text
                        style={[
                          styles.textStyle,
                          { textAlign: 'center', color: '#fff' },
                        ]}>
                        {isLoadingAddBowl ? <ActivityIndicator /> : 'Add'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateOrderScreen;

const goBack = navigation => {
  navigation.goBack();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnLoadMore: {
    backgroundColor: Colors.primary,
    color: '#fff',
    height: 30,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
    width: 120,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    borderRadius: 25,
    color: '#fff',
    width: '100%',
    height: 50,
    lineHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: 'Montserrat-Bold',
  },
  modalView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 12,
  },
  buttonClose: {
    width: '100%',
    flexWrap: 'wrap',
  },
  textStyle: {
    width: '100%',
    color: 'red',
  },
});
