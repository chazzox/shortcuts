import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export const AddLink = styled.button`
    ${(props) => (props.editMode ? 'display: inline;' : 'display:none;')}
    &:hover {
        ${(props) => `max-width:${props.maxWidth}%;`}
    }
`;

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.state = {
            popupRoute: document.getElementById('modal'),
            appRoute: document.getElementById('root')
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
        return ReactDOM.createPortal(<div className="modalWrapper">{this.props.children}</div>, this.el);
    }
}
