import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import LeadFormScreen from './screens/LeadFormScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF9500',
    accent: '#FF0000',
    background: '#fff',
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <LinearGradient
        colors={['#FF9500', '#FF0000']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="LeadForm" component={LeadFormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </PaperProvider>
  );
}
