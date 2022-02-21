import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import IProps, { Size, IAction } from './interface';
import classnames from 'classnames';
import ReoIcon from '@/basic/ReoIcon';
import style from './counter.module.less';
const defaultProps = {
    size: 'large',
    disabled: false,
    bordered: false,
    step: 1,
    maxValue: Infinity,
    minValue: -Infinity,
    float: true
};

const iconSize = {
    ['large' as Size]: 10,
    'small': 8
};

function reducerCounter(currentCounter: number, action: IAction): number {

    let newCounter = currentCounter;

    switch(action.type) {

        case 'add': newCounter = currentCounter + (action.step ?? 1); break;
        case 'minus': newCounter = currentCounter - (action.step ?? 1); break;
        case 'input':
        case 'init': newCounter = action.counter!; break;
        default: throw new Error('Invalid action type');

    }
    return newCounter;

}

const ReoCounter: React.FC<IProps> = (props) => {

    const prop = useMemo(() => {

        return {...defaultProps, ...props};

    }, [props]);

    const [value, dispatchValue] = useReducer(reducerCounter, prop.value);

    useEffect(() => {

        dispatchValue({type: 'init', counter: prop.value});

    }, [prop.value]);

    const handleMinus = useCallback((e, step, onChange) => {

        e.stopPropagation();
        dispatchValue({type: 'minus', step});
        onChange?.(value - step);

    }, [value]);

    const handlePlus = useCallback((e, step, onChange) => {

        e.stopPropagation();
        dispatchValue({type: 'add', step});
        onChange?.(value + step);

    }, [value]);

    const handleInput = useCallback((val: React.ChangeEvent<HTMLInputElement>): void => {

        if(
            Number(val.target.value) > prop.maxValue
            ||
            Number(val.target.value) < prop.minValue
        ) {

            const res = Number(val.target.value) > prop.maxValue
                ? prop.maxValue
                : prop.minValue;
            dispatchValue({
                type: 'input',
                counter: prop.float ? Number(res) : Number(Math.floor(res))
            });
            prop.onChange?.(prop.float ? Number(res) : Number(Math.floor(res)));

        }
        else {

            dispatchValue({
                type: 'input',
                counter: prop.float ? Number(val.target.value) : Math.floor(Number(val.target.value))
            });
            prop.onChange?.(prop.float ? Number(val.target.value) : Math.floor(Number(val.target.value)));

        }

    }, [prop]);

    const handleBlur = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {

        ev.target.value = prop.float ? Number(value).toString() : Math.floor(Number(value)).toString();

    }, [prop.float, value]);

    const handleFocus = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {

        ev.target.value = '';

    }, []);

    const handleChange = useCallback((val: React.ChangeEvent<HTMLInputElement>) => {

        handleInput(val);

    }, [handleInput]);

    return(
        <div className={
            classnames(
                style.counterWrap,
                {
                    [classnames(style.bordered)]: prop.bordered,
                    [classnames(
                        prop.bordered
                        ? style.disabledBorderWrap
                        : '',
                        style.disabled
                    )]: prop.disabled,
                },
                prop.className
        )
        }
        >
            <ReoIcon
                className={ classnames(
                    {
                        [classnames(style.icon, style[`counterHandle-${prop.size}`])]: prop.bordered,
                        [classnames(style.leftSpacing)]: !prop.bordered,
                        [classnames(style.disabled)]: prop.disabled || (value - prop.step < prop.minValue)
                    }
                ) }
                onClick={ (e) => handleMinus(e, prop.step, prop.onChange) }
                name={ 'icon-icon_cross2' }
                width={ iconSize[prop.size] }
                color={ prop.disabled || ((value - prop.step < prop.minValue)) ? '#ddd' : '#777' }
                hoverColor={ prop.bordered ? '#777' : '#333' }
            />
            <input
                min={ prop.minValue }
                max={ prop.maxValue }
                type='number'
                value={ value }
                disabled={ prop.disabled }
                className={
                    classnames(
                        style.centerAlign,
                        {
                            [classnames(style.noBorderValue)]: !prop.bordered,
                            [classnames(
                                style[`value-${prop.size}`],
                                prop.disabled ? style.disabledBorderWrap : ''
                            )]: prop.bordered,
                        }
                )
                }
                onBlur={ handleBlur }
                onFocus={ handleFocus }
                onChange={ handleChange }
            />
            <ReoIcon
                className={ classnames( {
                    [classnames(style.icon, style[`counterHandle-${prop.size}`])]: prop.bordered,
                    [classnames(style.rightSpacing)]: !prop.bordered,
                    [classnames(style.disabled)]: prop.disabled || (prop.step + value > prop.maxValue)
                }) }
                onClick={ (e) => handlePlus(e, prop.step, prop.onChange) }
                name={ 'icon-icon_plus' }
                width={ iconSize[prop.size] }
                color={ prop.disabled || (prop.step + value > prop.maxValue) ? '#ddd' : '#777' }
                hoverColor={ prop.bordered ? '#777' : '#333' }
            />
        </div>
    );
};

export default ReoCounter;

export {
    IProps,
    IAction
};
