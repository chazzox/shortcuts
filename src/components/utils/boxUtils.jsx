import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { update } from '../../redux/store';
import Popup from './popupWrapper';
import randomKey from './randomKey';
import validation from './validation';

export const AddObject = styled.button`
    padding-top: 10px;
    padding-bottom: 10px;
    display: inline;
    &:hover {
        ${(props) => `max-width:${props.maxWidth}%;`}
    }
`;

class AddNewBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            boxName: '',
            error: ''
        };
    }
    handleShow() {
        this.setState({
            open: true,
            boxName: this.props.inspectMode ? this.props.config.boxes[this.props.typeId].name : ''
        });
    }
    handleHide() {
        this.setState({ boxName: '', open: false });
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
    addBox() {
        const targetColumn = this.props.config.columns[this.props.typeId];
        const targetColumnBoxOrder = Array.from(targetColumn.boxOrder);
        const boxId = `box-${randomKey()}`;
        let newColumnBoxOrder = targetColumnBoxOrder;
        newColumnBoxOrder.push(boxId);
        //validation
        // check empty
        if (validation.isEmpty([this.state.boxName])) {
            this.setState({ error: 'lol noob enter a thing' });
            return;
        }
        // check within length range
        if (!validation.withinRange(2, 20, Object.keys(this.state.boxName).length)) {
            this.setState({ error: 'lol noob y to big/smoll' });
            return;
        }
        // check is unique
        // boxName list copy
        // delete current el
        // send to func
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
                        value={this.state.boxName}
                        onChange={(event) => this.handleChange(0, event.target.value)}
                    />
                    <div className="errorContainer">{this.state.error}</div>
                    <div
                        className="editButton"
                        onClick={() => (this.props.inspectMode ? this.saveChanges() : this.addBox())}
                    >
                        Add Box
                    </div>
                    <div className="editButton" onClick={() => this.handleHide()}>
                        Cancel
                    </div>
                </div>
            </Popup>
        ) : null;
        return this.props.editMode ? (
            this.props.inspectMode ? (
                <div style={{ display: 'inline-block' }}>
                    <button className="editLinkButton" onClick={() => this.handleShow()}></button>
                    {modal}
                </div>
            ) : (
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
            )
        ) : null;
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
