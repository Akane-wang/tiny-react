import React, { useCallback, useMemo } from 'react';
import style from './radio.module.less';
import classNames from 'classnames';
import { IProps, IOptions } from './interface';
import { handleInput } from './util';

const ReoRadio: React.FC<IProps> = (props) => {

    const p = useMemo(() => {

        return props.options.map(item => {
            const temp = !!(item.value === props.value);
            const option = { ...{ disabled: false, checked: temp }, ...item };
            return option;
        });

    }, [props.options, props.value]);

    const handleChange = useCallback((value: string): void => {

        props.onChange?.(value);

    }, [props]);

    return (
        <>
            {
                p.map((item: IOptions) => {
                    if (item?.componentFn) {
                        return (
                            <div
                                key={ item.value }
                                onClick={ () => handleChange(item.value) }
                            >
                                { item.componentFn(item) }
                            </div>
                        );
                    }
                    else {
                        return (
                            <div
                                className={ classNames(style.radioWrap) }
                                key={ item.value }
                            >
                                <label
                                    htmlFor={ props.id }
                                    className={ classNames( style.label, style[`label-${ props.alignment }`]) }
                                    onClick={ () => handleChange(item.value) }
                                >
                                    <input
                                        className={ style.reoRadio }
                                        type="radio"
                                        value={ item.value }
                                        disabled={ item.disabled }
                                        checked={ item.checked }
                                        onChange={ handleInput }
                                        name={ props.id }
                                        id={ props.id }
                                    />
                                    <span className={ classNames(style.spanBox) }>
                                        <span className={ style.spanInBox }>

                                        </span>
                                    </span>
                                    {
                                        item.label
                                        ? (
                                            <span
                                                className={ classNames(props.className) }
                                                dangerouslySetInnerHTML={{__html: item.label}}
                                            >
                                                { item.label }
                                            </span>
                                        )
                                        : null
                                    }
                                </label>
                            </div>
                        );
                    }

                })
            }
        </>
    );
};

export default ReoRadio;
