import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width - 32;

const data = {
  labels: ['Hot', 'Warm', 'Cold'],
  datasets: [
    {
      data: [12, 8, 5],
    },
  ],
};

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Dashboard</Title>
      <View style={styles.tilesRow}>
        <Card style={[styles.tile, { backgroundColor: '#FF9500' }]}> 
          <Card.Content>
            <Text style={styles.tileText}>Total Leads</Text>
            <Text style={styles.tileNumber}>25</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.tile, { backgroundColor: '#FF0000' }]}> 
          <Card.Content>
            <Text style={styles.tileText}>Hot</Text>
            <Text style={styles.tileNumber}>12</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.tilesRow}>
        <Card style={[styles.tile, { backgroundColor: '#FFA500' }]}> 
          <Card.Content>
            <Text style={styles.tileText}>Warm</Text>
            <Text style={styles.tileNumber}>8</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.tile, { backgroundColor: '#808080' }]}> 
          <Card.Content>
            <Text style={styles.tileText}>Cold</Text>
            <Text style={styles.tileNumber}>5</Text>
          </Card.Content>
        </Card>
      </View>
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Lead Reach</Text>
          <BarChart
            data={data}
            width={screenWidth}
            height={180}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#FF9500',
              backgroundGradientTo: '#FF0000',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              labelColor: () => '#000',
            }}
            style={{ borderRadius: 12 }}
          />
        </Card.Content>
      </Card>
      <Card style={styles.tile}>
        <Card.Content>
          <Text style={styles.tileText}>Total Projects</Text>
          <Text style={styles.tileNumber}>3</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: '#FF9500',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  tilesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  tile: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    elevation: 2,
  },
  tileText: {
    color: '#fff',
    fontSize: 16,
  },
  tileNumber: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  chartCard: {
    width: '100%',
    marginVertical: 16,
    borderRadius: 12,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#FF9500',
    fontWeight: 'bold',
  },
});
