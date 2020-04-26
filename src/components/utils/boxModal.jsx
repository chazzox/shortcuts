import React from 'react';
import { connect } from 'react-redux';

import Popup, { ErrorContainer } from './modalUtils';
import { updateObject, addObject } from '../../redux/store';
import validation from './validation';

class BoxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: this.props.addMode ? '' : this.props.config.boxes[this.props.id].name, errors: [] };
        this.onChange = this.onChange.bind(this);
    }
    onChange(val) {
        this.setState({ name: val.target.value });
    }
    render() {
        return (
            <Popup>
                <div className="modal">
                    <input type="text" className="userInput" value={this.state.name} onChange={this.onChange} />
                    {this.state.errors.map((error, index) => (
                        <ErrorContainer key={index} errorMessage={error} />
                    ))}
                    <div
                        className="buttonGeneral"
                        onClick={() => {
                            const errorList = [];
                            if (validation.isEmpty([this.state.name])) {
                                errorList.push('error message for stuff being empty');
                            }
                            if (errorList.length !== 0) {
                                this.setState({ errors: errorList });
                                return;
                            }
                            // running add/edit function based on the mode passed a prop
                            if (this.props.addMode)
                                this.props.addObject({
                                    type: 'box',
                                    parentId: this.props.parentId,
                                    content: {
                                        name: this.state.name,
                                        type: 'links',
                                        linkOrder: []
                                    }
                                });
                            else
                                this.props.updateObject({
                                    id: this.props.id,
                                    type: 'box',
                                    content: {
                                        name: this.state.name
                                    }
                                });
                            this.props.close();
                        }}
                    >
                        Update Box
                    </div>
                    <div className="buttonGeneral" onClick={() => this.props.close()}>
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
        updateObject,
        addObject
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(BoxModal);
