import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LandingPagePhoto from '../assets/LandingPagePhoto.jpg';
import { auth } from '../firebase';

const LandingPage = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const unsubscribe = useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });

    return unsubscribe;
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <ImageBackground source={LandingPagePhoto} style={styles.image}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => navigation.navigate('SignupModal')}
          >
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate('LoginModal')}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    backgroundColor: '#17141d',
    borderRadius: 20,
    paddingTop: 15,
    marginLeft: 20,
    width: 100,
    height: 50,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default LandingPage;
