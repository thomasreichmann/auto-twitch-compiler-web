import React from 'react';
import { TableRow, TableCell, IconButton, Collapse } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Remove from '@material-ui/icons/Remove';
import Channel from './Channel.interface';
import ChannelConfig from './ChannelConfig';

interface ChannelGridRowProps {
	channel: Channel;
	onDelete: (channel: Channel) => any;
}

interface ChannelGridRowState {
	open: boolean;
}

class ChannelGridRow extends React.Component<ChannelGridRowProps, ChannelGridRowState> {
	constructor(props: ChannelGridRowProps) {
		super(props);
		this.state = { open: false };
	}

	setOpen(open: boolean) {
		this.setState({
			open,
		});
	}

	// TODO: get this shit delete button working, prob need to redo this class as a functiond idk ::9 gl!

	async handleChannelDelete() {
		this.props.onDelete(this.props.channel);
	}

	render() {
		let channel = this.props.channel;

		return (
			<React.Fragment>
				<TableRow>
					<TableCell>
						<IconButton size="small" onClick={() => this.setOpen(!this.state.open)}>
							{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
					<TableCell>{channel.name}</TableCell>
					<TableCell>{channel.gameName}</TableCell>
					<TableCell>{channel.id}</TableCell>
					<TableCell>
						<IconButton aria-label="share" onClick={e => this.handleChannelDelete()}>
							<Remove style={{ color: 'red' }} />
						</IconButton>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={this.state.open} timeout="auto" unmountOnExit>
							<ChannelConfig channel={channel}></ChannelConfig>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}
}

export default ChannelGridRow;
