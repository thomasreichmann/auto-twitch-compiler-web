import * as functions from 'firebase-functions';

import axios from 'axios';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const refreshBackEnd = functions.https.onCall((data, context) => {
	axios({
		method: 'get',
		url: 'http://35.247.236.192:3000/refresh',
		responseType: 'stream',
	});
});
