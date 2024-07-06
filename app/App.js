import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, Alert, StyleSheet } from 'react-native';

const App = () => {

  const testSSlPinning = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => {
      if (error.toString().includes('Network request failed')) {
        Alert.alert('Secure connection error or network issue! Please try again later.');
      }
      else {
        Alert.alert('Something went wrong! Please try again later.');
      }
    })
  };

  const [data, setData] = useState(null);

  const renderData = () => {
    return (
      <View>
        <Text style={styles.text}> id: {data.id} </Text>
        <Text style={styles.text}> userId: {data.userId} </Text>
        <Text style={styles.text}> title: {data.title} </Text>
        <Text style={styles.text}> body: {data.body} </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {data ? renderData() : <Text> Data loading... </Text>}
      <Button title="Test SSL Pinning" onPress={() => testSSlPinning()}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20
  }
});

export default App;
