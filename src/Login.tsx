import React from 'react';

import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';

function Login() {
	return (
		<div className="LoginWrapper">
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
					firebase.auth().signInWithPopup(googleAuthProvider);
				}}
			>
				Login
			</Button>
		</div>
	);
}

export default Login;
