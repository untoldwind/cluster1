import {h, Component} from 'preact';
import {Tree, TreeNode} from 'litening';

const DirectoryTreeNode = ({ directories, directory }) => {

}

export const DirectoryTree = ({ directories }) => {
  console.log(directories);
  if(!root) {
    return ( <div/> );
  }
  return (
    <Tree>
      <TreeNode label="bla">
      <TreeNode label="blub3" leaf={true}>
      </TreeNode>
      </TreeNode>
      <TreeNode label="bla2">
      <TreeNode label="blub2" leaf={true}>
      </TreeNode>
      </TreeNode>
    </Tree>
  );
}
