import React, { Component, PropTypes } from "react";
import { Classes, ITreeNode, Tooltip, Tree } from "@blueprintjs/core";

class SideBar extends Component {
    constructor(prop, context) {
        super(prop, context)
        this.state = {
            nodes: [
                {
                    hasCaret: true,
                    iconName: "folder-close",
                    label: "Folder 0",
                },
                {
                    iconName: "folder-close",
                    label: 'Java',
                    isSelected: true,
                    isExpanded: true,
                    childNodes: [{
                        iconName: 'folder-close',
                        label: 'JVM调优'
                    }]
                }
            ],
        }
    }


    render() {
        return (
            <div className='orgdown-sidebar'>
                <div className='logo'>
                    Orgdown1
                </div>
                <Tree
                    contents={this.state.nodes}
                    onNodeClick={(node, event) => console.log(node, event)}
                    onNodeCollapse={() => console.log('onNodeCollapse')}
                    onNodeExpand={() => console.log('onNodeExpand')}
                    className={Classes.ELEVATION_0}
                />
            </div>
        )
    }
}

export default SideBar;
