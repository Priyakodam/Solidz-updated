import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './ChecklistStyles';
import { useUser } from "../../context/UserContext";

const fetchChecklistData = async (mobile) => {
  try {
    const response = await fetch('https://app.solidz.io/guard_patrol/check_list_data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile }),
    });
    const result = await response.json();
    console.log('Checklist API Response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default function ChecklistScreen() {
  const { phoneNumber } = useUser();
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchChecklistData(phoneNumber);
      const schedule = data?.data?.schedule || [];
      setScheduleData(schedule);
      setLoading(false);
    };
    getData();
  }, [phoneNumber]);

  const renderScheduleItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.checklisttask}>Task: {item.task}</Text>
      <Text style={styles.checklistDate}>Date: {item.dt}</Text>
      <Text style={styles.checkstatus}>Checked: {item.checked ? 'Yes' : 'No'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.internalcontainer} >
      {loading ? (
        <Text style={styles.text}>Loading checklist data...</Text>
      ) : scheduleData.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.noChecklistData}>No Checklist data</Text>
        </View>
      ) : (
        <FlatList
          data={scheduleData}
          renderItem={renderScheduleItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      </View>
    </View>
  );
}
