import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/Landing';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CreateBet from './screens/CreateBet';
import EditBet from './screens/EditBet';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="CreateBet"
        component={CreateBet}
        options={{
          title: 'Create A Bet',
          headerStyle: {
            backgroundColor: '#17141d',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }}
      />
      <MainStack.Screen
        name="EditBet"
        component={EditBet}
        options={{
          title: 'Edit Your Bet',
          headerStyle: {
            backgroundColor: '#17141d',
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="LoginModal"
          component={Login}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="SignupModal"
          component={Signup}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#262626',
  },
  text: {
    color: 'white',
    letterSpacing: 1,
  },
});

export default App;
