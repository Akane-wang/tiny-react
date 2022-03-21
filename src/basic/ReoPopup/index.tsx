import classnames from 'classnames';
import React, { memo, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { IProps } from './interface';
import styles from './popup.module.less';

const ReoPopup: React.FC<IProps> = memo((props) => {

    const popupClass = useMemo(() => {
        return (
            classnames(styles['reo-popup'], {
                [styles['mask']]: props.mask,
                [styles['center']]: props.center,
                [styles['pc-animation']]: props.pcAnimation,
                [styles['mobile-animation']]: props.mobileAnimation
            })
        );
    }, [props]);

    const contentClass = useMemo(() => {
        return (
            classnames(styles['popup-content'], props.className ?? '')
        );

    }, [props.className]);

    const handleClick = useCallback(() => {
        props.onClose?.();
    }, [props]);
    return (
        <>
            {
                props.static
                    ? (
                        <div className={ contentClass }>
                            {props.children}
                        </div>
                    )
                    : (

                        ReactDOM.createPortal(
                            // 点击弹窗内容以外的区域，关闭弹窗
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
                            document?.body)
                    )
            }
        </>
    );
});

export { IProps };
export default ReoPopup;
