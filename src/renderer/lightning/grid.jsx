import {h, Component, cloneElement} from 'preact';
import classnames from 'classnames';

export function Grid({
    className,
    frame,
    vertical,
    children,
    tag,
    ...props
}) {
    const gridClassNames = classnames(className, 'slds-grid', vertical
        ? 'slds-grid--vertical'
        : null, frame
        ? 'slds-grid--frame'
        : null);
    const Tag = tag || 'div';
    return (
        <Tag className={gridClassNames} {...props}>
            {children}
        </Tag>
    );
}

function adjustCols(colNum, large) {
  if (colNum > 6) {
    return large ? 12 : 6;
  }
  return colNum;
}

export function Col({
    className,
    padded,
    align,
    noFlex,
    order,
    orderSmall,
    orderMedium,
    orderLarge,
    cols,
    colsSmall,
    colsMedium,
    colsLarge,
    totalCols,
    totalColsSmall,
    totalColsMedium,
    totalColsLarge,
    children,
    ...props
}) {
    const rowClassNames = classnames(className, padded
        ? `slds-col--padded${ /^ (medium | large)$ /.test(padded)
            ? `-${padded}`
            : ''}`
        : 'slds-col', align
        ? `slds-align-${align}`
        : null, noFlex
        ? 'slds-no-flex'
        : null, order
        ? `slds-order--${order}`
        : null, orderSmall
        ? `slds-small-order--${orderSmall}`
        : null, orderMedium
        ? `slds-medium-order--${orderMedium}`
        : null, orderLarge
        ? `slds-large-order--${orderLarge}`
        : null, cols && totalCols
        ? `slds-size--${cols}-of-${adjustCols(totalCols, true)}`
        : null, colsSmall && totalColsSmall
        ? `slds-small-size--${colsSmall}-of-${adjustCols(totalColsSmall)}`
        : null, colsMedium && totalColsMedium
        ? `slds-medium-size--${colsMedium}-of-${adjustCols(totalColsMedium)}`
        : null, colsLarge && totalColsMedium
        ? `slds-large-size--${colsLarge}-of-${adjustCols(totalColsLarge, true)}`
        : null);
    return (
        <div className={rowClassNames} { ...props }>
            {children}
        </div>
    );
}

export class Row extends Component {
    renderColumn(colProps, child) {
      console.log(child);
        if (child.nodeName !== Col) {
            return <Col { ...colProps }>{child}</Col>;
        }

        const childProps = Object.keys(colProps).reduce((cprops, key) => {
            cprops[key] = child.attributes[key] || colProps[key];
            return cprops;
        }, {});
        return cloneElement(child, childProps);
    }

    render({
        className,
        align,
        nowrap,
        nowrapSmall,
        nowrapMedium,
        nowrapLarge,
        cols,
        colsSmall,
        colsMedium,
        colsLarge,
        pullPadded,
        children,
        ...props
    }) {
        const rowClassNames = classnames(className, 'slds-grid', align
            ? `slds-grid--align-${align}`
            : null, nowrap
            ? 'slds-nowrap'
            : 'slds-wrap', nowrapSmall
            ? 'slds-nowrap--small'
            : null, nowrapMedium
            ? 'slds-nowrap--medium'
            : null, nowrapLarge
            ? 'slds-nowrap--large'
            : null, pullPadded
            ? 'slds-grid--pull-padded'
            : null);
        const totalCols = cols || children.length;
        const colProps = {
            totalCols,
            totalColsSmall: colsSmall || totalCols,
            totalColsMedium: colsMedium || totalCols,
            totalColsLarge: colsLarge || totalCols
        };
        return (
            <div className={rowClassNames} { ...props }>
                {children.map(this.renderColumn.bind(this, colProps))}
            </div>
        );
    }
}
