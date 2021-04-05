import React, { useState } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import { Language } from './Channel.interface';

interface LanguageDialogProps {
	open: boolean;
	onClose: () => any;
	onCreate: (language: Language) => any;
}

function ChannelLanguageDialog(props: LanguageDialogProps) {
	let lang: Language = { code: 'en', ammount: 10 };
	const [language, setLanguage] = useState(lang);

	const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		language[e.target.name] = e.target.value;
		setLanguage(language);
	};

	const handleLanguageCreate = (language: Language) => {
		props.onCreate(language);
	};

	return (
		<Dialog open={props.open} onClose={props.onClose} keepMounted>
			<DialogContent className="LanguageDialog">
				<DialogTitle>Criar Language</DialogTitle>
				<TextField
					className="LanguageField"
					onChange={e => handleLanguageChange(e)}
					name="code"
					label="code"
					margin="normal"
					defaultValue={language.code}
				/>
				<TextField
					className="LanguageField"
					onChange={e => handleLanguageChange(e)}
					name="ammount"
					label="ammount"
					margin="normal"
					defaultValue={language.ammount}
				/>
				<Button
					id="LanguageDialogButton"
					variant="contained"
					color="primary"
					onClick={e => handleLanguageCreate(language)}
				>
					Add
				</Button>
			</DialogContent>
		</Dialog>
	);
}

export default ChannelLanguageDialog;
