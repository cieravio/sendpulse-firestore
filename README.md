# FIREBASE AND EXPRESS INTEGRATION

### OVERVIEW

This project is an Express.js application integrated with Firebase Firestore, providing REST API endpoints to create and update records in a Firestore database. The application is deployed as a Firebase Cloud Function.

### SETUP AND CONFIGURATION

#### 1. Firebase Admin SDK
The Firebase Admin SDK is initialized using a service account JSON file. Ensure the file serviceAccountKey.json is in the root of the project.

#### 2. Initialize Firebase Admin
```javascript
  const serviceAccount = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
```

#### 3. Firestore Settings
Firestore is  initialized with the ignoredUndefinedProperties option enabled to prevent storing undefined values.
```javascript
const db = admin.firestore();
db.settings({ ignoredUndefinedProperties: true });
```

### DEPENDENCIES
The project relies on the following dependencies:
- express: Framework for building the REST API
- cors: Middleware to enable CORS
- firebase-admin: Firebase Admin SDK to interact with Firestore
- firebase-functions: To deploy the Express app as a Firebase Cloud Function

### API ENDPOINTS

#### 1. Root Endpoint
- URL: `/`
- Method: GET
- Response:
    - 200: Return a simple success message: `"Hawewo"`

#### 2. Create Document
- URL: `/api/create`
- Method: POST
- Request Body:
```json
[
  {
    "contact": {
      "variables": {
        "user_name": "string",
        "number1": "number",
        "number2": "number",
        "whatsapp_no": "string"
      }
    }
  }
]
```
- Response:
    - 200: `"Data successfully added!" `
    - 500: `"Error!"`

##### 3. Update Document
- URL: `/api/update`
- Method: POST
- Request Body:
```json
[
  {
    "contact": {
      "variables": {
        "whatsapp_no": "string"
      }
    }
  }
]
```
- Response:
    - 200: `"Document updated successfully!"`
    - 404: `"Document not found!"`
    - 500: `"Error"`
 
### DATABASE STRUCTURE

#### Collection: `sendpulse-interaction`
Each document is identified by the `whatsapp_no` and has the following fields:

- username (string)
- number1 (number)
- number2 (number)
- total (number, optional)

### ERROR HANDLING

#### 1. Create Document

Logs errors when adding data fails
```javascript
console.error("Failed add data: ", error);
res.status(500).send("Error!");
```

#### 2. Update Document

Logs errors when update operations fail
```javascript
console.error("Error updating document: ", error);
res.status(500).send("Error");
```

### DEPLOYMENT

The application is deployed as a Firebase Cloud Function using:
```javascript
exports.app = functions.https.onRequest(app);
```

To deploy, use:
```
firebase deploy --only functions
```
