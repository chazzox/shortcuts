import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styled from 'styled-components';
import './link.scss';

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
            : ``}
`;

export default class Link extends Component {
    cleanupURL(url) {
        url = url.replace(/(.*?:\/\/)|(www\.)/g, '').replace(/\/.*/, '');
        return url;
    }
    render() {
        return (
            <Draggable
                isDragDisabled={!this.props.editMode}
                draggableId={this.props.link.id}
                index={this.props.index}
            >
                {(provided) => (
                    <a
                        className="linkLink"
                        // compiler complains if we have href=null, the next comment removes the complaint
                        // eslint-disable-next-line
                        href={this.props.editMode ? null : this.props.link.url}
                    >
                        <LinkContainer
                            editMode={this.props.editMode}
                            icon={this.props.link.linkIconUrl}
                            className="linkContainer"
                            // this props tells our drag and drop library what we're actually dragging around
                            {...provided.draggableProps}
                            // drag handle props is the component we use to actually drag the ling, you could
                            // add a handle by placing the
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div className="linkTitle">{this.props.link.name}</div>
                            <div className="linkUrl">
                                {this.cleanupURL(this.props.link.url)}
                            </div>
                            {provided.placeholder}
                        </LinkContainer>
                    </a>
                )}
            </Draggable>
        );
    }
}
