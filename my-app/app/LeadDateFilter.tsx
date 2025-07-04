import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function LeadDateFilter({ date, setDate, show, setShow }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
        <Text style={styles.dateText}>{date ? date.toLocaleDateString() : 'Filter by Date'}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#23262F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
});
