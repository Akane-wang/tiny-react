import React, {
    useRef,
    useState,
    useEffect,
    CSSProperties,
    forwardRef,
    useImperativeHandle,
    useCallback,
    useMemo
} from 'react';
import style from './input.module.less';
import classnames from 'classnames';
import ReoIcon from '../ReoIcon';
import { suffixPx } from '@/dom-utils';
import { IProps, Size, CurrentState, Types, TipState } from './interface';
import { infoMsg } from './style';

const defaultProps: IProps = {
    type: 'normalInput',
    loading: false,
    placeholder: '',
    disabled: false,
    size: 'large',
    id: '',
    value: '',
    width: '330px',
    currentState: 'normal',
    label: false,
    tips: 'info',
    autoComplete: 'off',
    iconWidth: '16px',
    backgroundColor: 'transparent',
};

const sizeObj = {
    'large': '48px',
    'medium': '36px',
    'small': '30px'
};

/**
 * type : 'normalInput' | 'darkInput' | 'lightInput'
 *
 *  */
// eslint-disable-next-line @typescript-eslint/naming-convention
const Input = forwardRef((props: IProps, ref): React.ReactElement => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [hasValueFlag, setValueFlag] = useState(!!props.value);

    const widthStyle = useMemo(() => {
        return {
            '--width': suffixPx(props.width!),
            '--bg-color': props.backgroundColor
        } as CSSProperties;
    }, [props.backgroundColor, props.width]);

    const labelBeforeHeight = useMemo(() => {
        return {
            '--height': sizeObj[props.size!],
            '--max-width': suffixPx(props.width!)
        } as CSSProperties;
    }, [props.size, props.width]);

    const infoMsgColor = useMemo(() => {
        return {
            '--info-color': props.infoMsgColor ?? infoMsg[props.tips!]
        } as CSSProperties;
    }, [props.infoMsgColor, props.tips]);

    useEffect(() => {
        setValueFlag(Boolean(inputRef.current?.value));
    }, [inputRef, props.value]);

    useImperativeHandle( ref, () => {
        return inputRef.current;
    });
    const handleBlurFn = useCallback((): any => {
        setValueFlag(Boolean(inputRef.current?.value));
    }, []);

    const handleFocusFn = useCallback((): any => {
        props.onFocus?.();
    }, [props]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): any => {
        props.onChange?.(e.target.value);
    }, [props]);

    return (
        <div
            className={ classnames(
            style.inputWrap,
            style[props.type!],
            {
                [style.errorInput]: props.tips === 'error'
            }
            ) }
            style={{...widthStyle, ...infoMsgColor}}
        >

            <input
                id={ props.id }
                type={ props.type }
                className={
                    classnames(
                        style[props.size!], {
                            [style.hasValueClass]: hasValueFlag
                        }, props.inputClassName)
                 }
                ref={ inputRef }
                placeholder={ props.label ? '' : props.placeholder }
                onChange={ e => handleChange(e) }
                onBlur={ handleBlurFn }
                value={ props.value }
                disabled={ props.disabled }
                onFocus={ handleFocusFn }
                autoComplete={ props.autoComplete }
                name={ props.name }
                style={{...widthStyle, ...infoMsgColor}}
            />
            {
                props.children
                ? props.children
                : null
            }
            {
                props.icon
                ? (
                    <div className={ classnames(style.iconWrap, style[props.size!]) }>
                        <ReoIcon
                            name={ props.icon }
                            width={ props.iconWidth }
                            color={ props.color ?? '#555555' }
                        />
                    </div>
                )
                : null
            }
            {
                props.label
                ? (
                    <p
                        className={ classnames(style.inputLabel, {[style.showLabel]: props.label}) }
                        style={ labelBeforeHeight }
                        data-label={ props.placeholder }
                    >
                    </p>
)
                : null
            }
            {
                props.infoMsg
                ? (
                    <p
                        className={ classnames(
                            style[props.tips!],
                            style.infoMsg,
                            'text-left'
                        ) }
                        style={ infoMsgColor }
                    >
                        { props.infoMsg }
                    </p>
                )
                : null
            }
        </div>
    );
});

const ReoInput = forwardRef((props: IProps, ref): React.ReactElement => {

    const p = useMemo(() => {
        return { ...defaultProps, ...props };
    }, [ props ]);
    const widthStyle = useMemo(() => {
        return {
            '--width': suffixPx(p.width!)
        } as CSSProperties;
    }, [ p.width ]);
    return (
        <div
            className={ classnames(style.reoInputWrap, p.className) }
            style={ widthStyle }
        >
            <Input
                { ...p }
                ref={ ref }
            />
        </div>
    );
});

// 导出类型

export { Size, CurrentState, Types, TipState, IProps };

export default ReoInput;
