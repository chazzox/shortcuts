import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';

import './style.scss';

import Shortcuts from './components/shortcuts';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }
    render() {
        return (
            <div>
                <div className="nav">
                    <div className="normalNav">
                        <h1 className="navTitle">
                            SHORTCUTS {this.state.editMode ? ' - editmode' : ''}
                        </h1>
                        <div className="navIconContainer">
                            <h1 className="yeah">made for gamers, by gamers</h1>
                            <button
                                className="editButton"
                                onClick={() => {
                                    this.setState({ editMode: !this.state.editMode });
                                }}
                            >
                                edit
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <Shortcuts editMode={this.state.editMode} />
                </div>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
