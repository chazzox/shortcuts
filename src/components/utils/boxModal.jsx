import React from 'react';
import { connect } from 'react-redux';

import Popup from './popupWrapper';
import { updateObject } from '../../redux/store';

class BoxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { boxName: this.props.config.boxes[this.props.id].name, error: '' };
        this.onChange = this.onChange.bind(this);
    }
    onChange(val) {
        this.setState({ boxName: val.target.value });
    }
    render() {
        return (
            <Popup>
                <div className="modal">
                    <input type="text" className="userInput" value={this.state.boxName} onChange={this.onChange} />
                    {this.state.error ? <div className="errorContainer">{this.state.error}</div> : null}
                    <div
                        className="editButton"
                        onClick={() => {
                            this.props.updateObject({
                                id: this.props.id,
                                type: 'box',
                                content: { name: this.state.boxName }
                            });
                            this.props.close();
                        }}
                    >
                        Update Box
                    </div>
                    <div className="editButton" onClick={() => this.props.close()}>
                        Cancel
                    </div>
                </div>
            </Popup>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editMode: state.userSlice.value,
        config: state.userSlice.config
    };
};

const mapDispatchToProps = () => {
    return {
        updateObject
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(BoxModal);
