import React from 'react';
import { connect } from 'react-redux';

import { update } from '../../redux/store';
import Popup, { AddObject } from './popupWrapper';

class AddNewLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, name: '', url: '', urlIcon: '' };
    }

    // we use this function to update the component states when the user
    handleChange(index, value) {
        switch (index) {
            case 0:
                this.setState({ name: value });
                break;
            case 1:
                this.setState({ url: value });
                break;
            case 2:
                this.setState({ urlIcon: value });
                break;
            default:
                console.log('how');
                break;
        }
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
        this.setState({ open: true });
    }
    handleHide() {
        this.setState({ name: '', url: '', urlIcon: '', open: false });
    }
    addLink() {
        const targetBox = this.props.config.boxes[this.props.typeId];
        const targetBoxLinkOrder = Array.from(targetBox.linkOrder);

        const linkId = `link-${this.ObjectLength(this.props.config.links)}`;

        let newBoxLinkOrder = targetBoxLinkOrder;
        newBoxLinkOrder.push(linkId);

        this.props.update({
            ...this.props.config,
            boxes: { ...this.props.config.boxes, [this.props.typeId]: { ...targetBox, linkOrder: newBoxLinkOrder } },
            links: {
                ...this.props.config.links,
                [linkId]: {
                    id: linkId,
                    name: this.state.name,
                    url: this.state.url,
                    linkIconUrl: this.state.urlIcon
                }
            }
        });
        this.handleHide();
    }
    render() {
        let modal = this.state.open ? (
            <Popup>
                <div className="modal">
                    <div>
                        <input
                            type="text"
                            className="userInput"
                            value={this.state.name}
                            onChange={(event) => this.handleChange(0, event.target.value)}
                        />
                        <input
                            type="text"
                            className="userInput"
                            value={this.state.url}
                            onChange={(event) => this.handleChange(1, event.target.value)}
                        />
                        <input
                            type="text"
                            className="userInput"
                            value={this.state.urlIcon}
                            onChange={(event) => this.handleChange(2, event.target.value)}
                        />
                    </div>
                    <div className="editButton" onClick={() => this.addLink()}>
                        Add New
                    </div>
                    <div className="editButton" onClick={() => this.handleHide()}>
                        cancel
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

export default connect(mapStateToProps, mapDispatchToProps())(AddNewLink);
