import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useUser } from "../../context/UserContext";
import styles from './ScheduleStyles'; 

export default function ScheduleScreen() {
  const { phoneNumber } = useUser();
  const [scheduleData, setScheduleData] = useState([]);
  
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('https://app.solidz.io/guard_patrol/schedule_data/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobile: phoneNumber }),
        });
        
        const data = await response.json();
        console.log("API Response Data: ", JSON.stringify(data, null, 2));  
        
      
        if (data && data.data && data.data.schedule) {
          setScheduleData(data.data.schedule);
        } else {
          console.log("No schedule data found in the response.");
        }
      } catch (error) {
        console.error("Error fetching schedule data: ", error);
      }
    };
    
    fetchSchedule();
  }, [phoneNumber]);

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.task}>{item.task}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.scheduleTime}>Scheduled Time: {item.schedule_time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.internalcontainer}>
   

      {scheduleData.length === 0 ? (
        <Text style={styles.noSchedulesText}>No Schedules</Text> 
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