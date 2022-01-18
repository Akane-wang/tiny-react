import React, { useCallback, useMemo } from 'react';
import ReoIcon from '@/basic/ReoIcon';
import classnames from 'classnames';
import styleTsx from './style';
import style from './videoPlay.module.less';
import { IProps, Size } from './interface';

const ReoVideoPlay: React.FC<IProps> = (prop) => {
    const props = useMemo(() => {
        const defaultProps = {
            size: 'large' as Size,
            type: 'play',
        };
        return {...defaultProps, ...prop};
    }, [prop]);
    const handleClick = useCallback(() => {
        props.onClick?.();
    }, [props]);
    return (
        <ReoIcon
            name={ props.type === 'play' ? 'icon-icon_play-2' : 'icon-icon-replay-2' }
            width={ styleTsx['iconWidth'][props.size] }
            color={ '#fff' }
            className={ classnames(
                    style['play'],
                    style['position'],
                    style[props.size],
                    style[props.type],
                    props.className
            ) }
            onClick={ handleClick }
        />
    );
};

export default ReoVideoPlay;

export {
    IProps
};
