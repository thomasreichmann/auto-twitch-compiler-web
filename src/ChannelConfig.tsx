import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Channel from './Channel.interface';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Send from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';

import LanguageDialog from './ChannelLanguageDialog';
import { Language } from './Channel.interface';

import Paper from '@material-ui/core/Paper';

import * as FirebaseService from './services/firebase';

interface ChannelConfigProps {
	channel: Channel;
}

function ChannelConfig(props: ChannelConfigProps) {
	const [loading, setLoading] = useState(false);
	const [channel, setChannel] = useState(props.channel);
	const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
	const [languages, setLanguages] = useState(props.channel.languages);

	const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: number) => {
		channel.languages[key][e.target.name] = e.target.value;
		setChannel(channel);
	};

	const handleLanguageDelete = (i: number) => {
		let langs = languages.slice(0, i).concat(languages.slice(i + 1, languages.length));
		channel.languages = langs;
		setChannel(channel);
		setLanguages(langs);
		console.log(channel.languages);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		channel[e.target.name] = e.target.value;
		setChannel(channel);
	};

	const formSubmit = (e: React.FormEvent) => {
		(async () => {
			setLoading(true);
			await FirebaseService.updateChannel(channel);
			setLoading(false);
		})();
		e.preventDefault();
	};

	const handleLanguageDialogClose = () => {
		setLanguageDialogOpen(false);
	};

	const handleLanguageDialogCreate = (language: Language) => {
		handleLanguageDialogClose();
		let lang = language;
		channel.languages.push(lang);
		setChannel(channel);
	};

	const renderLanguages = (): JSX.Element[] => {
		let langs: JSX.Element[] = [];

		for (let i = 0; i < languages.length; i++) {
			const language = languages[i];

			langs.push(
				<Paper elevation={2} key={channel.name + language.code}>
					<CardContent className="CardContent">
						<TextField
							className="LanguageField"
							key={channel.name + language.code + i}
							onChange={e => handleLanguageChange(e, i)}
							name="code"
							label="code"
							margin="normal"
							defaultValue={language.code}
						/>
						<TextField
							className="LanguageField"
							key={channel.name + language.ammount + i}
							onChange={e => handleLanguageChange(e, i)}
							name="ammount"
							label="ammount"
							margin="normal"
							defaultValue={language.ammount}
						/>

						<CardActions className="CardContent">
							<IconButton aria-label="share" onClick={e => handleLanguageDelete(i)}>
								<Remove style={{ color: 'red' }} />
							</IconButton>
						</CardActions>
					</CardContent>
				</Paper>
			);
		}

		return langs;
	};

	let load = loading ? <CircularProgress /> : <br />;

	return (
		<div>
			<form className="ConfigForm" onSubmit={formSubmit}>
				<TextField onChange={handleChange} name="id" label="ID" margin="normal" defaultValue={channel.id} />
				<TextField onChange={handleChange} name="name" label="Name" margin="normal" defaultValue={channel.name} />
				<TextField onChange={handleChange} name="gameId" label="Game ID" margin="normal" defaultValue={channel.gameId} />
				<TextField onChange={handleChange} name="gameName" label="Game Name" margin="normal" defaultValue={channel.gameName} />
				<TextField onChange={handleChange} name="youtubeApiKey" label="YT api key" margin="normal" defaultValue={channel.youtubeApiKey} />

				<Card elevation={5} className="LanguageCard">
					{renderLanguages()}

					<CardActions style={{ margin: 'auto' }}>
						<IconButton aria-label="share" onClick={e => setLanguageDialogOpen(true)}>
							<Add style={{ color: 'green' }} />
						</IconButton>
					</CardActions>
				</Card>

				<Button id="updateButton" aria-label="share" type="submit" value="Submit" variant="contained" color="primary">
					Atualizar
				</Button>

				{load}
			</form>
			<LanguageDialog open={languageDialogOpen} onClose={handleLanguageDialogClose} onCreate={handleLanguageDialogCreate} />
		</div>
	);
}

export default ChannelConfig;
