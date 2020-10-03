const { db, config } = require('../utilits/config')

// get all items
exports.getItems = (req, res) => {
	db.collection(`${req.user.email.split('@')[0]}`).orderBy("createdAt", "desc").get()
		.then(data => {
			let items = []
			data.forEach(doc => {
				items.push({
					category: doc.data().category,
					description: doc.data().description,
					name: doc.data().name,
					imageUrl: doc.data().imageUrl || '',
					price: doc.data().price,
					createdAt: doc.data().createdAt,
					itemId: doc.data().itemId,
					email: doc.data().email
				})
			})
			return res.json(items)
		})
		.catch(err => {
			console.error(err)
			return res.status(201).json({ error: 'something go wrong' })
		})
}
// add item
exports.addItem = (req, res) => {

	if (req.method !== 'POST') {
		return res.status(400).json({ error: 'Method not allowed' })
	}

	const noItem = 'no-item.png'

	const item = {
		category: req.body.category,
		description: req.body.description,
		name: req.body.name,
		imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/no-item.png?alt=media&token=5192ea44-d6a0-4e9f-b2a2-e6305f0fed69`,
		price: req.body.price,
		createdAt: new Date().toISOString(),
	}

	db.collection(`${req.user.email.split('@')[0]}`).add(item)
		.then(doc => { 
			item.itemId = doc.id
			return res.json(item)
		})
		.catch(err => {
			console.log(err)
			return res.status(500).json({ error: 'something went wrong' })
		})
}
// get item
exports.getItem = (req, res) => {
	let item = {}
	db.doc(`/${req.user.email.split('@')[0]}/${req.params.itemId}`)
		.get()
		.then(doc => {
			if(!doc.exists) {
				return res. status(404).json({ error: 'item not found' })
			}
			item = {...doc.data()}
			return res.json(item)
		})
		.catch(err => {
			console.log('err: ', err)
			return res.status(500).json({ error: err.code })
		})
}
// update item
exports.updateItem = (req, res) => {
	const item = {
		category: req.body.category,
		description: req.body.description,
		name: req.body.name,
		image: req.body.image || '',
		price: req.body.price,
		createdAt: new Date().toISOString()
	}
	db.doc(`/${req.user.email.split('@')[0]}/${req.params.itemId}`)
	.get()
		.then(doc => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'item not found' })
			} else {
				item.itemId = doc.id
				db.doc(`/${req.user.email.split('@')[0]}/${req.params.itemId}`).update(item)
				return res.json(item)
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({ error: err })
		})
}
// delete item
exports.deleteItem = (req,res) => {
	const item = db.doc(`/${req.user.email.split('@')[0]}/${req.params.itemId}`)
	item
		.get()
		.then(doc => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'item not found' })
			} else {
				item.delete()
				return res.json({ message: 'Item delete successfully' })
			}
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({ error: err })
		})
}