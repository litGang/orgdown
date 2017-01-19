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
                    isExpanded: true,
                    label: <Tooltip content="I'm a folder <3">Folder 1</Tooltip>,
                    childNodes: [
                        { iconName: "document", label: "Item 0", secondaryLabel: '12313' },
                        { iconName: "pt-icon-tag", label: '123123' },
                        {
                            hasCaret: true,
                            iconName: "pt-icon-folder-close",
                            childNodes: [
                                { label: "No-Icon Item" },
                                { iconName: "pt-icon-tag", label: "Item 1" },
                                {
                                    hasCaret: true, iconName: "pt-icon-folder-close", label: "Folder 3",
                                    childNodes:  [
                                        { iconName: "document", label: "Item 0" },
                                        { iconName: "pt-icon-tag", label: "Item 1" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    }
    

    render() {
        return (
            <div className='orgdown-sidebar'>
                <h1>SideBar</h1>
                <Tree
                contents={this.state.nodes}
                onNodeClick={() => console.log('onNodeClick')}
                onNodeCollapse={() => console.log('onNodeCollapse')}
                onNodeExpand={() => console.log('onNodeExpand')}
                className={Classes.ELEVATION_0}
            />
            </div>
        )
    }
}

export default SideBar;