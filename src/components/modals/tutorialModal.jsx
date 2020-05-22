import React from 'react';
import { connect } from 'react-redux';

import Popup from '../utils/modalUtils';

class TutorialModal extends React.Component {
	render() {
		return this.props.editMode ? (
			<Popup>
				<div className="modal">
					<div>a bitch ass really never been to the site before</div>
					<button className="buttonGeneral" onClick={() => this.props.loadExample()}>
						loadExample
					</button>
					<button className="buttonGeneral" onClick={() => this.props.close()}>
						close
					</button>
				</div>
			</Popup>
		) : null;
	}
}

// 'imports' our global variables
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.value
	};
};

// redux function that connects us to the global state
export default connect(mapStateToProps, null)(TutorialModal);
