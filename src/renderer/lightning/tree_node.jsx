import {h, Component, cloneElement} from 'preact';
import classnames from 'classnames';
import {Button} from './button';
import Spinner from './spinner';

export default class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: this.props.defaultOpened
        };
        this.onToggle = this.onToggle.bind(this);
        this.onLabelClick = this.onLabelClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.renderTreeItem = this.renderTreeItem.bind(this);
    }

    onToggle(e) {
        const {onToggle, onNodeToggle} = this.props;
        if (onToggle) {
            onToggle(e, this.props);
        }
        if (onNodeToggle) {
            onNodeToggle(e, this.props);
        }
        this.setState({
            opened: !this.state.opened
        });
    }

    onLabelClick(e) {
        const {onLabelClick, onNodeLabelClick} = this.props;
        if (onLabelClick) {
            onLabelClick(e, this.props);
        }
        if (onNodeLabelClick) {
            onNodeLabelClick(e, this.props);
        }
    }

    onClick(e) {
        const {onClick, onNodeClick, toggleOnNodeClick} = this.props;
        if (onClick) {
            onClick(e, this.props);
        }
        if (onNodeClick) {
            onNodeClick(e, this.props);
        }
        if (toggleOnNodeClick) {
            this.onToggle(e);
        }
    }

    renderTreeItem({
        className,
        label,
        icon = 'chevronright',
        loading,
        selected,
        leaf,
        isOpened,
        children,
        itemRender,
        ...props
    }) {
        const itmClassNames = classnames(className, 'slds-tree__item', {
            'slds-is-open': isOpened,
            'slds-is-selected': selected
        });
        return (
            <div className={itmClassNames} onClick={this.onClick.bind(this)} style={{
                position: 'relative'
            }} { ...props }>
                {loading
                    ? <Spinner container={false} size='small' className='slds-m-right--x-small' style={{
                            position: 'static',
                            marginTop: 14,
                            marginLeft: -2
                        }}/>
                    : !leaf
                        ? <Button className='slds-m-right--small' aria-controls='' type='icon-bare' icon={icon} iconSize='small' onClick={this.onToggle.bind(this)}/>
                        : null}
                <a className='slds-truncate' tabIndex={-1} role='presentation' onClick={this.onLabelClick.bind(this)}>
                    {itemRender
                        ? itemRender(itemProps)
                        : label}
                </a>
                {leaf
                    ? children
                    : null}
            </div>
        );
    }

    renderChildNode(level, tnode) {
        const {onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick} = this.props;
        return cloneElement(tnode, {level, onNodeClick, onNodeToggle, onNodeLabelClick, toggleOnNodeClick});
    }

    render({
        defaultOpened,
        opened,
        leaf,
        level,
        children,
        ...props
    }) {
        const isOpened = typeof opened !== 'undefined'
            ? opened
            : typeof this.state.opened !== 'undefined'
                ? this.state.opened
                : defaultOpened;
        const grpClassNames = classnames('slds-tree__group', {
            'slds-nested': !leaf,
            'is-expanded': isOpened,
            'slds-show': isOpened,
            'slds-hide': !isOpened
        });
        const itemProps = {
            leaf,
            isOpened,
            children,
            ...props
        };
        if (leaf) {
            return (
                <li role='treeitem' aria-level={level}>
                    {this.renderTreeItem(itemProps)}
                </li>
            );
        }

        return (
            <li role='treeitem' aria-level={level} aria-expanded={isOpened}>
                {this.renderTreeItem(itemProps)}
                <ul className={grpClassNames} role='group'>
                    {children.map(this.renderChildNode.bind(this, level + 1))}
                </ul>
            </li>
        );
    }
}
