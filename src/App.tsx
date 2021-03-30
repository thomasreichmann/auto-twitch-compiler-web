import './App.scss';
import React, { useState, useEffect } from 'react';
import ChannelGrid from './ChannelGrid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Channel from './Channel.interface';
import * as FirestoreService from './services/firebase';

import ChannelDialog from './ChannelDialog';

import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
	let ch: Channel[] = [];
	const [channels, setChannels] = useState(ch);
	const [channelDialogOpen, setChannelDialogOpen] = useState(false);

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

	const getChannels = async () => {
		const c = await FirestoreService.getChannels();
		console.log(`got channels from firebase`);
		c.sort((a, b) => {
			var textA = a.name.toUpperCase();
			var textB = b.name.toUpperCase();
			return textA < textB ? -1 : textA > textB ? 1 : 0;
		});
		setChannels(c);
	};

	const handleChannelDelete = async (channel: Channel) => {
		await FirestoreService.removeChannel(channel);
		getChannels();
	};

	const handleChannelDialogCreate = async (channel: Channel) => {
		setChannelDialogOpen(false);
		await FirestoreService.addChannel(channel);
		getChannels();
	};

	useEffect(() => {
		if (!channels.length) getChannels();
	}, [channels, setChannels]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container>
				<Paper>
					<ChannelGrid channels={channels} onDelete={c => handleChannelDelete(c)}></ChannelGrid>
					<IconButton aria-label="share" onClick={e => setChannelDialogOpen(true)}>
						<Add style={{ color: 'green' }} />
					</IconButton>
					<ChannelDialog open={channelDialogOpen} onClose={() => setChannelDialogOpen(false)} onCreate={c => handleChannelDialogCreate(c)} />
				</Paper>
			</Container>
		</ThemeProvider>
	);
}

export default App;
