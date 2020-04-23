import React from 'react';
import { connect } from 'react-redux';

import Popup from './popupWrapper';
import { deleteObject } from '../../redux/store';

class DeleteModal extends React.Component {
    render() {
        return (
            <Popup>
                <div className="modal">
                    <div
                        className="editButton"
                        onClick={() => {
                            this.props.deleteObject({
                                type: this.props.type,
                                objectId: this.props.id,
                                containerId: this.props.containerId
                            });
                            this.props.close();
                        }}
                    >
                        Delete
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
        deleteObject
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(DeleteModal);
