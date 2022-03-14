import * as Contacts from "expo-contacts";
import React, { useState, useEffect } from "react";
import {FlatList, StyleSheet, Text, View, Pressable  } from "react-native";

export default function App() {
  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        console.log(data);
        setContact(data);
      }
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.phoneNumbers[0].number}</Text>
          </View>
        )}
        data={contact}
      />
      <Pressable style={styles.button} title="Get contacts" onPress={getContacts}>
      <Text style={styles.text}>Get Contacts</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
    elevation: 6,
    backgroundColor: 'darkblue',
    marginBottom: 30,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.30,
    color: 'white',
  },
});