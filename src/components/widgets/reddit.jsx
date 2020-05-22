import React from 'react';
import Cookies from 'js-cookie';

const clientId = '1v9Fim9PiWKP_w';
const redirectUrl = 'http://localhost:3000/';
const api_secret = 'MXY5RmltOVBpV0tQX3c6TkI0OWF1QTk4dFBIMkNmdzhhMmY1cERhRGpN';
// const api_secret = 'UU96NE0xc1BCQTJFdFE6YWpoRzNGYUZOc2lCMm4tQmdwOTNYSnBhdGhNCg==';
const callbackRegexReddit = /^state=([\w-]*)&code=([\w-]*)$/;

export default class Reddit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timelineAvailable: callbackRegexReddit.test(document.location.href.split('?')[1]),
			redditTimeline: []
		};
	}
	queryStringToJSON(queryString) {
		const pairs = queryString.split('&');
		var result = {};
		pairs.forEach(function (pair) {
			pair = pair.split('=');
			result[pair[0]] = decodeURIComponent(pair[1] || '');
		});
		return result;
	}
	componentDidMount() {
		const oAuthCookie = Cookies.getJSON('redditOauth');
		if (oAuthCookie !== undefined) {
			this.refreshOAuthToken(oAuthCookie.refresh_token);
			return;
		}
		if (this.state.timelineAvailable) this.getOAuthToken();
	}
	refreshOAuthToken(token) {
		const urlencoded = new URLSearchParams();
		urlencoded.append('grant_type', 'refresh_token');
		urlencoded.append('refresh_token', token);

		fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: 'Basic UU96NE0xc1BCQTJFdFE6YWpoRzNGYUZOc2lCMm4tQmdwOTNYSnBhdGhNCg==',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: urlencoded,
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (json.error === undefined) {
					this.setState({ timelineAvailable: true });
					this.getRedditFeed(json.access_token);
				} else console.log(json);
			})
			.catch((error) => console.log('error', error));
	}

	getOAuthToken() {
		const urlencoded = new URLSearchParams();
		urlencoded.append('grant_type', 'authorization_code');
		urlencoded.append('code', this.queryStringToJSON(document.location.href.split('?')[1]).code);
		urlencoded.append('redirect_uri', 'http://localhost:3000/');

		fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: 'Basic ' + api_secret,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: urlencoded,
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (json.error === undefined) {
					Cookies.set('redditOauth', json);
					this.getRedditFeed(json.access_token);
				} else {
					this.setState({ timelineAvailable: false });
					document.href = document.location.origin;
					console.log(json);
				}
			})
			.catch((error) => console.log('error', error));
	}

	getRedditFeed(oauthAccessToken) {
		fetch('https://oauth.reddit.com/.json', {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + oauthAccessToken },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((json) => {
				this.setState({ redditTimeline: JSON.parse(json).data.children });
			})
			.catch((error) => console.log('error', error));
	}
	render() {
		return (
			<>
				<p>Reddit timeline</p>
				{this.state.timelineAvailable ? (
					<div className="timeline">
						{this.state.redditTimeline === []
							? null
							: this.state.redditTimeline.map((item, index) => <RedditPost post={item.data} key={index} />)}
					</div>
				) : (
					<a
						href={
							'https://www.reddit.com/api/v1/authorize?client_id=' +
							clientId +
							'&response_type=code&state=asdfasdfs&redirect_uri=' +
							redirectUrl +
							'&duration=permanent&scope=read'
						}
					>
						login to reddit
					</a>
				)}
			</>
		);
	}
}

class RedditPost extends React.Component {
	render() {
		return (
			<div className="tweet">
				<div>Sub Reddit: {this.props.post.subreddit}</div>
				<span className="tweetContent">
					{this.props.post.title} by {this.props.post.author}
				</span>
			</div>
		);
	}
}
