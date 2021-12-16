import React, { forwardRef, useMemo, useCallback } from 'react';
import ReoIcon from '../ReoIcon';
import ReoInput from '../ReoInput';
import classnames from 'classnames';
import { IProps } from './interface';
import style from './search.module.less';

const initVal: IProps = {
    icon: 'icon-icon-search-2',
    width: '306px',
    iconWidth: '12px',
    placeholder: 'Search',
    disabled: false,
    size: 'small',
    color: '#999999',
};

const ReoSearch = forwardRef( (props: IProps, ref): React.ReactElement => {

    const p = useMemo(() => {
        return {...initVal, ...props};
    }, [props]);
    const handleChangeValue = useCallback((value) => {
        p.onChange?.(value);
    }, [p]);
    return (
        <ReoInput
            type={ 'searchInput' }
            placeholder={ p.placeholder }
            size={ p.size }
            width={ p.width }
            value={ p.value }
            onChange={ (value) => handleChangeValue(value) }
            disabled={ p.disabled }
            name={ p.name }
            ref={ ref }
            className={ p.className }
        >
            <ReoIcon
                name={ p.icon! }
                width={ p.iconWidth }
                className={ classnames(style.iconClass, p.iconClassName) }
                color={ p.color }
            />
        </ReoInput>
    );
});

export default ReoSearch;
