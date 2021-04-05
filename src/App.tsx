import React from 'react';
import './App.scss';
import Dashboard from './Dashboard';
import Login from './Login';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import firebase from 'firebase/app';
import { FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import * as FirebaseService from './services/firebase';

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<FirebaseAuthProvider {...FirebaseService.firebaseConfig} firebase={firebase}>
				<div>
					<IfFirebaseUnAuthed>
						{() => {
							return <Login />;
						}}
					</IfFirebaseUnAuthed>
					<IfFirebaseAuthed>
						{() => {
							return <Dashboard />;
						}}
					</IfFirebaseAuthed>
				</div>
			</FirebaseAuthProvider>
		</ThemeProvider>
	);
}

export default App;
