import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { LangContext, UserContext } from '../context';
import { Rp, BASE_URL } from '../constant';
// import {TouchableOpacity} from 'react-native-gesture-handler';

import Gap from './Gap';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { AuthAction, UserAction } from '../actions';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const state = UserContext();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const currentLang = LangContext();
  const langs = [
    {
      code: 'en',
      label: 'English'
    },
    {
      code: 'gr',
      label: 'Germany'
    }, {
      code: 'ru',
      label: 'Rusia'
    }, {
      code: 'ar',
      label: 'Arabic'
    }, {
      code: 'id',
      label: 'Indonesia'
    },
  ]

  const getMyProfile = async () => {
    setLoading(true);
    try {
      const response = await UserAction.me(state.get().id);
      setUser(response);
      setLoading(false);
    } catch (error) {
      console.log('error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getMyProfile();
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#272727',
      }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{ flexDirection: 'row', alignContent: 'center', padding: 20 }}>
          {
            loading ? <ActivityIndicator /> :
              <>
                <Image
                  source={{
                    uri: BASE_URL + '/' + user.photo,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#eee',
                  }}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 16,
                    }}>
                    {user.first_name}
                  </Text>
                  <Text
                    style={{
                      color: '#FFDD9C',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 16,
                    }}>
                    {Rp(user.point)} EDC
                  </Text>
                </View>
              </>
          }

        </View>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ABOUT EDEN');
            }}>
            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>
              ABOUT EDEN
            </Text>
          </TouchableOpacity>
          {/* <Gap height={20} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CARTS EDEN');
            }}>
            <Text style={{color: '#fff', fontFamily: 'Montserrat-SemiBold'}}>
              CART
            </Text>
          </TouchableOpacity> */}
          <Gap height={20} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FAVORITES');
            }}>
            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>
              FAVORITE
            </Text>
          </TouchableOpacity>
          <Gap height={20} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MY RESERVATION');
            }}>
            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>
              RESERVATIONS
            </Text>
          </TouchableOpacity>
          <Gap height={20} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FAQ');
            }}>
            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>
              FAQ
            </Text>
          </TouchableOpacity>
          {/* <Gap height={20} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WALLET');
            }}>
            <Text style={{color: '#fff', fontFamily: 'Montserrat-SemiBold'}}>
              WALLET
            </Text>
          </TouchableOpacity> */}
          <Gap height={20} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SETTINGS');
            }}>
            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>
              SETTINGS
            </Text>
          </TouchableOpacity>
          {/* <Gap height={20} />
          <TouchableOpacity>
            <Text style={{color: '#fff', fontFamily: 'Montserrat-SemiBold'}}>
              TECHNICAL SUPPORT
            </Text>
          </TouchableOpacity> */}

          <Gap height={20} />

          <TouchableOpacity
            onPress={() => {
              state.set({})
              AuthAction.clearSess()
              navigation.popToTop()
            }}>
            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>
              LOG-OUT
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      {/* <View
        style={{
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <SelectDropdown
          data={langs}
          defaultValue={currentLang.get()}
          defaultButtonText="Select Language"
          buttonStyle={{
            borderBottomWidth: 1,
            borderRadius: 10,
            color: '#222',
            backgroundColor: 'transparent',
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'left',
            borderBottomWidth: 0,
            backgroundColor: '#fff',
            width: '100%',
            marginLeft: 10,
            height: 30,
          }}
          buttonTextStyle={{
            fontFamily: 'Montserrat-SemiBold',
            color: '#222',
            margin: 0,
            fontSize: 14,
          }}
          selectedRowTextStyle={{
            color: 'orange',
            fontFamily: 'Montserrat-SemiBold',
          }}
          selectedRowStyle={{
            color: 'red',
            fontFamily: 'Montserrat-SemiBold',
            padding: 0,
          }}
          rowStyle={{
            color: 'green',
            fontFamily: 'Montserrat-SemiBold',
            padding: 0,
          }}
          searchInputStyle={{
            fontFamily: 'Montserrat-SemiBold',
            padding: 0,
          }}
          dropdownStyle={{
            fontFamily: 'Montserrat-SemiBold',
            padding: 0,
          }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            currentLang.set(selectedItem.code);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            // formState.branch_id.set(selectedItem.id);
            console.log(selectedItem);
            return selectedItem.label;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            //currentLang.set(index);
            console.log(item);
            return item.label;
          }}
        />
      </View> */}
    </View>
  );
};

export default CustomDrawer;
