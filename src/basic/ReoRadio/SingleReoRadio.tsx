import React, { useCallback } from 'react';
import style from './radio.module.less';
import classNames from 'classnames';
import { ISingleProps } from './interface';
import { handleInput } from './util';

const SingleReoRadio = function(props: ISingleProps): React.ReactElement {

    const handleChange = useCallback((e): void => {

        e.preventDefault();
        props.onChange?.(!props.value);

    }, [props]);
    return (
        <span
            className={ style.radioWrap }
        >
            <label
                className={ classNames(style.label) }
                htmlFor={ props.id }
                onClick={ handleChange }
            >
                <input
                    type='radio'
                    className={ style.reoRadio }
                    disabled={ props.disabled }
                    checked={ props.value }
                    onChange={ handleInput }
                    id={ props.id }
                />
                <span
                    className={ style.spanBox }
                >
                    <span className={ style.spanInBox }>

                    </span>
                </span>
                {
                    props.children
                    ? (
                        <span
                            className={ classNames(props.className) }
                        >
                            { props.children }
                        </span>
                    )
                    : null
                }
            </label>
        </span>
    );
};

export default SingleReoRadio;
