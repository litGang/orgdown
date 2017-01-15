import React, { Component, PropTypes } from "react";
import Tile from "grommet/components/Tile";
import FolderIcon from 'grommet/components/icons/base/Folder';
import NotesIcon from 'grommet/components/icons/base/Notes';

class NodeItem extends Component {

    _onDragStart(item) {
        return (event) => {
            console.log(item, this)
        }
    }

    _onDragOver(item) {
        return (event) => {
            event.preventDefault();
            console.log(item)
        }
    }

    _onDragEnter(item) {
        return (event) => {
            console.log(item)
        }
    }

    _onDrop(item) {
        return (event) => {
            console.log(item)
        }
    }

    render() {
        const {node} = this.props;
        return (
            <Tile wide={false} onDragStart={this._onDragStart(node)} onDragOver={this._onDragOver(node)}
                onDragEnter={this._onDragEnter(node)} onDrop={this._onDrop(node)}
                onClick={this.props.onClick}
                draggable={true} align="center" pad="small" direction="column" size="small"
                selected={this.props.selected}
                a11yTitle={`View ${node.name} Virtual Machine`}>

                {node.type == 'folder' ? <FolderIcon size="large" /> : <NotesIcon size="large" />}
                <strong style={{ fontSize: 12 }}>{node.name}</strong>
            </Tile>
        )
    }
}

NodeItem.propTypes = {
    node: PropTypes.object
};

export default NodeItem