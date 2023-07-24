import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { HeaderWithBackButton, Gap } from "../components";
  import LinearGradient from "react-native-linear-gradient";
  import { Colors } from "../constant";
  import { CountryContext } from "../context";
  import { Countries } from "../constant";
  
  const SelectCountryScreen = ({ navigation }) => {
    const [keyword, setKeyword] = useState("");
    const [countries, setCountries] = useState(Countries)
    const countryContext = CountryContext()
  
    return (
      <LinearGradient colors={["#272727", "#13140D"]} style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/images/long-background.png")}
          resizeMode="cover"
          style={{ width: "100%", flex: 1, height: "100%" }}
        >
          
            <Gap height={20} />
            <View style={{ paddingHorizontal: 20 }}>
              <HeaderWithBackButton
                onPress={() => navigation.goBack()}
                title="SELECT COUNTRY"
              />
              <Gap height={30} />
              <TextInput
                style={styles.formControl}
                onChangeText={(newText) => setKeyword(newText)}
                value={keyword}
                placeholder="Search"
                placeholderTextColor="#A3A3A3"
                autoCapitalize="none"
              />
  
              <Gap height={20} />
              <ScrollView
                style={{ height: "100%", }}
                scrollIndicatorInsets={{ right: 1 }}
              >
                  {countries.filter(country => ((country.name).toLocaleLowerCase()).includes(keyword.toLowerCase())).map((country) => {
                  return (
                  <TouchableOpacity
                      style={{ width: "100%", marginBottom: 10 }}
                      key={country.name}
                      onPress={() => {
                        countryContext.set(country.code)
                        navigation.goBack()
                      }}>
                      <Text style={{color: "#222", backgroundColor: '#eee', padding: 10, borderRadius: 8, fontFamily: 'Montserrat-SemiBold'}}>{country.name}</Text>
                  </TouchableOpacity>
                  )
                })}
            </ScrollView>
            </View>
    
            
        </ImageBackground>
      </LinearGradient>
    );
  };
  
  export default SelectCountryScreen;
  
  const styles = StyleSheet.create({
    formControl: {
      borderWidth: 1,
      borderColor: "#D9D9D9",
      borderRadius: 10,
      height: 50,
      fontSize: 16,
      paddingHorizontal: 16,
      color: Colors.dark,
      backgroundColor: "#eee",
      fontFamily: "Montserrat-SemiBold",
    },
  });
  