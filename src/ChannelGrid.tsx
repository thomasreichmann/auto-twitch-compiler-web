import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import React from 'react';
import Channel from './Channel.interface';
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import ChannelGridRow from './ChannelGridRow';

interface ChannelGridProps {
	channels: Channel[];
	onDelete: (channel: Channel) => any;
}

export class ChannelGrid extends React.Component<ChannelGridProps> {
	render() {
		const rows = this.props.channels.map(channel => {
			return <ChannelGridRow key={channel.id} channel={channel} onDelete={c => this.props.onDelete(c)}></ChannelGridRow>;
		});

		return (
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Game</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>{rows}</TableBody>
				</Table>
			</TableContainer>
		);
	}
}

export default ChannelGrid;
