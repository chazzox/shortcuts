import React from 'react';
import { connect } from 'react-redux';
import * as lodash from 'lodash';

import { update } from '../../redux/store';
import Popup, { AddLink } from './popupWrapper';

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
    handleShow() {
        this.setState({ open: true });
    }
    handleHide() {
        this.setState({ name: '', url: '', urlIcon: '', open: false });
    }
    addLink() {
        const targetBox = this.props.config.boxes[this.props.typeId];
        const targetBoxLinkOrder = Array.from(targetBox.linkOrder);

        const linkName = `link-${lodash.size(this.props.config.links)}`;

        let newBoxLinkOrder = targetBoxLinkOrder;
        newBoxLinkOrder.push(linkName);

        this.props.update({
            ...this.props.config,
            boxes: { ...this.props.config.boxes, [this.props.typeId]: { ...targetBox, linkOrder: newBoxLinkOrder } },
            links: {
                ...this.props.config.links,
                [linkName]: {
                    id: linkName,
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
                <AddLink
                    onClick={() => this.handleShow()}
                    editMode={this.props.editMode}
                    className="addButton"
                    maxWidth={this.props.maxWidth}
                >
                    Add New {this.props.type}
                </AddLink>
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
