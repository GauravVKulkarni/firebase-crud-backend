
const express = require('express');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } = require('firebase/firestore');

require('dotenv').config();

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase and Firestore
const app = express();
initializeApp(firebaseConfig);
const db = getFirestore();

// Middleware to parse JSON requests
app.use(express.json());

// Create a new document with `name` and `age`
app.post('/create', async (req, res) => {
    try {
      const { name, age } = req.body;
      if (!name || age === undefined) {
        return res.status(400).send("Name and age are required.");
      }
      const docRef = await addDoc(collection(db, 'db'), { name, age });
      res.status(201).send(`Document created with ID: ${docRef.id}`);
    } catch (error) {
      res.status(500).send(`Error adding document: ${error.message}`);
    }
  });

  // Read all documents and return only `name` and `age`
  app.get('/read', async (req, res) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'db'));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, name: doc.data().name, age: doc.data().age });
      });
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).send(`Error reading documents: ${error.message}`);
    }
  });

  // Update the `age` attribute of a document
  app.put('/update/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { age } = req.body;
      if (age === undefined) {
        return res.status(400).send("Age is required.");
      }
      const docRef = doc(db, 'db', id);  // Make sure the collection name is 'db'
      await updateDoc(docRef, { age });
      res.status(200).send(`Document with ID: ${id} updated successfully with age: ${age}`);
    } catch (error) {
      res.status(500).send(`Error updating document: ${error.message}`);
    }
  });

  // Delete a document based on ID
  app.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'db', id));  // Make sure the collection name is 'db'
      res.status(200).send(`Document with ID: ${id} deleted successfully`);
    } catch (error) {
      res.status(500).send(`Error deleting document: ${error.message}`);
    }
  });

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
