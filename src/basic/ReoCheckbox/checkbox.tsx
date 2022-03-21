import React, { useMemo, useCallback, useState, useEffect } from 'react';
import classnames from 'classnames';
import { ReoIcon } from '@/index';
import style from './checkbox.module.less';
import { IProps } from './interface';
import { handleInputChange } from './utils';

const ReoCheckbox = (prop: IProps): React.ReactElement => {

    const ghost = useMemo(() => {
        return prop.ghost ?? false;
    }, [prop.ghost]);

    const [value, setValue] = useState(prop.value);

    useEffect(() => {

        setValue(prop.value);

    }, [prop]);
    const handleChange = useCallback((val: string, e?): any => {

        e?.preventDefault();
        e?.stopPropagation();
        const valueCopy = value.slice(0);
        if (valueCopy.includes(val)) {
            valueCopy.splice(valueCopy.findIndex(item => item === val), 1);
        }
        else {
            valueCopy.push(val);
        }
        setValue(valueCopy);
    }, [value]);

    useEffect(() => {

        prop.onChange?.(value);

    }, [prop, value]);

    const id = (Math.random() * 1000).toString();

    return (
        <>
            {
                prop.options.map(item => {
                    if (item?.componentFn) {
                        return (
                            <div
                                key={ item.value }
                                onClick={ handleChange(item.value) }
                            >
                                { item.componentFn(item) }
                            </div>
                        );
                    }
                    else {
                        return (
                            <div
                                className={ classnames(style.checkboxWrap, prop.wrapClassName) }
                                key={ item.value }
                            >
                                <p
                                    className={ classnames(
                                        style.label,
                                        style[`alignmentCss-${ prop.alignment ?? 'left' }`]
                                    ) }
                                >
                                    <span
                                        className={
                                            classnames(
                                                style.spanOutlineClass,
                                                {
                                                    [classnames(
                                                        style.fillCheckedOutline, style.fillChecked
                                                    )]: !ghost && !item.disabled,
                                                    [style.inputCheckedParent]: prop.value.includes(item.value),
                                                    [classnames(style.inputDisabledParent)]: item.disabled
                                                }
                                        )
                                    }
                                        // 在捕获阶段处理数据
                                        onClickCapture={ (e) => handleChange(item.value, e) }
                                    >
                                        <input
                                            className={ classnames('checkbox', 'mustBeHidden') }
                                            type="checkbox"
                                            value={ item.value }
                                            disabled={ item.disabled }
                                            checked={ prop.value.includes(item.value) }
                                            onChange={ handleInputChange }
                                            name={ item.value }
                                            id={ id }
                                        />
                                        <ReoIcon
                                            name={ 'icon-icon-check' }
                                            width={ prop.width ?? '12px' }
                                            className={ classnames(
                                                style.spanInlineClass,
                                                style.checkedSpan,
                                                style[ghost ? 'strokeChecked' : 'fillChecked']
                                            ) }
                                            color={ item.disabled ? '#999' : (ghost ? '#00ADE5' : '#fff') }
                                        />
                                    </span>
                                    {
                                        item.label
                                        ? (
                                            <label
                                                htmlFor={ id }
                                                className={ classnames(prop.className, style.labelSpan) }
                                                dangerouslySetInnerHTML={{
                                                    __html: item.required
                                                    ? `<span
                                                            className=${classnames(style.required)}
                                                        >
                                                            *
                                                        </span>${item.label}`
                                                    : item.label
                                                }}
                                            >
                                            </label>
                                            )
                                        : null
                                    }
                                </p>
                            </div>

                        );

                    }
                })
            }
        </>
    );
};

export default ReoCheckbox;
