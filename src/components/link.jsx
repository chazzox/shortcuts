import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { update } from '../redux/store';
import './link.scss';
import DeleteObject from './deleteObject';

// when in editMode, we don't want the link to appear while we move the links around
// so we only allow the link container to have the hover css when edit mode isn't on
const LinkContainer = styled.div`
    ${(props) => {
        return `background-image:url(${props.icon});`;
    }}
    ${(props) =>
        !props.editMode
            ? `&:hover {
        padding-top: 20px;
        padding-bottom: 20px;
        min-height: 65px;
        background-size: 55px;
        padding-left: 90px;
        .linkUrl {
            font-size: 13pt;
            opacity: 1;
        }
    }`
            : `  transition: none;`}
`;

class Link extends Component {
    cleanupURL(url) {
        url = url.replace(/(.*?:\/\/)|(www\.)/g, '').replace(/\/.*/, '');
        return url;
    }
    render() {
        return (
            <Draggable isDragDisabled={!this.props.editMode} draggableId={this.props.link.id} index={this.props.index}>
                {(provided) => (
                    // compiler complains if we have href=null, the next comment removes the complaint
                    // eslint-disable-next-line
                    <a className="linkLink" href={this.props.editMode ? '#' : this.props.link.url}>
                        <LinkContainer
                            editMode={this.props.editMode}
                            icon={this.props.link.linkIconUrl}
                            className="linkContainer"
                            // this props tells our drag and drop library what we're actually dragging around
                            {...provided.draggableProps}
                            // drag handle props is the component we use to actually drag the link, you could
                            // add a handle by placing the
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            {/* link content */}
                            <div className="linkTitle">{this.props.link.name}</div>
                            <div className="linkUrl">{this.cleanupURL(this.props.link.url)}</div>
                            <DeleteObject
                                type="link"
                                id={this.props.link.id}
                                objectContainerId={this.props.boxContainerId}
                            />
                            {provided.placeholder}
                        </LinkContainer>
                    </a>
                )}
            </Draggable>
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
        update
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Link);
