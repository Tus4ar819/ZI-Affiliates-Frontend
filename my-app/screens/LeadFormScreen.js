import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, Menu, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const statusOptions = ['Hot', 'Warm', 'Cold'];

export default function LeadFormScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Hot');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const validatePhone = phone => /^\d{10}$/.test(phone);
  const validateEmail = email => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = () => {
    // TODO: Submit lead
    alert('Lead Created!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Lead</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
        error={!!phone && !validatePhone(phone)}
      />
      <HelperText type="error" visible={!!phone && !validatePhone(phone)}>
        Phone must be 10 digits
      </HelperText>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!email && !validateEmail(email)}
      />
      <HelperText type="error" visible={!!email && !validateEmail(email)}>
        Enter a valid email
      </HelperText>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={<Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.input}>{status}</Button>}
      >
        {statusOptions.map(option => (
          <Menu.Item key={option} onPress={() => { setStatus(option); setMenuVisible(false); }} title={option} />
        ))}
      </Menu>
      <TextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
        mode="outlined"
        multiline
      />
      <Button mode="outlined" onPress={() => setShowDate(true)} style={styles.input}>
        {date.toDateString()}
      </Button>
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={!(name && validatePhone(phone) && validateEmail(email))}
      >
        Create Lead
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: '#FF9500',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#FF9500',
    marginTop: 12,
  },
});
