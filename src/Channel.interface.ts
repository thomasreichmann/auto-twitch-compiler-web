interface IObjectKeys {
	[key: string]: string | number | Language[];
}

interface Channel extends IObjectKeys {
	id: string;
	name: string;
	gameId: string;
	gameName: string;
	youtubeApiKey: string;
	languages: Language[];
}

export interface Language extends IObjectKeys {
	code: string;
	ammount: number;
}

export default Channel;
