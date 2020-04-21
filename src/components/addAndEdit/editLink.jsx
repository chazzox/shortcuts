import React from 'react';
import { connect } from 'react-redux';

import Popup from '../utils/popupWrapper';
import { update } from '../../redux/store';

class EditLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: this.props.config.links[this.props.id].name,
            url: this.props.config.links[this.props.id].url,
            urlIcon: this.props.config.links[this.props.id].linkIconUrl
        };
    }
    saveChanges() {
        this.props.update({
            ...this.props.config,
            links: {
                ...this.props.config.links,
                [this.props.id]: {
                    id: this.props.id,
                    name: this.state.name,
                    url: this.state.url,
                    linkIconUrl: this.state.urlIcon
                }
            }
        });
        this.handleHide();
    }
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

export default connect(mapStateToProps, mapDispatchToProps())(EditLink);
