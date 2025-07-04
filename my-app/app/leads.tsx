import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Animated, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LeadDateFilter from './LeadDateFilter';


const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Hot', value: 'hot' },
  { label: 'Warm', value: 'warm' },
  { label: 'Cold', value: 'cold' },
];

export default function LeadsScreen() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [filter, setFilter] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchLeads();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [filter, date]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const jwt = await AsyncStorage.getItem('jwt');
      const empId = await AsyncStorage.getItem('empId');
      if (!jwt || !empId) {
        Alert.alert('Error', 'Session expired. Please login again.');
        router.replace('/');
        return;
      }
      let url = '';
      if (filter) {
        // Get leads by employeeId and status
        url = `https://zi-affiliates-backend.onrender.com/leads/by-employee/${empId}?status=${filter}`;
      } else {
        // Get all leads by employeeId
        url = `https://zi-affiliates-backend.onrender.com/leads/by-employee/${empId}`;
      }
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        // Support both {leads: [...]} and [...] response
        let leadsArr = [];
        if (Array.isArray(data)) {
          leadsArr = data;
        } else if (Array.isArray(data.leads)) {
          leadsArr = data.leads;
        } else {
          leadsArr = [];
        }
        // If filtering by status, only show leads with that status (hot, warm, cold)
        if (filter && ['hot', 'warm', 'cold'].includes(filter)) {
          leadsArr = leadsArr.filter((l: any) => (l.status || '').toLowerCase() === filter);
        }
        // Sort: pinned first, then rest
        const sorted = leadsArr.sort((a: any, b: any) => (b.pin === true ? -1 : 0) - (a.pin === true ? -1 : 0));
        setLeads(sorted);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch leads.');
      }
    } catch (e) {
      Alert.alert('Error', 'Network error.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete Lead', 'Are you sure you want to delete this lead?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          const jwt = await AsyncStorage.getItem('jwt');
          const empId = await AsyncStorage.getItem('empId');
          if (!jwt || !empId) {
            Alert.alert('Error', 'Session expired. Please login again.');
            router.replace('/');
            return;
          }
          const res = await fetch(`https://zi-affiliates-backend.onrender.com/leads/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${jwt}`,
              'employee-id': empId,
            },
          });
          if (res.ok) {
            setLeads(leads.filter(l => l._id !== id && l.id !== id));
          } else {
            const data = await res.json();
            Alert.alert('Error', data.message || 'Failed to delete lead.');
          }
        } catch (e) {
          Alert.alert('Error', 'Network error.');
        }
      }},
    ]);
  };

  const handleEdit = (id: string) => {
    Alert.alert('Edit', 'Edit functionality coming soon!');
  };

  const renderItem = ({ item }: any) => (
    <Animated.View style={[styles.leadItem, { opacity: fadeAnim }]}> 
      <View style={styles.leadInfo}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.pin && <Ionicons name="star" size={18} color="#FFD700" style={{ marginRight: 6 }} />}
          <Text style={styles.leadName}>{item.name}</Text>
        </View>
        <Text style={styles.leadDetail}>{item.email} | {item.phone}</Text>
        <Text style={[styles.status, styles[item.status as 'hot' | 'warm' | 'cold']]}>{item.status?.toUpperCase()}</Text>
        {item.notes ? <Text style={styles.leadNote}>{item.notes}</Text> : null}
        {item.date && <Text style={{ color: '#aaa', fontSize: 12, marginTop: 2 }}>Date: {item.date}</Text>}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <Ionicons name="create-outline" size={24} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 12 }}>
          <Ionicons name="trash-outline" size={24} color="#ff4d4f" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Leads</Text>
      <LeadDateFilter date={date} setDate={setDate} show={showDate} setShow={setShowDate} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
        {statusOptions.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={{
              backgroundColor: filter === opt.value ? '#4F8EF7' : '#23262F',
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 8,
              marginHorizontal: 4,
            }}
            onPress={() => setFilter(opt.value)}
          >
            <Text style={{ color: filter === opt.value ? '#fff' : '#aaa', fontWeight: 'bold' }}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator color="#4F8EF7" size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={leads}
          keyExtractor={item => item._id || item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={<Text style={{ color: '#aaa', textAlign: 'center', marginTop: 40 }}>No leads found.</Text>}
        />
      )}
    </View>
  );
// ...existing code...
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 20,
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
  leadItem: {
    flexDirection: 'row',
    backgroundColor: '#23262F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#4F8EF7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  leadInfo: {
    flex: 1,
  },
  leadName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  leadDetail: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 2,
  },
  leadNote: {
    color: '#4F8EF7',
    fontSize: 13,
    marginTop: 4,
  },
  status: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 13,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  hot: {
    backgroundColor: '#ff4d4f33',
    color: '#ff4d4f',
  },
  warm: {
    backgroundColor: '#ffb84d33',
    color: '#ffb84d',
  },
  cold: {
    backgroundColor: '#4da6ff33',
    color: '#4da6ff',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});