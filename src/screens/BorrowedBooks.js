import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebaseConfig';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('borrowedBooks').onSnapshot((snapshot) => {
      setBorrowedBooks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  }, []);

  const returnBook = (id) => {
    db.collection('borrowedBooks').doc(id).delete();
    Alert.alert("Book Returned", "The book has been successfully returned.");
  };

  const renderBookItem = ({ item }) => (
    <View style={{ flexDirection: 'row', marginBottom: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
      <Image source={{ uri: item.coverUrl }} style={{ width: 80, height: 120, borderRadius: 8 }} />
      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: '#555' }}>{item.author}</Text>
        <Text style={{ fontSize: 12, marginVertical: 5, color: '#777' }} numberOfLines={3}>{item.summary}</Text>
        <TouchableOpacity 
          style={{ backgroundColor: 'tomato', padding: 10, borderRadius: 5 }}
          onPress={() => returnBook(item.id)}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Return Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={borrowedBooks}
      renderItem={renderBookItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 15 }}
    />
  );
};

export default BorrowedBooks;