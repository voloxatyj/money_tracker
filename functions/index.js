const functions = require("firebase-functions");
const app = require("express")();
const DBAuth = require("./utils/DBAuth");
const { db, admin, config } = require("./utils/config");
const {
  getItems,
  addItem,
  getItem,
  updateItem,
  deleteItem,
} = require("./handlers/items");
const { signUp, login, uploadImage } = require("./handlers/user");
const cors = require("cors");
app.use(cors());

// item Routes
app.get("/items", DBAuth, getItems);
app.post("/item", DBAuth, addItem);
app.get("/item/:itemId", DBAuth, getItem);
app.post("/item/:itemId", DBAuth, updateItem);
app.delete("/item/:itemId", DBAuth, deleteItem);

// user Routes
app.post("/signup", signUp);
app.post("/login", login);
app.post("/user/uploadImage", DBAuth, uploadImage);
app.get("/user", DBAuth, (req, res) => {
  let item = {};
  db.doc(`/${req.user.email.split("@")[0]}/mainInfo`)
    .get()
    .then((doc) => {
      if (
        !doc.exists &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        const idToken = req.headers.authorization.split("Bearer ")[1];
        admin
          .auth()
          .verifyIdToken(idToken)
          .then((decodedToken) => {
            req.user = decodedToken;
            return req.user;
          })
          .then((res) => {
            const noImg = "no-img.jpg";
            const userCredentials = {
              name: res.name,
              email: res.email,
              password: res.uid,
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media&token=63a1df34-973f-4a5e-9ec6-0174ec3462b1`,
              createdAt: new Date().toISOString(),
              userId: res.user_id,
            };
            db.collection(`${res.email.split("@")[0]}`)
              .doc("mainInfo")
              .set({ userCredentials });
          });
      }
      item = { ...doc.data() };
      return res.json(item);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
