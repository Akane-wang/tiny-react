import React, { useCallback, useEffect, useMemo, useState, CSSProperties } from 'react';
import style from './rating.module.less';
import classnames from 'classnames';
import { IProps } from './interface';
import ReoIcon from '@/basic/ReoIcon';
import ratingStyle from './style';
import { suffixPx } from '@/dom-utils/suffixPx';

const defaultProps = {
    rate: 3, // 默认三星，设计说的
    disabled: false,
};
const ReoRate: React.FC<IProps> = (prop) => {
    const props = useMemo(() => {
        return {...defaultProps, ...prop};
    }, [prop]);

    const [checkedRating, setCheckedRating] = useState(props.rate);
    const [tempCheckedRating, setTempCheckedRating] = useState(0);
    const normalRating = useMemo(() => {
        return [1, 2, 3, 4, 5];
    }, []);
    const handleClick = useCallback((e, index: number) => {

        const isHalfRate = (
            (index * e.target.offsetWidth + (index - 1) * ratingStyle.ratingSpacingLeft) - e.screenX
        ) < e.target.offsetWidth / 2; // 半星情况：鼠标点击的位置小于被点击星星的中心点位置，否则是全星
        setCheckedRating(isHalfRate ? index : index - 0.5);
    }, []);

    const handleMouseEnter = useCallback((index: number) => {
        setTempCheckedRating(index);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTempCheckedRating(0); // 挪开时hover值不作数
    }, []);

    useEffect(() => {
        props.onClick?.(checkedRating);
    }, [checkedRating, props]);

    const ratingCss = useMemo(() => {
        return {
            '--rating-margin-left': suffixPx(ratingStyle.ratingSpacingLeft)
        } as CSSProperties;
    }, []);
    return (
        <div className={ classnames(style['rating-wrap']) }>
            {
                normalRating.map((item: number) => {
                    return (
                        <ReoIcon
                            key={ item }
                            className={ classnames(style['rating'], {
                                [style['check-disabled']]: props.disabled
                            }) }
                            style={ ratingCss }
                            name={
                                // hover时 且没有点击rating使得ratingChecked状态被改变
                                tempCheckedRating !== 0 && tempCheckedRating !== checkedRating
                                    ? ((tempCheckedRating > item)
                                        ? 'icon-Rating-3'
                                        : tempCheckedRating === item
                                            ? 'icon-Rating-2'
                                            : 'icon-Rating-1')
                                    : ((checkedRating >= item)
                                        ? 'icon-Rating-3'
                                        : item - checkedRating === 0.5
                                            ? 'icon-Rating-2'
                                            : 'icon-Rating-1')
                             }
                            onMouseEnter={ () => handleMouseEnter(item) }
                            onMouseLeave={ handleMouseLeave }
                            width={ ratingStyle.fontSize }
                            color={ '#FA8C15' }
                            onClick={ (e) => handleClick(e, item) }
                        />
                    );
                })
            }
        </div>
    );
};

export {
    IProps
};
export default ReoRate;
