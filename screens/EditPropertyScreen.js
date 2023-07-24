import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Gap, HeaderWithBackButton, Loading } from '../components'
// library
import Icon from 'react-native-vector-icons/FontAwesome5';

import { BASE_URL, Colors, JenisFasilitas } from '../constant';
import { useHookstate } from '@hookstate/core';
import { PropertyAction } from '../actions';
import { SelectCityContext, UserContext } from '../context';

import SelectDropdown from 'react-native-select-dropdown'
import CheckBox from '@react-native-community/checkbox';


import * as ImagePicker from 'react-native-image-picker';
import { Image } from 'react-native';
import Toast from 'react-native-toast-message';

import {actions, defaultActions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";


const EditPropertyScreen = ({ route, navigation }) => {
  const cityContext = SelectCityContext();
  const user = UserContext();
  const {property_id} = route.params;
  const [isLoading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [previewThumbnail, setPreviewThumbnail] = useState('');

  //galleries
  const [galleries, setGallery] = useState([]);
  const [previewGallery, setPreviewGallery] = useState([]);
  const [property, setProperty] = useState({});

  const [attachEditor, setAttachEditor] = useState(false);

  const form = useHookstate({
    id: '',
    user_id: '',
    title: '',
    overview: '',
    tipe_listing: '',
    tipe_bangunan: '',
    tipe_pasar: '',
    luas_tanah: '',
    luas_bangunan: '',
    jumlah_lantai: '',
    listrik: '',
    sertifikat: '',
    kota_id: '',
    alamat: '',
    kamar_tidur: '',
    kamar_mandi: '',
    garasi: '',
    car_port: '',
    fasilitas: '',
    harga: '',
    thumbnail: '',
    gallery: [],
    harga: 0,
    tipe_sewa : '',
  })

  const isFasilitasChecked = (value) => {
    let tempFasilitas = form.fasilitas.get();
    let tempFasilitasArr = tempFasilitas.split(',');

    let isFind = false;
    tempFasilitasArr.map((fasilitas, index) => {
      if( fasilitas == value) {

        isFind = index;
      }
    })

    return isFind;
  }

  const changeFasilitas = (value) => {
    let index = isFasilitasChecked(value);
    let tempFasilitas = form.fasilitas.get();
    let tempFasilitasArr = tempFasilitas.split(',');
    if(!index) {
      tempFasilitasArr.push(value);
    }else{
      tempFasilitasArr.splice(index, 1)
    }
    form.fasilitas.set(tempFasilitasArr.join(','));
  }

  const tipeListingOptions = [
    {
      label: 'Dijual',
      value: 'jual'
    },
    {
      label: 'Disewa',
      value: 'sewa'
    }
  ]

  const getTipeListingIndex = (value) => {
    index = 0;
    tipeListingOptions.map((option, i) => {
      if(option.value == value) {
        index = i;
        return i;
      }
    });

    return index;
  }

  const tipeSewaOptions = ['Tahun', 'Bulan']

  const tipePasarOptions = [
    {
      label: 'Baru',
      value: 'Baru'
    },
    {
      label: 'Seken',
      value: 'Seken'
    }
  ]

  const getTipePasarIndex = (value) => {
    index = 0;
    tipePasarOptions.map((option, i) => {
      if(option.value == value) {
        index = i;
        return i;
      }
    });

    return index;
  }

  const sertifikatOptions = ['PPJB', 'SHM', 'Girik', 'HPL'];

  const listrikOptions = [
    '450',
    '900',
    '1300',
    '1300+',
    'Listrik Pintar'
  ];

  const TipeBangunanOptions = ['Apartemen', 'Coworking', 'Gudang', 'Kantor', 'Ruko', 'Pabrik', 'Tanah', 'Rumah'];

  const saveProperty = async() => {
    setLoading(true)
    try {
      
      //form.user_id.set(108);
      form.user_id.set(user.get().id)
      form.kota_id.set(cityContext.get().id)
      if(form.tipe_listing.get() == 'jual'){
        form.tipe_sewa.set('')
      }

  

      let fd = new FormData();
      const keys = form.keys;
      for(let key in keys)
      {
        if(keys[key] == "gallery")
        {
          continue;
        }
        console.log(keys[key] , form[keys[key]].get())
        fd.append(keys[key], form[keys[key]].get())
      }

      for(let key in previewGallery)
      {
        fd.append("gallery[]", previewGallery[key]);
      }

      console.log(fd);

      const request = await PropertyAction.update(fd);
      console.log('request', request);
      Toast.show({
        type: 'success',
        text1: 'Information',
        text2: 'Berhasil Menyimpan Properti'
      });

      setPreviewGallery([]);

    }
    catch(error){
      console.log('error save property', error.response);
    }
    finally {
      setLoading(false)
      // setPreviewThumbnail('')
      //  form.kota_id.set('')
      //  cityContext.id.set('')
      //  cityContext.nama.set('')
      //  form.fasilitas.set('');
    }
  }

  

  const getProperty = async() => {
    setLoading(true)
    try {
        console.log(property_id);
        const response = await PropertyAction.edit({
          id: property_id,
          user_id: user.get().id
        });
        form.id.set(property_id);
        form.title.set(response.title)
        form.overview.set(response.overview)
        form.tipe_listing.set(response.tipe_listing)
        form.tipe_bangunan.set(response.tipe_bangunan)
        form.tipe_sewa.set(response.tipe_sewa)
        form.tipe_pasar.set(response.tipe_pasar)
        form.luas_tanah.set(response.luas_tanah)
        form.luas_bangunan.set(response.luas_bangunan);
        form.jumlah_lantai.set(response.jumlah_lantai)
        form.alamat.set(response.alamat)
        form.sertifikat.set(response.sertifikat)
        form.listrik.set(response.listrik)
        form.harga.set(response.harga)
        form.fasilitas.set(response.fasilitas)
        if(response.kota)
        {
          cityContext.set({
            id: response.kota.id,
            nama: (response.kota.nama).toUpperCase()
          })
        }

        form.gallery.set(response.gallery);
        console.log('thumbnail', BASE_URL + '/uploads/' + response.thumbnail)
        getGallery()
        setPreviewThumbnail(BASE_URL + '/uploads/' + response.thumbnail)
        setProperty(response);
    }
    catch(error) {
      console.log('getProperty', error);
        Toast.show({
            type: 'error',
            text1: 'Peringatan',
            text2: 'Terjadi kesalahan'
        });
    }finally{
        setLoading(false);
    }
  }

  const getGallery = async() => {
    try {
      setLoading(true)
      const response = await PropertyAction.getGallery((form.gallery.get()).split(','));
      response.map((gallery, index) => {
        setGallery(oldImages => [...oldImages, gallery.url])
      })
      console.log('getGallery', response);
    }catch(error) {

    }finally {
      setLoading(false)
    }
  }


  const uploadGallery = async() => {
  }

  const includeExtra = true;
  const launchImageLibrary = () => {
    let options =  {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    };
    
    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        let assets = response.assets;
        assets.map((asset, index) => {
          form.thumbnail.set({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName
          })
          setPreviewThumbnail(asset.uri)
        })
      }
    });

  }
  const launchImageLibraryForGallery = () => {
    let options =  {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    };
    
    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        let assets = response.assets;
        let images = [];
        assets.map((asset, index) => {
          let temp = {
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName
          }
          // images.push(temp)
          setPreviewGallery(oldImages => [...oldImages,temp]);
          setGallery(oldImages => [...oldImages, asset.uri])
        })
        //setPreviewGallery(oldImages => [...oldImages, images])
        
      }
    });
  }


  useEffect(() => {
    getProperty();
    //getGallery();
  }, [])

  const richText = React.useRef();
  function editorInitializedCallback() {
    richText.current?.registerToolbar(function (items) {
      setAttachEditor(true)
      // items contain all the actions that are currently active
      console.log(
        "Toolbar click, selected items (insert end callback):",
        items
      );
    });
  }

    // Callback after height change
    function handleHeightChange(height) {
      // console.log("editor height change:", height);
    }

  return (
    <View style={{flex:1, backgroundColor: Colors.white}}>
      <ScrollView style={styles.container}>
        <Gap height={20}/>
        <HeaderWithBackButton title="Edit Properti" onPress={() => navigation.goBack()}/>
        <Gap height={50}/>
        {
          isLoading ? <Loading/> : 
          <View>
            <View>
              <Text style={styles.formLabel}>Nama</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.title.set(text)} defaultValue={form.title.get()}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Deskripsi</Text>
              <View  style={{flexDirection: 'column-reverse'}}>
                <RichEditor 
                  ref={richText}
                  style={{borderWidth: 1, borderColor: '#eee'}}
                  onChange={text => form.overview.set(text)}
                  androidHardwareAccelerationDisabled={true}
                  editorInitializedCallback={editorInitializedCallback}
                  initialHeight={250}
                  initialContentHTML={form.overview.get()}
                />
                {attachEditor && <RichToolbar
                  editor={richText}
                  actions={[
                    ...defaultActions,
                    actions.setStrikethrough,
                    actions.heading1,
                  ]}
                  iconTint="#312921"
                  selectedIconTint="#873C1E"
                  iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
                />}
              </View>
            </View>
            <Gap height={20}/>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <View style={{ width: '100%' }}>
                <Text style={styles.formLabel}>Tipe Listing</Text>
                <SelectDropdown defaultValueByIndex={getTipeListingIndex(form.tipe_listing.get())} buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={tipeListingOptions} onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  form.tipe_listing.set(selectedItem.value);
                  return selectedItem.label
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.label
                }}/>
              </View>
              <Gap height={20}/>
              {
                form.tipe_listing.get() == 'sewa' ? 
                  <View  style={{ width: '100%' }}>
                    <Text style={styles.formLabel}>Tipe Sewa</Text>
                    <SelectDropdown defaultValue={form.tipe_sewa.get()}  buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={tipeSewaOptions} onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      form.tipe_sewa.set(selectedItem);
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item
                    }}/>
                    <Gap height={20}/>
                  </View>
                :<></>
              }
              <View  style={{ width: '100%' }}>
                <Text style={styles.formLabel}>Tipe Bangunan</Text>
                <SelectDropdown defaultValue={form.tipe_bangunan.get()} buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={TipeBangunanOptions} 
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      form.tipe_bangunan.set(selectedItem);
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}/>
              </View>
            </View>
            <Gap height={20}/>

            <View style={{ width: '100%'}}>
              <Text style={styles.formLabel}>Tipe Pasar</Text>
              <SelectDropdown defaultValueByIndex={getTipePasarIndex(form.tipe_pasar.get())} buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{ height: 40 }} rowTextStyle={{ height: 40 }} data={tipePasarOptions} onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    form.tipe_pasar.set(selectedItem.value);
                    return selectedItem.label;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.label;
                  }}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Luas Tanah (m²)</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.luas_tanah.set(text)} defaultValue={(form.luas_tanah.get()).toString()}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Luas Bangunan (m²)</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.luas_bangunan.set(text)}  defaultValue={(form.luas_bangunan.get()).toString()}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Jumlah Lantai</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.jumlah_lantai.set(text)}  defaultValue={(form.jumlah_lantai.get()).toString()}/>
            </View>
            <Gap height={20}/>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{ width: '48%' }}>
                <Text style={styles.formLabel}>Listrik (VA)</Text>
                {/* <TextInput style={styles.formControl} onChangeText={text => form.listrik.set(text)}/> */}
                <SelectDropdown defaultValue={form.listrik.get()} buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={listrikOptions} 
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      form.listrik.set(selectedItem);
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}/>
        
              </View>

              <View style={{ width: '48%' }}>
                <Text style={styles.formLabel}>Sertifikat Kepemilikan</Text>
                {/* <TextInput style={styles.formControl} onChangeText={text => form.sertifikat.set(text)}/> */}
                <SelectDropdown defaultValue={form.sertifikat.get()} buttonStyle={{borderRadius: 10, height: 40, width: '100%'}} rowStyle={{}} rowTextStyle={{}} data={sertifikatOptions} 
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      form.sertifikat.set(selectedItem);
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}/>
              </View>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Kota</Text>
              <TextInput style={styles.formControl} onFocus={() => navigation.navigate("Edit Property Select City", {
                property_id: property_id
              })}  value={cityContext.get().nama}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Alamat Domisili</Text>
              <TextInput style={styles.formTextarea} multiline={true} onChangeText={text => form.alamat.set(text)} defaultValue={form.alamat.get()}/>
            </View>
            <Gap height={20}/>
          
            <View>
              <Text style={styles.formLabel}>Fasilitas</Text>
              {
                JenisFasilitas.map((fasilitas, index) => (
                <View key={index} style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                  <CheckBox key={index} value={Boolean(isFasilitasChecked(fasilitas.label))} 
                  tintColors={{ true: Colors.primary, false: 'black' }}
                  onChange={() => {
                    changeFasilitas(fasilitas.label)
                  }}/>
                  <Text style={{color: Colors.dark}}>{fasilitas.label}</Text>
                </View>))
              }
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Harga</Text>
              <TextInput style={styles.formControl} onChangeText={text => form.harga.set(text)} defaultValue={(form.harga.get()).toString()}/>
            </View>
            <Gap height={20}/>

            <View>
              <Text style={styles.formLabel}>Thumbnail</Text>
              {
                !previewThumbnail ? 
                <Text style={styles.formInputFile} onPress={() => launchImageLibrary()}>
                  <Icon name={'plus'} size={16} color={Colors.dark} solid/>
                </Text> : 
                <TouchableOpacity onPress={() => launchImageLibrary()}>

                  <Image source={{ uri: previewThumbnail }} style={{width: 150, height: 150, borderRadius: 10}} resizeMode="cover"/>
                </TouchableOpacity>
              }
              
            </View>
            <Gap height={20}/>
            <View>
              <Text style={styles.formLabel}>Tambah Galeri</Text>
              <Text style={styles.formInputFile} onPress={() => launchImageLibraryForGallery()}>
                <Icon name={'plus'} size={16} color={Colors.dark} solid/>
              </Text>
            </View>
            
            <Gap height={20}/>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {
                galleries.map((gallery, gallery_index) => (
                  <View style={{width: '25%', height: 80, borderRadius: 10, marginRight: 10}} key={gallery_index}>
                    <Image source={{
                      uri: gallery 
                    }} 
                    style={{width: 80, height: 80, borderRadius: 10, backgroundColor: Colors.muted}}
                    resizeMode="cover"/>
                    <Text style={{color: Colors.primary, paddingVertical: 5, zIndex: 10}} onPress={() => {
                      setGallery(galleries.filter((gallery, index) => {
                        return index !== gallery_index;
                      }))
                    }}>Delete</Text>
                  </View>
                ))
              }
              
            </View>

            <Gap height={40}/>
          </View>
        }
        
      </ScrollView>
      <Pressable style={{paddingHorizontal: 16, backgroundColor: Colors.white, paddingVertical: 20 }}>
        <Text style={styles.btnPrimary} onPress={() => {
          saveProperty()
        }}>Simpan Properti</Text>
      </Pressable>
    </View>
  )
}

export default EditPropertyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: '500',
    fontSize: 18, 
    color: Colors.dark
  },
  separator: {
    borderBottomWidth: 1, borderBottomColor: Colors.muted
  },
  formLabel: {
    fontSize: 12,
    color: Colors.dark,
    fontWeight: 'bold',
    marginBottom: 5
  },
  formControl: {
    borderColor: Colors.muted,
    borderRadius: 10,
    backgroundColor: Colors.light,
    paddingHorizontal: 16,
    height: 40,
    color: Colors.dark
  },
  formInputFile: {
    width: 150,
    height: 150,
    backgroundColor: Colors.light, 
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 150
  },
  btnPrimary: {
    height: 40, 
    paddingHorizontal: 20, 
    color: Colors.white, 
    backgroundColor: Colors.primary, 
    borderRadius: 10, 
    lineHeight: 40, 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  formTextarea: {
    minHeight: 150,
    borderColor: Colors.muted,
    borderRadius: 10,
    backgroundColor: Colors.light,
    paddingHorizontal: 16,
    textAlignVertical: 'top',
    color: Colors.dark
  }
})