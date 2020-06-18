import React from 'react';
import { Link } from 'react-router-dom';

export default class Settings extends React.Component {
	render() {
		return (
			<>
				<p>this really do be settings</p>
				<Link className="link" to="/">
					<span className="buttonGeneral">back to shortcuts</span>
				</Link>
			</>
		);
	}
}
