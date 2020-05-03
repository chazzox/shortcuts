import React from 'react';
import ReactDOM from 'react-dom';

// this is the component we wrap all of our modals in
export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		// this is what we're wrapping our modal inside
		this.el = document.createElement('span');
		this.state = {
			// this is where we're are putting the modal
			popupRoute: document.getElementById('modal'),
			// this element behind the thing we're wrapping it in
			appRoute: document.getElementById('root')
		};
	}
	componentDidMount() {
		this.state.appRoute.classList.add('MODAL_OPEN_CLASS');
		this.state.popupRoute.appendChild(this.el);
	}
	componentWillUnmount() {
		this.state.appRoute.classList.remove('MODAL_OPEN_CLASS');
		this.state.popupRoute.removeChild(this.el);
	}
	render() {
		return ReactDOM.createPortal(<div className="modalWrapper">{this.props.children}</div>, this.el);
	}
}

// this is what we wrap our errors inside
export class ErrorContainer extends React.Component {
	render() {
		return <div className="errorContainer">{this.props.errorMessage}</div>;
	}
}
