import classnames from 'classnames';
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { IProps } from './interface';
import styles from './popup.module.less';

const ReoPopup = (props: IProps): React.ReactElement => {

    const popupClass = classnames(styles['reo-popup'], {
        [styles['mask']]: props.mask
    });
    const contentClass = classnames(styles['popup-content'], props.class??'');

    const handleClick = useCallback(() => {
        props.onOutsideClick?.();
    }, []);
    return (
        props.static
            ? (
                <div className={ contentClass }>
                    {props.children}
                </div>
            )
            :
            ReactDOM.createPortal(
                <div
                    className={ popupClass }
                    onClick={ handleClick }
                >
                    <div
                        className={ contentClass }
                        onClick={ (e) => e.stopPropagation() }
                    >
                        {props.children}
                    </div>
                </div>,
                document.body
            )
    );
};

export { IProps };
export default ReoPopup;
