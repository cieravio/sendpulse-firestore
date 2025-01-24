# FIREBASE AND EXPRESS INTEGRATION

### OVERVIEW

This project is an Express.js application integrated with Firebase Firestore, providing REST API endpoints to create and update records in a Firestore database. The application is deployed as a Firebase Cloud Function.

### SETUP AND CONFIGURATION

1. Firebase Admin SDK
The Firebase Admin SDK is initialized using a service account JSON file. Ensure the file serviceAccountKey.json is in the root of the project.

2. Initialize Firebase Admin
```
  const serviceAccount = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
```
