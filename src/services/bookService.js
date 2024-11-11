import { db } from '../firebaseConfig';

export const getBooks = async () => {
  const booksSnapshot = await db.collection('books').get();
  return booksSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getBorrowedBooks = async () => {
  const borrowedSnapshot = await db.collection('borrowedBooks').get();
  return borrowedSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const borrowBook = async (book) => {
  await db.collection('borrowedBooks').add(book);
};

export const returnBook = async (id) => {
  await db.collection('borrowedBooks').doc(id).delete();
};