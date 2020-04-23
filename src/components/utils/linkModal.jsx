import React from 'react';
import { connect } from 'react-redux';

import Popup from './popupWrapper';
import { updateObject } from '../../redux/store';

class LinkModal extends React.Component {
    render() {
        return (
            <Popup>
                <div className="modal">test</div>
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
        updateObject
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(LinkModal);
