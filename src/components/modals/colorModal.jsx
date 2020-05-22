import React from 'react';
import { connect } from 'react-redux';

import Popup from '../utils/modalUtils';
import { changeTheme } from '../../redux/store';

class ColorModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emptyState: null
		};
	}
	render() {
		return (
			<Popup>
				<div className="modal">
					<button
						className="buttonGeneral"
						onClick={() => {
							// this is where we would begin to expand the styling options, eg have a modal to add in full rgb customization or more theme options that you can make and
							// they can pick from, up to you
							// tbh the logic here is clapped and needs a complete overhaul, im planning on doing this in a later update
							if (document.documentElement.getAttribute('theme') === 'custom') {
								document.documentElement.style = '';
								this.props.changeTheme({
									themeType: 'dark'
								});
								return;
							}

							this.props.changeTheme({
								themeType: this.props.userInfo.themeType === 'light' ? 'dark' : 'light'
							});
							return;
						}}
					>
						toggle theme
					</button>
					<div className="buttonGeneral" onClick={() => this.props.close()}>
						Cancel
					</div>
				</div>
			</Popup>
		);
	}
}

// 'imports' our global variables
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.value,
		userInfo: state.userSlice.userInfo
	};
};

// 'imports' our global function
const mapDispatchToProps = () => {
	return {
		changeTheme
	};
};

// redux function that connects us to the global state
export default connect(mapStateToProps, mapDispatchToProps())(ColorModal);
