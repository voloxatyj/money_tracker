const { db, config, admin } = require('../utilits/config')
const firebase = require('firebase')
firebase.initializeApp(config)
const { validateSignUpData, validateLoginData } = require('../utilits/validate')
const { v4: uuidv4 } = require('uuid')

exports.signUp = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		name: req.body.name,
	}

	const { valid, errors } = validateSignUpData(newUser)
	
	if (!valid) return res.status(400).json(errors)

	let token, userId
	const noImg = 'no-img.jpg'

	db.doc(`/${newUser.email.split('@')[0]}/mainInfo`).get()
		.then(doc => {
			if (doc.exists) {
				return res.status(400).json({ general : 'email is already in use' })
			} else {
				return firebase
					.auth()
					.createUserWithEmailAndPassword(newUser.email, newUser.password)
			}
		})
		.then(data => {
			userId = data.user.uid
			return data.user.getIdToken()
		})
		.then(tokenId => {
			token = tokenId
			const userCredentials = {
				name: newUser.name,
				email: newUser.email,
				password: newUser.password,
				imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media&token=63a1df34-973f-4a5e-9ec6-0174ec3462b1`,
				createdAt: new Date().toISOString(),
				userId
			}
			db.collection(`${newUser.email.split('@')[0]}`).doc('mainInfo').set({ userCredentials })
			return res.status(201).json({ token })
		})
		.catch(err => {
			console.error('err: ', err)
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({ email: 'email is already in use' })
			} else {
				return res.status(500).json({	error: err.code })
			}
		})
}

exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password
	}

	const { valid, errors } = validateLoginData(user)

	if (!valid) return res.status(400).json(errors)
	
	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then(data => data.user.getIdToken())
		.then(token => res.json({ token }))
		.catch(err => {
			console.error(err)
			return res
				.status(403)
				.json({ general: `${err.code}`.slice(5) });
		})
}

exports.uploadImage = (req, res) => {
	const BusBoy = require("busboy");
	const path = require("path");
	const os = require("os");
	const fs = require("fs");

	const busboy = new BusBoy({ headers: req.headers });

	let imageToBeUploaded = {};
	let imageFileName;
	let generatedToken = uuidv4();

	busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {

		if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
			return res.status(400).json({ error: "Wrong file type submitted" });
		}
		const imageExtension = path.extname(filename)
		imageFileName = `${Math.round(
			Math.random() * 1000000000000
		).toString()}.${imageExtension}`;
		const filepath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filepath, mimetype };
		file.pipe(fs.createWriteStream(filepath));
	});
	busboy.on("finish", () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.filepath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype,
						firebaseStorageDownloadTokens: generatedToken,
					},
				},
			})
			.then(() => {
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
				return db.doc(`/${req.user.email.split('@')[0]}/mainInfo`).update({ imageUrl });
			})
			.then(() => {
				return res.json({ message: "image uploaded successfully" });
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json({ error: "something went wrong" });
			});
	});
	busboy.end(req.rawBody);
};