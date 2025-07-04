import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Switch, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const statusOptions = [
  { label: 'Hot', value: 'hot', icon: <Ionicons name="flame-outline" size={20} color="#ff4d4f" /> },
  { label: 'Warm', value: 'warm', icon: <Ionicons name="sunny-outline" size={20} color="#ffb84d" /> },
  { label: 'Cold', value: 'cold', icon: <Ionicons name="snow-outline" size={20} color="#4da6ff" /> },
];

export default function NewFormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('hot');
  const [note, setNote] = useState('');
  const [pinned, setPinned] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const validate = () => {
    if (!name.trim()) return 'Name is required.';
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Valid email is required.';
    if (!phone.trim() || !/^\d{10,15}$/.test(phone)) return 'Valid phone is required.';
    if (!status) return 'Status is required.';
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      Alert.alert('Validation', error);
      return;
    }
    setLoading(true);
    try {
      const jwt = await AsyncStorage.getItem('jwt');
      const empId = await AsyncStorage.getItem('empId');
      if (!jwt || !empId) {
        setLoading(false);
        Alert.alert('Error', 'Session expired. Please login again.');
        router.replace('/');
        return;
      }
      // Use JSON body as required by backend
      const body = {
        name,
        email,
        phone,
        status,
        notes: note,
        date,
        pin: pinned,
      };
      const res = await fetch('https://zi-affiliates-backend.onrender.com/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
          'employee-id': empId,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        Alert.alert('Success', 'Lead created!');
        setTimeout(() => {
          router.replace('/leads');
        }, 800);
      } else {
        Alert.alert('Error', data.message || 'Failed to create lead.');
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'Network error.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      {/* Removed duplicate or unwanted header/title */}
      <Animated.View style={[styles.formCard, { opacity: fadeAnim }]}> 
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={20} color="#4F8EF7" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="email-outline" size={20} color="#4F8EF7" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputBox}>
          <Ionicons name="call-outline" size={20} color="#4F8EF7" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputBox}>
          <Ionicons name="calendar-outline" size={20} color="#4F8EF7" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor="#aaa"
            value={date}
            onChangeText={setDate}
          />
        </View>
        <View style={[styles.inputBox, { backgroundColor: 'transparent', borderWidth: 0, marginBottom: 18, paddingHorizontal: 0 }]}> 
          <Ionicons name="thermometer-outline" size={20} color="#4F8EF7" style={styles.inputIcon} />
          <View style={styles.statusMenuContainer}>
            {statusOptions.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.statusMenuOption, status === opt.value && styles.statusMenuOptionActive]}
                onPress={() => setStatus(opt.value)}
              >
                {opt.icon}
                <Text style={[styles.statusMenuText, status === opt.value && styles.statusMenuTextActive]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.inputBox}>
          <Ionicons name="document-text-outline" size={20} color="#4F8EF7" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Note (optional)"
            placeholderTextColor="#aaa"
            value={note}
            onChangeText={setNote}
            multiline
          />
        </View>
        <View style={styles.pinBox}> 
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name={pinned ? 'star' : 'star-outline'} size={20} color={pinned ? '#FFD700' : '#aaa'} style={styles.inputIcon} />
            <Text style={{ color: '#fff', fontSize: 16 }}>Pin Lead</Text>
          </View>
          <Switch
            value={pinned}
            onValueChange={setPinned}
            thumbColor={pinned ? '#FFD700' : '#ccc'}
            trackColor={{ false: '#555', true: '#FFD70055' }}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create</Text>}
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(36, 40, 54, 0.8)',
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
  },
  formCard: {
    backgroundColor: '#23262F',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23262F',
    borderRadius: 10,
    marginBottom: 18,
    paddingHorizontal: 10,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  statusMenuContainer: {
    flexDirection: 'row',
    backgroundColor: '#181A20',
    borderRadius: 8,
    padding: 4,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 8,
  },
  statusMenuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
    marginHorizontal: 2,
  },
  statusMenuOptionActive: {
    backgroundColor: '#23262F',
    borderColor: '#4F8EF7',
    borderWidth: 1.5,
  },
  statusMenuText: {
    color: '#aaa',
    fontSize: 15,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  statusMenuTextActive: {
    color: '#4F8EF7',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4F8EF7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pinBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#23262F',
    borderRadius: 10,
    marginBottom: 18,
    paddingHorizontal: 10,
    width: '100%',
    minHeight: 48,
  },
});
