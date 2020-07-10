import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { updateConfig } from '../redux/store';
import ObjectUtils from './utils/objectUtils';

// when in editMode, we don't want the link to appear while we move the links around
// so we only allow the link container to have the hover css when edit mode isn't on

class Link extends React.Component {
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
						<div
							className={`linkContainer ${this.props.editMode ? `` : `editHover`}`}
							// this props tells our drag and drop library what we're actually dragging around
							{...provided.draggableProps}
							// drag handle props is the component we use to actually drag the link, you could
							// add a handle by placing the
							{...provided.dragHandleProps}
							ref={provided.innerRef}
							style={{ backgroundImage: 'url(' + this.props.link.linkIconUrl + ')' }}
						>
							<div className="linkTitle">{this.props.link.name}</div>
							<div className="linkUrl">{this.cleanupURL(this.props.link.url)}</div>
							<ObjectUtils
								id={this.props.link.id}
								editMode={this.props.editMode}
								type="link"
								containerId={this.props.boxContainerId}
							/>
							{provided.placeholder}
						</div>
					</a>
				)}
			</Draggable>
		);
	}
}

// linking global values
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.isEditMode,
		config: state.userSlice.config
	};
};

// linking update functions
const mapDispatchToProps = () => {
	return {
		updateConfig
	};
};

export default connect(mapStateToProps, mapDispatchToProps())(Link);
