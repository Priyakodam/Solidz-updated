import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    backgroundColor: "#111",
    padding: 20,  
  },
  internalcontainer:{
    marginTop: 70,
      },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },

  checklisttask: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  checklistDate: {
    color: '#fff',
    fontSize: 16,
  },

  checkstatus: {
    color: '#bbb',
    fontSize: 14,
  },
  taskItem: {
    backgroundColor: '#333',
    padding: 14,
    marginVertical: 8,
    borderRadius: 8,
    width: 350,
  },
  noChecklistData: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    
  }
});

export default styles;
