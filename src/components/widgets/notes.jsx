import React from 'react';
import { connect } from 'react-redux';

import { getNote } from '../../redux/store';

class Notes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: 'this widget does not having saving capabilities'
		};
		this.onNoteChange = this.onNoteChange.bind(this);
	}

	onNoteChange(event) {
		this.setState({ notes: event.target.value });
	}

	render() {
		return (
			<div id="notes">
				<textarea id="noteInput" type="text" value={this.state.notes} onChange={this.onNoteChange} />
			</div>
		);
	}
}

// linking update functions
const mapDispatchToProps = () => {
	return {
		getNote
	};
};

export default connect(null, mapDispatchToProps())(Notes);
