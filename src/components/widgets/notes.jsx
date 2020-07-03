import React from 'react';
import { connect } from 'react-redux';

import { setNote } from '../../redux/store';

class Notes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: this.props.notes[this.props.noteInfo.noteId].value,
			typing: false,
			typingTimeout: 0
		};
		this.onNoteChange = this.onNoteChange.bind(this);
	}

	onNoteChange(event) {
		if (this.state.typingTimeout) {
			clearTimeout(this.state.typingTimeout);
		}

		this.setState({
			notes: event.target.value,
			typing: false,
			// saves 3/4 of second after the user stopped typing it will save
			typingTimeout: setTimeout(
				() => this.props.setNote({ noteId: this.props.noteInfo.noteId, noteValue: this.state.notes }),
				750
			)
		});
		this.setState({ notes: event.target.value });
	}

	render() {
		return (
			<div id="notes">
				<textarea
					id="noteInput"
					type="text"
					value={this.state.notes}
					onChange={this.onNoteChange}
					placeholder="enter your notes here..."
				/>
			</div>
		);
	}
}

// linking the notes to the component
const mapStateToProps = (state) => {
	return {
		notes: state.userSlice.notes
	};
};

// getting the save not function from the reducer
const mapDispatchToProps = () => {
	return {
		setNote
	};
};

export default connect(mapStateToProps, mapDispatchToProps())(Notes);
