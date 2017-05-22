import * as React from 'react';
import { Classes, ITreeNode, Tooltip, Tree, TreeEventHandler, Dialog, Button } from "@blueprintjs/core";
import { remote } from 'electron';
const { Menu, MenuItem } = remote;

class FileTree extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      nodes: [
        {
          iconName: "pt-icon-inbox",
          label: "Inbox"
        },
        {
          iconName: "folder-close",
          isExpanded: true,
          label: <Tooltip content="I'm a folder <3">Folder 1</Tooltip>,
          childNodes: [
            { iconName: "document", label: "Item 0", secondaryLabel: "1231" },
            { iconName: "pt-icon-tag", label: "longLabel" },
            {
              hasCaret: true,
              iconName: "pt-icon-folder-close",
              label: <Tooltip content="foo">Folder 2</Tooltip>,
              childNodes: [
                { label: "No-Icon Item" },
                { iconName: "pt-icon-tag", label: "Item 1" },
                {
                  hasCaret: true, iconName: "pt-icon-folder-close", label: "Folder 3",
                  childNodes: [
                    { iconName: "document", label: "Item 0" },
                    { iconName: "pt-icon-tag", label: "Item 1" },
                  ]
                },
              ]
            },
          ]
        },
      ]
    };

    const menu = new Menu();
    menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
    this.menu = menu;

    this.forEachNode = this.forEachNode.bind(this);
  }

  renderDialog() {
    return (
            <div>
                <Button onClick={this.toggleDialog} text="Show dialog" />
                <Dialog
                    iconName="inbox"
                    isOpen={this.state.isOpen}
                    onClose={this.toggleDialog}
                    title="Dialog header"
                >
                    <div className="pt-dialog-body">
                        Some content
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button text="Secondary" />
                            <Button
                                intent={Intent.PRIMARY}
                                onClick={this.toggleDialog}
                                text="Primary"
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
  }

  forEachNode(nodes, callback) {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }

  render() {
    return (
      <Tree
        contents={this.state.nodes}
        onNodeClick={this.handleNodeClick.bind(this)}
        onNodeCollapse={this.handleNodeCollapse.bind(this)}
        onNodeExpand={this.handleNodeExpand.bind(this)}
        onNodeContextMenu={this.renderContextMenu.bind(this)}
        className={Classes.ELEVATION_0} />
    );
  }

  renderContextMenu(nodeData, _nodePath, e) {
    nodeData.isSelected = true;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, (n) => n.isSelected = false);
    }
    this.setState(this.state);
    this.menu.popup(remote.getCurrentWindow());

  }

  handleNodeClick(nodeData, _nodePath, e) {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, (n) => n.isSelected = false);
    }
    nodeData.isSelected = originallySelected == null ? true : !originallySelected;
    nodeData.isSelected = true;
    this.setState(this.state);
  }

  handleNodeCollapse(nodeData) {
    nodeData.isExpanded = false;
    this.setState(this.state);
  }

  handleNodeExpand(nodeData) {
    nodeData.isExpanded = true;
    this.setState(this.state);
  }

}

export default FileTree;
