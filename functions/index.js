const functions = require('firebase-functions');
const app = require('express')()
const DBAuth = require('./utilits/DBAuth')
const { db } = require('./utilits/config')
const { getItems, addItem, getItem, updateItem, deleteItem } = require('./handlers/items')
const { signUp, login, uploadImage } = require('./handlers/user')
const cors = require('cors')
app.use(cors())

// item Routes
app.get('/items', DBAuth, getItems)
app.post('/item', DBAuth, addItem)
app.get('/item/:itemId', DBAuth, getItem)
app.post('/item/:itemId', DBAuth, updateItem)
app.delete('/item/:itemId', DBAuth, deleteItem)

// user Routes
app.post('/signup', signUp)
app.post('/login', login)
app.post('/user/uploadImage', DBAuth, uploadImage)
app.get('/user', DBAuth, (req,res) => {
	let item = {}
	db.doc(`/${req.user.email.split('@')[0]}/mainInfo`)
		.get()
		.then(doc => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'info not found' })
			}
			item = { ...doc.data() }
			return res.json(item)
		})
		.catch(err => {
			console.log('err: ', err)
			return res.status(500).json({ error: err.code })
		})
})

exports.api = functions.https.onRequest(app)