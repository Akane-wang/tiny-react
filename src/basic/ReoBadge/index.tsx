import React from 'react';
import classNames from 'classnames';
import styles from './badge.module.less';
import { IProps } from './interface';

const defaultProps = {
    maxCount: 99
};

const ReoBadge: React.FC<IProps> = (props) => {

    const data = { ...defaultProps, ...props };
    const showBadge = data.dot ?? !!data.count ?? data.showZero;

    return (
        showBadge
            ? (
                <span
                    className={ classNames(
                        styles['comp-badge'],
                        data.dot ? styles['no-content'] : styles['with-content'],
                        data.className) }
                    style={{backgroundColor: data.color}}
                >
                    { (data.count || (data.count === 0 && data.showZero)) && (
                        <span
                            className={ styles['content'] }
                            style={{color: data.textColor}}
                        >
                            { data.maxCount
                                ? (data.count > data.maxCount ? `${data.maxCount}+` : data.count)
                                : data.count }
                        </span>
                      ) }
                </span>
            )
            : null
    );
};

export { IProps };
export default ReoBadge;
