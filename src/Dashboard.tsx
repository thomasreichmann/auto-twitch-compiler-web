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

import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

function Dashboard() {
	let ch: Channel[] = [];
	const [channels, setChannels] = useState(ch);
	const [channelDialogOpen, setChannelDialogOpen] = useState(false);

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
		<Container>
			<Paper>
				<Button
					variant="outlined"
					onClick={() => {
						firebase.auth().signOut();
					}}
				>
					Logout
				</Button>
				<Divider />
				<ChannelGrid channels={channels} onDelete={c => handleChannelDelete(c)}></ChannelGrid>
				<IconButton aria-label="share" onClick={e => setChannelDialogOpen(true)}>
					<Add style={{ color: 'green' }} />
				</IconButton>
				<ChannelDialog open={channelDialogOpen} onClose={() => setChannelDialogOpen(false)} onCreate={c => handleChannelDialogCreate(c)} />
			</Paper>
		</Container>
	);
}

export default Dashboard;
