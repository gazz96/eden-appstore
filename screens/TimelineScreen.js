import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, HeaderWithBackButton, Loading} from '../components';
import {BASE_URL, Colors, Rp} from '../constant';
import {UserContext} from '../context';
import LinearGradient from 'react-native-linear-gradient';
import { TimelineAction } from '../actions';

const TimelineScreen = ({route, navigation}) => {
  const {order} = route.params;
  const [timelines, setTimelines] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const auth = UserContext();
  const getMyTimelines = async () => {
    try {
      const response = await TimelineAction.list({
        order_id: order.id,
      });
      setTimelines(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPath = (image = '') => {
    if (image) {
      return BASE_URL + '/uploads/' + image;
    }
    return '';
  };

  const onRefresh = React.useCallback(() => {
    getMyTimelines();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getMyTimelines();
    });
  }, []);


  return (
    <LinearGradient colors={['#272727', '#13140D']} style={styles.container}>
      <ImageBackground
        source={require('../assets/images/long-background.png')}
        resizeMode="cover"
        style={{width: '100%', flex: 1, height: '100%'}}>
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }>
          <Gap height={20} />
          <HeaderWithBackButton
            onPress={() => navigation.goBack()}
            title={''}
          />
          <Gap height={25} />
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: 20,
              color: '#fffff0',
            }}>
            Timeline
          </Text>

          <Gap height={20} />
          <View>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              timelines.map((timeline, index) => (
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    padding: 20,
                    marginBottom: 30
                  }} key={timeline.id}>
                
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#222',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 14
                      }}>
                      {timeline.timeline_date}
                    </Text>
                  </View>
                  <Gap height={10} />
                  <Text
                    style={{
                      color: '#222',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 16
                    }}>
                    {timeline.description}

                  </Text>
           
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default TimelineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
