import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './home/Home';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Detail from './home/Detail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen
            name={'Home'}
            component={Home}
            options={{title: 'Image Search'}}
          />
          <Stack.Screen name={'Detail'} component={Detail} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;