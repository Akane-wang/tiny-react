import React, { useMemo, useRef, useCallback } from 'react';
import { ReoIcon, ReoInput } from '@/index';
import classnames from 'classnames';
import { IProps } from './interface';
import style from './search.module.less';

const blueIconInitVal: IProps = {
    icon: 'icon-icon-search-2',
    width: '304px',
    iconWidth: '12px',
    placeholder: 'Search',
    disabled: false,
    size: 'medium',
    color: '#fff',
};

const ReoBlueIconSearch: React.FC<IProps> = (props) => {

    const p = useMemo(() => {
        return {...blueIconInitVal, ...props};
    }, [props]);
    const inputRef = useRef(p.value);

    const handleInputChange = useCallback((value) => {
        inputRef.current = value;
        p.onChange?.(value);
    }, [p]);

    const handleClick = useCallback(() => {
        p.onClick?.(inputRef?.current ?? '');
    }, [p]);
    return (
        <ReoInput
            type={ 'searchInput' }
            placeholder={ p.placeholder }
            size={ p.size }
            width={ p.width }
            value={ p.value }
            onChange={ (value) => handleInputChange(value) }
            disabled={ p.disabled }
            name={ p.name }
            className={ p.className }
        >
            <ReoIcon
                name={ p.icon! }
                width={ p.iconWidth }
                className={ classnames(style.blueIconClass, p.iconClassName) }
                color={ p.color }
                onClick={ handleClick }
            />
        </ReoInput>
    );
};

export default ReoBlueIconSearch;
