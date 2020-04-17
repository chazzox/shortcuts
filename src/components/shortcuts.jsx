import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrement, increment } from '../redux/store';

class ShortCuts extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <div className={'row'}>
                            <button
                                className={'button'}
                                aria-label="Increment value"
                                onClick={() => this.props.increment()}
                            >
                                +
                            </button>
                            <span className={'value'}>{this.props.count}</span>
                            <button
                                className={'button'}
                                aria-label="Decrement value"
                                onClick={() => this.props.decrement()}
                            >
                                -
                            </button>
                        </div>
                    </div>
                    <p>the above buttons effect the state of the webapp</p>
                    <p>come back later for implementation of redux into the system</p>
                </header>
            </div>
        );
    }
}
// comments needed
const mapStateToProps = (state) => {
    return {
        count: state.counter.value
    };
};

const mapDispatchToProps = () => {
    return {
        increment,
        decrement
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(ShortCuts);
