import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import LottieView from 'lottie-react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    // TODO: Replace with real API call
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        navigation.replace('Dashboard');
      } else {
        setError('Please enter email and password');
      }
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <LottieView
          source={require('../assets/zi-loading.json')}
          autoPlay
          loop
          style={{ width: 120, height: 120 }}
        />
        <Text style={styles.title}>ZI Affiliates</Text>
      </View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin} loading={loading} style={styles.button}>
        Login
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF9500',
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#FF9500',
  },
  error: {
    color: '#FF0000',
    marginBottom: 8,
    textAlign: 'center',
  },
});
