import React from 'react';
import Cookies from 'js-cookie';

const callbackRegexTwitter = /^oauth_token=([\w-]*)&oauth_verifier=([\w-]*)$/;
const apiURL = 'https://ec2-52-91-0-119.compute-1.amazonaws.com:8000';

export default class Twitter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cookiesExist: !(Cookies.get('userTwitterOAuth') === undefined),
			isCallback: callbackRegexTwitter.test(document.location.href.split('?')[1]),
			oauthToken: {},
			oauthAccess: !(Cookies.get('userTwitterOAuth') === undefined)
				? { ...Cookies.getJSON('userTwitterOAuth') }
				: null,
			timeline: []
		};
	}

	componentDidMount() {
		if (this.state.cookiesExist) {
			this.setState({ oauthAccess: { ...Cookies.getJSON('userTwitterOAuth') } });
			this.getTwitterTimeline();
		} else if (this.state.isCallback) {
			this.getTwitterToken();
		} else {
			this.getTwitterLogin();
		}
	}

	queryStringToJSON(queryString) {
		var pairs = queryString.split('&');
		var result = {};
		pairs.forEach(function (pair) {
			pair = pair.split('=');
			result[pair[0]] = decodeURIComponent(pair[1] || '');
		});
		return result;
	}

	getTwitterLogin() {
		fetch(apiURL + '/twitter/oauth1', {
			method: 'post'
		})
			.then((res) => res.json())
			.then((value) => this.setState({ oauthToken: this.queryStringToJSON(value.body) }));
	}

	getTwitterToken() {
		fetch(apiURL + '/twitter/oauth2?' + document.location.href.split('?')[1], {
			method: 'POST'
		})
			.then((res) => res.json())
			.then((json) => {
				Cookies.set('userTwitterOAuth', this.queryStringToJSON(json.body));
				this.setState({ cookiesExist: true, oauthAccess: { ...this.queryStringToJSON(json.body) } });
				this.getTwitterTimeline();
			});
	}

	getTwitterTimeline() {
		console.log('fetching timeline?');
		fetch(
			apiURL +
				'/twitter/getTimeline?oauth_token=' +
				this.state.oauthAccess.oauth_token +
				'&oauth_token_secret=' +
				this.state.oauthAccess.oauth_token_secret,
			{
				method: 'POST'
			}
		)
			.then((res) => res.json())
			.then((value) => {
				if (value !== undefined && value.errors === undefined) {
					this.setState({ timeline: value });
				} else {
					this.setState({ cookiesExist: false });
					this.getTwitterLogin();
				}
			});
	}

	render() {
		return (
			<>
				{this.state.cookiesExist ? (
					// this is the section that is rendered once the use logs in
					<div>
						<p>twitter timeLine</p>

						<div className="timeline">
							{/* here we are looping through each of the twitter timeline objects and rendering a tweet object for each one */}
							{Object.keys(this.state.timeline).map((key, index) => (
								<TimelineObject tweet={this.state.timeline[key]} key={index} />
							))}
						</div>
					</div>
				) : (
					// this is the part that is rendered when the user has not logged in
					<div>
						<p className="App-link">twitter widget tings</p>
						<a
							href={`https://api.twitter.com/oauth/authenticate?oauth_token=${this.state.oauthToken.oauth_token}`}
						>
							login into twitter here
						</a>
					</div>
				)}
			</>
		);
	}
}

// this is a tweet timeline object
class TimelineObject extends React.Component {
	render() {
		// uncomment the log to see what an individual tweet looks like
		// console.log(this.props.tweet)
		return (
			<div className="tweet">
				<div>
					<img className="img" src={this.props.tweet.user.profile_image_url} alt="profile pic" />
					<span>{this.props.tweet.user.name}</span>
				</div>
				<span className="tweetContent">{this.props.tweet.text}</span>
			</div>
		);
	}
}
