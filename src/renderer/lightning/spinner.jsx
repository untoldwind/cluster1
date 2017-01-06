import {h, Component, cloneElement} from 'preact';
import classnames from 'classnames';
import {registerStyle} from './util';

export default class Spinner extends Component {
    constructor(props) {
        super(props);
        registerStyle('spinner-overlay', [
            ['body .slds .slds-spinner_container', '{ z-index: 9002 }']
        ]);
    }

    renderSpinner({
        className,
        size,
        type,
        ...props
    }) {
        const spinnerClassNames = classnames(className, 'slds-spinner', `slds-spinner--${size}`, type
            ? `slds-spinner--${type}`
            : null);

        return (
            <div className={spinnerClassNames} aria-hidden='false' role='alert' { ...props }>
                <div className='slds-spinner__dot-a'/>
                <div className='slds-spinner__dot-b'/>
            </div>
        );
    }
}
