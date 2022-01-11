import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import { IProps } from './interface';
import style from './tag.module.less';
const ReoTag: React.FC<IProps> = (props) => {
    const [checked, setChecked] = useState(false);
    const handleClick = useCallback(() => {
        setChecked(!checked);
    }, [checked]);

    useEffect(() => {
        props.onClick?.(checked ? props.value : null);
    }, [checked, props]);
    return (
        <div
            data-value={ props.value }
            className={ classnames(
                style['tag-wrap'],
                {
                    [style['tag-checked']]: checked
                },
                props.className,
            ) }
            onClick={ handleClick }
        >
            { props.children }
        </div>
    );
};

export default ReoTag;

export { IProps };
