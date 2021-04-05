import Channel from './Channel.interface';
import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
interface ChannelDialogProps {
	open: boolean;
	onClose: () => any;
	onCreate: (channel: Channel) => any;
}

function ChannelDialog(props: ChannelDialogProps) {
	let ch: Channel = {
		id: '0',
		name: '',
		gameId: '',
		gameName: '',
		youtubeApiKey: '',
		maxClipAge: '',
		languages: [],
		uploadTimes: [],
	};
	const [channel, setChannel] = useState(ch);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		channel[e.target.name] = e.target.value;
		setChannel(channel);
	};

	return (
		<Dialog open={props.open} onClose={props.onClose} keepMounted>
			<DialogContent className="LanguageDialog">
				<DialogTitle>Criar Channel</DialogTitle>
				<TextField onChange={handleChange} name="name" label="Name" margin="normal" defaultValue={channel.name} />
				<TextField onChange={handleChange} name="gameId" label="Game ID" margin="normal" defaultValue={channel.gameId} />
				<TextField onChange={handleChange} name="gameName" label="Game Name" margin="normal" defaultValue={channel.gameName} />
				<TextField onChange={handleChange} name="youtubeApiKey" label="YT api key" margin="normal" defaultValue={channel.youtubeApiKey} />
				<Button id="LanguageDialogButton" variant="contained" color="primary" onClick={e => props.onCreate(channel)}>
					Add
				</Button>
			</DialogContent>
		</Dialog>
	);
}

export default ChannelDialog;
