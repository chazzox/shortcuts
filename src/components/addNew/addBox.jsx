import React from 'react';
import { connect } from 'react-redux';

import { update } from '../../redux/store';
import Popup, { AddLink } from './popupWrapper';

class AddNewBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
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
                    <div>new</div>
                    <div className="editButton" onClick={() => this.handleHide()}>
                        Hide modal
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
        editMode: state.userSlice.value
    };
};

const mapDispatchToProps = () => {
    return {
        update
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(AddNewBox);
