/* global gapi */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class GMAIL extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gapiLoaded: false,
			isLoggedIn: false,
			emailIdArray: [],
			CLIENT_ID: '665282341405-ies7ohp28g3hhmh5pc58otc54mk3vnco.apps.googleusercontent.com',
			API_KEY: 'AIzaSyBN3LERgzaEdRJEhu0_6AHutXx6CzZvhIQ',
			DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
			SCOPES: 'https://www.googleapis.com/auth/gmail.readonly'
		};
	}

	componentDidMount() {
		const script = document.createElement('script');
		script.src = 'https://apis.google.com/js/client.js';
		script.onload = () => {
			const initClient = () => {
				gapi.client
					.init({
						apiKey: this.state.API_KEY,
						clientId: this.state.CLIENT_ID,
						discoveryDocs: this.state.DISCOVERY_DOCS,
						scope: this.state.SCOPES
					})
					.then(() => {
						this.setState({
							gapiLoaded: true
						});
						const auth2 = gapi.auth2.getAuthInstance();
						const getLoginState = () => auth2.isSignedIn.get();
						this.setState({ isLoggedIn: getLoginState() });
						// runs when the signin state is changed
						auth2.isSignedIn.listen(() => {
							this.setState({ isLoggedIn: getLoginState() });
						});
						if (getLoginState()) this.getMessages();
					});
			};
			gapi.load('client:auth2', initClient);
		};
		document.body.appendChild(script);
	}

	getMessages() {
		gapi.client.gmail.users.messages
			.list({
				userId: 'me'
			})
			.then((response) => JSON.parse(response.body).messages)
			.then((messageJSON) => {
				this.setState({ emailIdArray: messageJSON });
			});
	}

	handleLoginClick = () => {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signIn().then(() => this.getMessages());
	};

	handleLogoutClick = () => {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut();
	};

	render() {
		return this.state.gapiLoaded ? (
			<div>
				{this.state.isLoggedIn ? (
					<>
						<h3>You are logged in</h3>
						<p>emails</p>
						<div className="emailContainer">
							{this.state.emailIdArray.map((email, index) => (
								<Email key={index} emailId={email.id} />
							))}
						</div>
						{this.props.editMode ? <button onClick={this.handleLogoutClick}>Logout</button> : null}
					</>
				) : (
					<>
						<h3>Login with Google</h3>
						<button onClick={this.handleLoginClick}>Log in with Google</button>
					</>
				)}
			</div>
		) : null;
	}
}

class Email extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailBody: '',
			subject: ''
		};
	}

	componentDidMount() {
		this.getEmail(this.props.emailId);
	}

	getEmail(id) {
		gapi.client.gmail.users.messages
			.get({
				userId: 'me',
				id: id
			})
			.then((response) => {
				this.setState({ emailBody: JSON.parse(response.body) });
				JSON.parse(response.body).payload.headers.map((headerValue) => {
					if (headerValue.name === 'Subject') this.setState({ subject: headerValue.value });
				});
			});
	}

	render() {
		return (
			<a className="emailLink" href={`https://mail.google.com/mail/u/0/#inbox/${this.state.emailBody.threadId}`}>
				{this.state.subject}
			</a>
		);
	}
}

// linking global values
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.isEditMode
	};
};

export default connect(mapStateToProps, null)(GMAIL);
