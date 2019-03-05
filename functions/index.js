const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.updateUser = functions.firestore.document('users/{email}').onUpdate((change, context) => {
	const newValue = change.after.data();
	const uid = newValue['uid'];	
	if (uid === null || uid.length === 0) {
		return null;
	}

	const team = newValue['team'];
	const teamRole = newValue['team_role'];
	var jsonVariable = {};
	jsonVariable[`${uid}`] = teamRole
	console.log(`newValue: ${newValue}`);
	firestore.doc(`users_by_uid/${uid}`).set(newValue, {merge: true});
	return firestore.doc(`teams/${team}`).set({users: jsonVariable}, {merge: true});
});