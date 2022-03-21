import React from 'react';
import { ReoIcon, EIconType } from '@/index';
import classnames from 'classnames';
import { tipObj } from './style';
import { IProps } from './interface';
import style from './tip.module.less';

const ReoTip: React.FC<IProps> = (props) => {

    return (
        <div className={ classnames(
            style['tips-wrap'],
            style[`${props.type}`],
            style['noticeWrap']
        ) }
        >
            {
                tipObj[props.type].name
                    ? (
                        <ReoIcon
                            name={ tipObj[props.type].name as EIconType }
                            width={ 20 }
                            color={ tipObj[props.type].color }
                            className={ style['icon-class'] }
                        />
                    )
                    : null
            }
            <span className={ classnames( style[`text-${props.type}`]) }>
                { props.children ?? props.message }
            </span>
        </div>
    );
};

export default ReoTip;
export {
    IProps
};
