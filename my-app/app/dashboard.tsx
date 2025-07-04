
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const tileData = [
  { label: 'Total Projects', value: 12, icon: <MaterialCommunityIcons name="folder-multiple-outline" size={32} color="#fff" /> },
  { label: 'Total Leads', value: 24, icon: <Ionicons name="people-outline" size={32} color="#fff" /> },
  { label: 'Hot', value: 5, icon: <Ionicons name="flame-outline" size={32} color="#ff4d4f" /> },
  { label: 'Warm', value: 10, icon: <Ionicons name="sunny-outline" size={32} color="#ffb84d" /> },
  { label: 'Cold', value: 9, icon: <Ionicons name="snow-outline" size={32} color="#4da6ff" /> },
];

export default function DashboardScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.tilesRow}>
        {tileData.map((tile, idx) => (
          <Animated.View key={tile.label} style={[styles.tile, { opacity: fadeAnim, transform: [{ scale: fadeAnim }] }]}> 
            {tile.icon}
            <Text style={styles.tileValue}>{tile.value}</Text>
            <Text style={styles.tileLabel}>{tile.label}</Text>
          </Animated.View>
        ))}
      </View>
      <TouchableOpacity style={styles.formButton} onPress={() => router.push('/form')}>
        <Ionicons name="create-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.formButtonText}>Form</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.leadsButton} onPress={() => router.push('/leads')}>
        <Ionicons name="list-outline" size={22} color="#4F8EF7" style={{ marginRight: 6 }} />
        <Text style={styles.leadsButtonText}>View Leads</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181A20',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  tilesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 16,
  },
  tile: {
    width: 130,
    height: 110,
    backgroundColor: '#23262F',
    borderRadius: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    padding: 10,
  },
  tileValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  tileLabel: {
    color: '#aaa',
    fontSize: 15,
    marginTop: 2,
    textAlign: 'center',
  },
  formButton: {
    flexDirection: 'row',
    width: 200,
    height: 50,
    backgroundColor: '#4F8EF7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  formButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  leadsButton: {
    flexDirection: 'row',
    width: 180,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#4F8EF7',
  },
  leadsButtonText: {
    color: '#4F8EF7',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
