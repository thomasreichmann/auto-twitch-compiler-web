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
// import Send from '@material-ui/icons/Send';
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

	const createUploadTime = () => {
		let uploadTimes = channel.uploadTimes;
		uploadTimes.push('');
		setChannel({
			...channel,
			uploadTimes,
		});
	};

	const handleTimeDelete = (i: number) => {
		let uploadTimes = channel.uploadTimes
			.slice(0, i)
			.concat(channel.uploadTimes.slice(i + 1, channel.uploadTimes.length));
		setChannel({
			...channel,
			uploadTimes,
		});
	};

	const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		channel.languages[index][e.target.name] = e.target.value;
		setChannel(channel);
	};

	const handleLanguageDelete = (i: number) => {
		let langs = channel.languages.slice(0, i).concat(channel.languages.slice(i + 1, channel.languages.length));
		setChannel({
			...channel,
			languages: langs,
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.name);
		let target = channel[e.target.name];
		target = e.target.value;
		setChannel({
			...channel,
			[e.target.name]: target,
		});
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		console.log(e.target.value, index);
		channel.uploadTimes[index] = e.target.value;
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
		channel.languages.push(language);
		setChannel(channel);
	};

	const renderLanguages = (): JSX.Element[] => {
		let langs: JSX.Element[] = [];

		for (let i = 0; i < channel.languages.length; i++) {
			const language = channel.languages[i];

			langs.push(
				<Paper elevation={2} key={i} style={{ width: '20%' }}>
					<CardContent className="CardContent">
						<TextField
							className="LanguageField"
							onChange={e => handleLanguageChange(e, i)}
							name="code"
							label="code"
							margin="normal"
							defaultValue={language.code}
						/>
						<TextField
							className="LanguageField"
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

	const renderUploadTimes = () => {
		let uploadTimes: JSX.Element[] = [];
		for (let i = 0; i < channel.uploadTimes.length; i++) {
			const uploadTime = channel.uploadTimes[i];

			uploadTimes.push(
				<Paper className="timeContent" key={i}>
					<CardContent>
						<TextField
							label="Upload time"
							type="time"
							defaultValue={uploadTime}
							className="timeField"
							onChange={e => handleTimeChange(e, i)}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<CardActions className="CardContent">
							<IconButton aria-label="share" onClick={e => handleTimeDelete(i)}>
								<Remove style={{ color: 'red' }} />
							</IconButton>
						</CardActions>
					</CardContent>
				</Paper>
			);
		}
		return uploadTimes;
	};

	let load = loading ? <CircularProgress /> : <br />;

	return (
		<div>
			<form className="ConfigForm" onSubmit={formSubmit}>
				<TextField onChange={handleChange} name="id" disabled label="ID" margin="normal" defaultValue={channel.id} />
				<TextField onChange={handleChange} name="name" label="Name" margin="normal" defaultValue={channel.name} />
				<TextField
					onChange={handleChange}
					name="gameId"
					label="Game ID"
					margin="normal"
					defaultValue={channel.gameId}
				/>
				<TextField
					onChange={handleChange}
					name="gameName"
					label="Game Name"
					margin="normal"
					defaultValue={channel.gameName}
				/>
				<TextField
					onChange={handleChange}
					name="youtubeApiKey"
					label="YT api key"
					margin="normal"
					defaultValue={channel.youtubeApiKey}
				/>
				<TextField
					onChange={handleChange}
					name="titleTemplate"
					label="Title Template"
					margin="normal"
					defaultValue={channel.titleTemplate}
				/>

				<Card elevation={2} className="LanguageCard">
					{renderLanguages()}

					<CardActions style={{ margin: 'auto' }}>
						<IconButton aria-label="share" onClick={e => setLanguageDialogOpen(true)}>
							<Add style={{ color: 'green' }} />
						</IconButton>
					</CardActions>
				</Card>

				<Card elevation={2} className="LanguageCard">
					{renderUploadTimes()}
					<CardActions className="timePlaceHolderContainer">
						<IconButton className="addTimeButton" aria-label="share" onClick={e => createUploadTime()}>
							<Add style={{ color: 'green' }} />
						</IconButton>
					</CardActions>
				</Card>

				<Button
					id="updateButton"
					aria-label="share"
					type="submit"
					value="Submit"
					variant="contained"
					color="primary"
				>
					Atualizar
				</Button>

				{load}
			</form>
			<LanguageDialog
				open={languageDialogOpen}
				onClose={handleLanguageDialogClose}
				onCreate={handleLanguageDialogCreate}
			/>
		</div>
	);
}

export default ChannelConfig;
