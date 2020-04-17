import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';

import store from './redux/store'
import Shortcuts from './components/shortcuts';
import './index.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }
    render() {
        return (
            <div className="containerOfAll">
                <div className="nav">
                    <h1 className="navTitle">
                        SHORTCUTS {this.state.editMode ? ' - editmode' : ''}
                    </h1>
                    <div className="navIconContainer">
                        <h1 className="yeah">made for gamers, by gamers</h1>
                        <button
                            className="editButton"
                            onClick={() => {
                                // editMode toggle, use this props to do conditional styling/rendering
                                // in any main component, the value: this.props.editMode will be available for use,
                                // in shortcuts please use this.state.editMode
                                this.setState({ editMode: !this.state.editMode });
                            }}
                        >
                            {this.state.editMode ? 'save' : 'edit'}
                        </button>
                    </div>
                </div>
                <div>
                    <Shortcuts editMode={this.state.editMode} />
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
