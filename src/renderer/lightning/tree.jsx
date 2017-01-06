import {h, Component, cloneElement} from 'preact';
import classnames from 'classnames';

export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.renderTreeNode = this.renderTreeNode.bind(this);
    }

    renderTreeNode(tnode) {
        const {onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick} = this.props;
        return cloneElement(tnode, {
            level: 1,
            onNodeClick,
            onNodeToggle,
            onNodeLabelClick,
            toggleOnNodeClick
        });
    }

    render({
        className,
        label,
        children,
        ...props
    }) {
        const treeClassNames = classnames(className, 'slds-tree-container');
        return (
            <div className={treeClassNames} role='application' { ...props }>
                {label
                    ? <h4 className='slds-text-heading--label'>{label}</h4>
                    : null}
                <ul className='slds-tree' role='tree'>
                    {children.map(this.renderTreeNode)}
                </ul>
            </div>
        );
    }
}
