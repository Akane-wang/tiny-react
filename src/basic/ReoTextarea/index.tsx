/**
 * type: textarea
 *
  */
import React, {useState, useRef, CSSProperties, useCallback, useMemo, useEffect} from 'react';
import classnames from 'classnames';
import style from './textarea.module.less';
import { suffixPx } from '@/dom-utils';
import { IProps, Tips, Resize } from './interface';

const initialVal: IProps = {
    autoComplete: 'off',
    label: false,
    resize: 'none',
    width: '680px',
    height: '120px',
    required: false,
    tips: 'normal',
    disabled: false,
};

const ReoTextarea: React.FC<IProps> = (props) => {
    const p = useMemo(() => {

        return {...initialVal, ...props};

    }, [props]);

    const [value, setValue] = useState(p.value);

    useEffect(() => {

        setValue(p.value);

    }, [p]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [hasValueFlag, setValueFlag] = useState(!!p.value);

    const handleBlurFn = useCallback((e: React.FocusEvent<HTMLTextAreaElement>): any => {

        setValueFlag(Boolean(textareaRef.current?.value));
        p.onBlur?.(e.target.value);

    }, [p]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): any => {

        setValue(e.target.value);
        p.onChange?.(e.target.value);

    }, [p]);

    const handleKeyUp = useCallback((e: any): void => {

        p?.onKeyUp?.(e);

    }, [p]);

    const handleKeyPress = useCallback((e: any): void => {

        p?.onKeyPress?.(e);

    }, [p]);

    const textareaStyle = useMemo(() => {

        return {
            '--resize': p.resize,
            '--width': suffixPx(p.width!),
            '--height': suffixPx(p.height!)
        } as CSSProperties;

    }, [p.height, p.resize, p.width]);

    return (
        <div className={ classnames(style.textareaWrap, p.className) }>
            <textarea
                value={ value }
                className={
                    classnames(
                        style.textareaClass,
                        style[p.tips!],
                        {
                            [style.hasValueClass]: hasValueFlag
                        },
                        'scrollbar'
                )
            }
                style={ textareaStyle }
                name='textarea'
                placeholder={ p.label ? '' : p.placeholder }
                ref={ textareaRef }
                onBlur={ (e) => handleBlurFn(e) }
                onChange={ (e) => handleChange(e) }
                autoComplete={ p.autoComplete }
                disabled={ p.disabled }
                onKeyUp={ handleKeyUp }
                onKeyPress={ handleKeyPress }
            >

            </textarea>
            {
                p.label
                    ? (
                        <p
                            className={ classnames(
                                style.textareaLabel,
                                style[`${p.tips}Label`],
                                {
                                    [classnames(style.showTextarea)]: p.label
                                }
                            ) }
                            data-label={ p.placeholder }
                        >

                        </p>
                    )
                    : null
            }
            <span className={ classnames(
                style.required, {
                    'must-be-hidden': !p.required
                }
            ) }
            >
                *
            </span>
            <span
                className={ classnames(
                    { ['must-be-hidden']: p.tips === 'normal' },
                    style[`${p.tips}Info`],
                    style.tipsInfo
                ) }
            >
                { p.infoMsg }
            </span>
        </div>
    );
};

export default ReoTextarea;
export { IProps, Tips, Resize };
