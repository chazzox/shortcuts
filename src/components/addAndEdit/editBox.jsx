import React from 'react';
import { connect } from 'react-redux';

import Popup from '../utils/popupWrapper';
import { update } from '../../redux/store';

class EditBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            boxName: this.props.config.boxes[this.props.id].name
        };
    }
    saveChanges() {
        this.props.update({
            ...this.props.config,
            boxes: {
                ...this.props.config.boxes,
                [this.props.id]: {
                    ...this.props.config.boxes[this.props.id],
                    name: this.state.boxName
                }
            }
        });
        this.handleHide();
    }
    handleChange(index, value) {
        switch (index) {
            case 0:
                this.setState({ boxName: value });
                break;

            default:
                console.log('how');
                break;
        }
    }
    handleShow() {
        this.setState({ open: true });
    }
    handleHide() {
        this.setState({ open: false });
    }
    render() {
        let modal = this.state.open ? (
            <Popup>
                <div className="modal">
                    <div>
                        <input
                            type="text"
                            className="userInput"
                            value={this.state.boxName}
                            onChange={(event) => this.handleChange(0, event.target.value)}
                        />
                    </div>
                    <div className="editButton" onClick={() => this.saveChanges()}>
                        Save Changes
                    </div>
                    <div className="editButton" onClick={() => this.handleHide()}>
                        Cancel
                    </div>
                </div>
            </Popup>
        ) : null;
        return this.props.editMode ? (
            <div style={{ display: 'inline-block' }}>
                <button className="editLinkButton" onClick={() => this.handleShow()}></button>
                {modal}
            </div>
        ) : null;
    }
}

const mapStateToProps = (state) => {
    return {
        editMode: state.userSlice.value,
        config: state.userSlice.config
    };
};

// linking update functions
const mapDispatchToProps = () => {
    return {
        update
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(EditBox);
