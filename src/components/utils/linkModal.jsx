import React from 'react';
import { connect } from 'react-redux';

import Popup from './popupWrapper';
import { updateObject, addObject } from '../../redux/store';

class LinkModal extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name: this.props.addMode ? '' : this.props.config.links[this.props.id].name,
            url: this.props.addMode ? '' : this.props.config.links[this.props.id].url,
            urlIcon: this.props.addMode ? '' : this.props.config.links[this.props.id].linkIconUrl
        };
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
    render() {
        return (
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
                    <div
                        className="editButton"
                        onClick={() => {
                            if (this.props.addMode)
                                this.props.addObject({
                                    type: 'link',
                                    parentId: this.props.parentId,
                                    content: {
                                        name: this.state.name,
                                        url: this.state.url,
                                        linkIconUrl: this.state.urlIcon
                                    }
                                });
                            if (!this.props.addMode)
                                this.props.updateObject({
                                    id: this.props.id,
                                    type: 'link',
                                    content: {
                                        name: this.state.name,
                                        url: this.state.url,
                                        linkIconUrl: this.state.urlIcon
                                    }
                                });
                            this.props.close();
                        }}
                    >
                        Save Changes
                    </div>
                    <div className="editButton" onClick={() => this.props.close()}>
                        Cancel
                    </div>
                </div>
            </Popup>
        );
    }
}

// linking global values
const mapStateToProps = (state) => {
    return {
        editMode: state.userSlice.value,
        config: state.userSlice.config
    };
};

// linking update functions
const mapDispatchToProps = () => {
    return {
        updateObject,
        addObject
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(LinkModal);
