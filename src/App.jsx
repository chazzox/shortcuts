import React, { Component } from 'react';
import { connect } from 'react-redux';

import Shortcuts from './components/shortcuts';
import { toggle, update } from './redux/store';

class App extends Component {
    render() {
        return (
            <div className="containerOfAll">
                <div className="nav">
                    <h1 className="navTitle">
                        SHORTCUTS {this.props.editMode ? ' - editmode' : ''}
                    </h1>
                    <div className="navIconContainer">
                        <h1 className="yeah">made for gamers, by gamers</h1>
                        <button
                            className="editButton"
                            onClick={() => {
                                // editMode toggle, use this props to do conditional styling/rendering
                                // in any main component, the value: this.props.editMode will be available for use,
                                // in shortcuts please use this.props.editMode
                                this.props.toggle();
                            }}
                        >
                            {this.props.editMode ? 'save' : 'edit'}
                        </button>
                    </div>
                </div>
                <div>
                    <Shortcuts editMode={this.props.editMode} />
                </div>
            </div>
        );
    }
}

// comments needed
const mapStateToProps = (state) => {
    return {
        editMode: state.userSlice.value,
        config: state.userSlice.config
    };
};

const mapDispatchToProps = () => {
    return {
        toggle,
        update
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
