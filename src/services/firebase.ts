import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Channel from '../Channel.interface';

export const firebaseConfig = {
	apiKey: 'AIzaSyCv0zuU2MlcENDJCjaHQMNGFM7LAVcuVg8',
	authDomain: 'auto-twitch-compiler.firebaseapp.com',
	databaseURL: 'https://auto-twitch-compiler-default-rtdb.firebaseio.com',
	projectId: 'auto-twitch-compiler',
	storageBucket: 'auto-twitch-compiler.appspot.com',
	messagingSenderId: '572736506663',
	appId: '1:572736506663:web:82c54814a921ada8577702',
	measurementId: 'G-7F2CF997K7',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const functions = firebase.functions();

export const refreshBackEnd = functions.httpsCallable('refreshBackEnd');

export async function updateChannel(channel: Channel) {
	await db.collection('channels').doc(channel.id.toString()).set(channel);
}

export async function getChannels(): Promise<Channel[]> {
	const data = await db.collection('channels').get();

	return data.docs.map(doc => {
		let info = doc.data() as Channel;
		return {
			...info,
			id: doc.id,
		};
	});
}

export async function addChannel(channel: Channel): Promise<void> {
	await db.collection('channels').add(channel);
}

export async function removeChannel(channel: Channel): Promise<void> {
	await db.collection('channels').doc(channel.id).delete();
}
