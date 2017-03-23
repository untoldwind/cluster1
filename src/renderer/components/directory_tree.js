import {h, Component} from 'preact';
import {Tree, TreeNode} from 'litening';

const DirectoryTreeNode = ({
    directories,
    directoryId,
    ...props
}) => {
    const directory = directories[directoryId];

    if (directory.children.length == 0) {
        return (<TreeNode label={directory.name} leaf={true} directoryId={directoryId} { ...props }/>)
    }

    return (
        <TreeNode label={directory.name} directoryId={directoryId} { ...props }>
            {directory.children.map(directoryId => (<DirectoryTreeNode directories={directories} directoryId={directoryId}/>))}
        </TreeNode>
    )
}

export const DirectoryTree = ({
    directories,
    ...props
}) => {
    const root = directories['_root_'];

    if (!root) {
        return (<div/>);
    }

    const onNodeClick = (event, p1) => {
      console.log(event);
      console.log(p1);
    }
    return (
        <Tree label="Directories" onNodeClick={onNodeClick} {...props}>
            {root.children.map(directoryId => (<DirectoryTreeNode directories={directories} directoryId={directoryId}/>))}
        </Tree>
    );
}
