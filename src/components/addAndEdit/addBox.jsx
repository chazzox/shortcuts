import React from 'react';
import { connect } from 'react-redux';

import { update } from '../../redux/store';
import Popup, { AddObject } from './popupWrapper';

class AddNewBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, boxName: this.props.inspectMode ? this.props.boxName : '' };
    }
    ObjectLength(object) {
        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    }
    handleShow() {
        this.setState({ boxName: '', open: true });
    }
    addBox() {
        const targetColumn = this.props.config.columns[this.props.typeId];
        const targetColumnBoxOrder = Array.from(targetColumn.boxOrder);

        const boxId = `link-${this.ObjectLength(this.props.config.links)}`;

        let newColumnBoxOrder = targetColumnBoxOrder;
        newColumnBoxOrder.push(boxId);

        this.props.update({
            ...this.props.config,
            columns: {
                ...this.props.config.columns,
                [this.props.typeId]: { ...targetColumn, boxOrder: newColumnBoxOrder }
            },
            boxes: {
                ...this.props.config.boxes,
                [boxId]: {
                    id: boxId,
                    name: this.state.boxName,
                    type: 'links',
                    linkOrder: []
                }
            }
        });
        this.handleHide();
    }
    handleHide() {
        this.setState({ boxName: '', open: false });
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
    render() {
        let modal = this.state.open ? (
            <Popup>
                <div className="modal">
                    <input
                        type="text"
                        className="userInput"
                        value={this.state.name}
                        onChange={(event) => this.handleChange(0, event.target.value)}
                    />
                    <div className="editButton" onClick={() => this.addBox()}>
                        Add Box
                    </div>
                    <div className="editButton" onClick={() => this.handleHide()}>
                        Cancel
                    </div>
                </div>
            </Popup>
        ) : null;
        return (
            <div className="addButtonWrapper">
                <AddObject
                    onClick={() => this.handleShow()}
                    editMode={this.props.editMode}
                    className="addButton"
                    maxWidth={this.props.maxWidth}
                >
                    Add New {this.props.type}
                </AddObject>
                {modal}
            </div>
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
        update
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(AddNewBox);
