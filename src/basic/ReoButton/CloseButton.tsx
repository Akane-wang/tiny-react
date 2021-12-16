import React, { CSSProperties, useCallback, useMemo } from 'react';
import { ICloseProps, Size } from './interface';
import { suffixPx } from '@/dom-utils';
import classnames from 'classnames';
import ReoIcon from '../ReoIcon';
import style from './button.module.less';

const defaultProps = {
    iconColor: '#fff',
    buttonColor: '#000',
    size: 'large' as Size,
};
const buttonSize = {
    'large': {
        width: 50,
        iconWidth: 20,
    },
    'medium': {
        width: 32,
        iconWidth: 10,
    },
    'small': {
        width: 20,
        iconWidth: 8,
    }

};
const ReoCloseButton = (props: ICloseProps): React.ReactElement => {
    const prop = useMemo(() => {
        return { ...defaultProps, ...props };
    }, [props]);
    const closeBtnStyle = useMemo(() => {
        return {
            '--closeBtn-background': prop.buttonColor,
            '--closeBtn-width': suffixPx(prop.width ?? buttonSize[prop.size]['width']),
            '--closeBtn-height': suffixPx(prop.height ?? prop.width ?? buttonSize[prop.size]['width']),
        } as CSSProperties;
    }, [prop.buttonColor, prop.height, prop.size, prop.width]);

    const handleClick = useCallback(() => {
        prop.onClick?.();
    }, [prop]);
    return (
        <span
            className={ classnames(style.closeBtn) }
            style={ closeBtnStyle }
            onClick={ handleClick }
        >
            <ReoIcon
                name={ 'icon-icon-error-4' }
                width={ prop.iconWidth ??  buttonSize[prop.size]['iconWidth'] }
                color={ prop.iconColor }
            />
        </span>
    );
};

export default ReoCloseButton;
