const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require("cors");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(cors({ origin: true }));
// DATABASE
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

// GET
app.get("/", (req, res) => {
  return res.status(200).send("Hawewo");
});

// POST
app.post("/api/create", async (req, res) => {
  try {
    const data = req.body;
    // const { user_name, number1, number2 } = data[0].contact.variables;
    console.log(data[0].contact.variables);

    await db.collection("sendpulse-interaction").doc(data[0].contact.variables.whatsapp_no).create({
      username: data[0].contact.variables.user_name,
      number1: data[0].contact.variables.number1,
      number2: data[0].contact.variables.number2,
    });

    console.log("Data successfully added!");
    res.status(200).send("Data successfully added!");
  } catch (error) {
    console.error("Failed add data: ", error);
    res.status(500).send("Error!");
  }
});

app.post("/api/update", async (req, res) => {
  const data = req.body;

  try {
    const docRef = db.collection("sendpulse-interaction").doc(data[0].contact.variables.whatsapp_no);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const docData = docSnapshot.data();
      const number1 = docData.number1;
      const number2 = docData.number2;
      const total = number1 + number2;

      await docRef.update({
        total: total,
      });

      const docSnapshot = await docRef.get();
      console.log("Document updated successfully: ", docSnapshot.data());
      res.status(200).send("Document updated successfully!");
    } else {
      console.log("Document not found!");
      res.status(404).send("Document not found!");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log(`Server is starting...`);
});

exports.app = functions.https.onRequest(app);
