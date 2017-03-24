import {h, Component} from 'preact';
import {Tree, TreeNode} from 'litening';
import {selectDirectory} from '../commands';

const DirectoryTreeNode = ({
    directories,
    directoryId,
    currentDirectoryId,
    ...props
}) => {
    const directory = directories[directoryId];

    if (directory.children.length == 0) {
        return (<TreeNode label={directory.name} leaf={true} selected={directoryId === currentDirectoryId} directoryId={directoryId} { ...props }/>)
    }

    return (
        <TreeNode label={directory.name} selected={directoryId === currentDirectoryId} directoryId={directoryId} { ...props }>
            {directory
                .children
                .map(directoryId => (<DirectoryTreeNode directories={directories} directoryId={directoryId} currentDirectoryId={currentDirectoryId}/>))}
        </TreeNode>
    )
}

export const DirectoryTree = ({
    directories,
    currentDirectoryId,
    ...props
}) => {
    const root = directories['_root_'];

    if (!root) {
        return (<div/>);
    }

    const onNodeClick = (event, item) => {
        console.log(event);
        selectDirectory(item.directoryId);
    }
    return (
        <Tree label="Directories" onNodeClick={onNodeClick} {...props}>
            {root
                .children
                .map(directoryId => (<DirectoryTreeNode directories={directories} directoryId={directoryId} currentDirectoryId={currentDirectoryId}/>))}
        </Tree>
    );
}
