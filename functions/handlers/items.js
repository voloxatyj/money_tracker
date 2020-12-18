const {
	db,
	config
} = require('../utils/config')

// get all items
exports.getItems = (req, res) => {
	db.collection(`${req.user.email.split('@')[0]}`).orderBy("createdAt", "desc").get()
	.then(data => {
		let items = []
		data.forEach(doc => {
				items.push({
					category: doc.data().category,
					description: doc.data().description,
					profit: doc.data().profit,
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
			return res.status(201).json({
				error: 'something go wrong'
			})
		})
}
// add item
exports.addItem = (req, res) => {

	if (req.method !== 'POST') {
		return res.status(400).json({
			error: 'Method not allowed'
		})
	} 
	const item = {
		category: req.body.category,
		description: req.body.description,
		profit: req.body.profit,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		createdAt: req.body.createdAt || new Date().toISOString(),
	}
	db.collection(`${req.user.email.split('@')[0]}`).add(item)
		.then(doc => {
			item.itemId = doc.id
			db.doc(`/${req.user.email.split('@')[0]}/${doc.id}`).update(item)
			return res.json(item)
		})
		.catch(err => {
			return res.status(500).json({
				error: 'something went wrong'
			})
		})
}
// get item
exports.getItem = (req, res) => {
	let item = {}
	db.doc(`/${req.user.email.split('@')[0]}/${req.params.itemId}`)
		.get()
		.then(doc => {
			if (!doc.exists) {
				return res.status(404).json({
					error: 'item not found'
				})
			}
			item = {
				...doc.data()
			}
			return res.json(item)
		})
		.catch(err => {
			return res.status(500).json({
				error: err.code
			})
		})
}
// update item
exports.updateItem = (req, res) => {
	db.doc(`/${req.user.email.split('@')[0]}/${req.params.itemId}`)
		.get()
		.then(doc => {
			if (!doc.exists) {
				return res.status(404).json({
					error: 'item not found'
				})
			} else {
				const data = doc.data()
					const item = {
						category: req.body.category || data.category,
						description: req.body.description || data.description,
						imageUrl: req.body.imageUrl || data.imageUrl,
						price: req.body.price || data.price,
						createdAt: req.body.createdAt || data.createdAt,
						profit: req.body.profit || data.profit,
						itemId: doc.id
					}
				db.doc(`/${req.user.email.split('@')[0]}/${req.params.itemId}`).update(item)
				return res.json(item)
			}
		})
		.catch(err => {
			res.status(400).json({
				error: err
			})
		})
}
// delete item
exports.deleteItem = (req, res) => {
	const item = db.doc(`/${req.user.email.split('@')[0]}/${req.params.itemId}`)
	item
		.get()
		.then(doc => {
			if (!doc.exists) {
				return res.status(404).json({
					error: 'item not found'
				})
			} else {
				item.delete()
				return res.json({
					message: 'Item delete successfully'
				})
			}
		})
		.catch(err => {
			res.status(400).json({
				error: err
			})
		})
}