import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default function Topics() {
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const [fp, setFp] = useState('');
  const url = 'http://localhost:8080/theme';

  useEffect(() => {
    DeviceInfo.getFingerprint().then((fingerprint) => {
      setFp(fingerprint);
    });
  });

  const addTopic = async (topic: string) => {
    const post = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'user-id': 'test',
      },
      body: JSON.stringify({ title: topic }),
    });
    const t = await post.json();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add a Topic</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter topic"
        value={topic}
        onChangeText={(e) => setTopic(e)}
      />
      <TouchableOpacity style={styles.button} onPress={() => addTopic(topic)}>
        <Text style={styles.buttonText}>add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
  },
  topicText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  counter: {
    fontSize: 18,
    color: '#333',
  },
});
