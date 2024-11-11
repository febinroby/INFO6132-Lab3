import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';

const BookDetail = ({ route, navigation }) => {
  const { book } = route.params;
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('borrowedBooks').onSnapshot((snapshot) => {
      setBorrowedBooks(snapshot.docs.map((doc) => doc.data()));
    });
    return unsubscribe;
  }, []);

  const borrowBook = async () => {
    const alreadyBorrowed = borrowedBooks.some((borrowedBook) => borrowedBook.id === book.id);

    if (alreadyBorrowed) {
      Alert.alert("Already Borrowed", "You have already borrowed this book.");
      navigation.goBack();
    } else if (borrowedBooks.length >= 3) {
      Alert.alert("Borrow Limit", "You cannot borrow more than three books at a time.");
      navigation.goBack();
    } else {
      try {
        await db.collection('borrowedBooks').add({
          id: book.id,
          name: book.name,
          author: book.author,
          coverUrl: book.coverUrl,
          summary: book.summary,
          borrowedAt: new Date(),
        });
        Alert.alert("Success", "You have successfully borrowed this book.");
        navigation.goBack();
      } catch (error) {
        console.error("Error borrowing book: ", error);
        Alert.alert("Error", "There was a problem borrowing the book.");
        navigation.goBack();
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bookContainer}>
        <Image source={{ uri: book.coverUrl }} style={styles.coverImage} />
        <View style={styles.textContainer}>
          <Text style={styles.bookTitle}>{book.name}</Text>
          <Text style={styles.bookAuthor}>Author: {book.author}</Text>
          <Text style={styles.bookSummary}>{book.summary}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.borrowButton} onPress={borrowBook}>
        <Text style={styles.borrowButtonText}>Borrow Book</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    padding: 16,
  },
  coverImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  bookSummary: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  borrowButton: {
    backgroundColor: 'tomato',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  borrowButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookDetail;