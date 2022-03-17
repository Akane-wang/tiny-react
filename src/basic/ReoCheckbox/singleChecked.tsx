import React, { useCallback } from 'react';
import classnames from 'classnames';
import { ReoIcon } from '@/index';
import style from './checkbox.module.less';
import classNames from 'classnames';
import { ISingleCheckedProps } from './interface';
import { handleInputChange } from './utils';

const SingleChecked: React.FC<ISingleCheckedProps> = (prop) => {

    const handleChange = useCallback((val: boolean, e?): void => {
        e?.preventDefault();
        e?.stopPropagation();
        prop.onChange?.(!val);
    }, [prop]);

    const id = (Math.random() * 1000).toString();
    return (
        <div
            className={ classnames(
                style.singleWrap,
                prop.wrapClassName
            ) }
        >
            <p
                className={ classnames(
                    style.label,
                    style[`alignmentCss-${ prop.alignment ?? 'left' }`]
                ) }
                // 在捕获阶段处理数据
                onClickCapture={ (e) => handleChange(prop.value, e) }
            >
                <span
                    className={
                        classnames(
                            style.spanOutlineClass,
                            {
                                [classNames(style.fillCheckedOutline, style.fillChecked)]: (!prop.ghost) && !prop.disabled,
                                [style.inputCheckedParent]: prop.value,
                                [style.inputDisabledParent]: prop.disabled
                            }
                    )
                }
                >
                    <input
                        className={ classnames('checkbox', 'mustBeHidden') }
                        type="checkbox"
                        disabled={ prop.disabled }
                        checked={ prop.value }
                        onChange={ () => handleInputChange() }
                        name={ id }
                        id={ id }
                    />
                    <ReoIcon
                        name={ 'icon-icon-check' }
                        width={ prop.width ?? '12px' }
                        className={ classnames(
                            style.spanInlineClass,
                            style.checkedSpan,
                            style[prop.ghost ? 'strokeChecked' : 'fillChecked'],
                            style['check-paved']
                        ) }
                        color={ prop.disabled ? '#999' : prop.ghost ? '#00ADE5' : '#fff' }
                    />
                </span>
                <label
                    htmlFor={ id }
                    className={ classNames(prop.className, style.labelSpan) }
                >
                    {
                        prop.required
                            ? <span className={ classnames(style.required) }>*</span>
                            : null
                    }
                    { prop.children }
                </label>
            </p>
        </div>

    );
};

export default SingleChecked;
