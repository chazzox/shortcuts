import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
const AddLink = styled.div`
    ${(props) => (props.editMode ? 'display: block;' : 'display:none;')}
    &:hover {
        ${(props) => `max-width:${props.maxWidth}%;`}
    }
`;
export default class AddNew extends Component {
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
                    <div>add stuff</div>
                    <div className="editButton" onClick={() => this.handleHide()}>
                        Hide modal
                    </div>
                </div>
            </Popup>
        ) : null;
        return (
            <div className=".editButtonWrapper">
                <AddLink
                    onClick={() => this.handleShow()}
                    editMode={this.props.editMode}
                    className="addObject"
                    maxWidth={this.props.maxWidth}
                >
                    Add New Link
                </AddLink>
                {modal}
            </div>
        );
    }
}
class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.state = {
            popupRoute: document.getElementById('popup'),
            appRoute: document.getElementsByClassName('containerOfAll')[0]
        };
    }
    componentDidMount() {
        this.state.appRoute.classList.add('MODAL_OPEN_CLASS');
        this.state.popupRoute.appendChild(this.el);
    }
    componentWillUnmount() {
        this.state.appRoute.classList.remove('MODAL_OPEN_CLASS');
        this.state.popupRoute.removeChild(this.el);
    }
    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}
