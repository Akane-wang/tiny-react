import ReoIcon from '@/basic/ReoIcon';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import { IProps } from './interface';
import style from './table.module.less';
import { ReoCarouselButton } from '@/basic/ReoButton';

const defaultProps = {
    loading: false,
    useCarouselButton: true
};
const ReoTable: React.FC<IProps> = (prop) => {
    const props = useMemo(() => {
        return {...defaultProps, ...prop };
    }, [prop]);

    return (
        <div className={ classnames(style['table-wrap'], 'main-container', props.className) }>
            <ReoCarouselButton
                type='dark'
                size='large'
                iconLeftClassName={ classnames(
                    style['icon-left'],
                    { [style['hidden-carousel-button']]: !props.useCarouselButton }
                ) }
                iconRightClassName={ classnames(
                    style['icon-right'],
                    { [style['hidden-carousel-button']]: !props.useCarouselButton }
                ) }
                childrenContainerClassName={ classnames(
                    style['children-container'],
                    {
                        [style['disabled-carousel-button']]: !props.useCarouselButton
                    },
                    props.childrenContainerClassName
                ) }
                className={ style['icon-carousel'] }
                childrenClassName={ style['children-content'] }
            >
                <table>
                    <thead>
                        <tr>
                            {
                                props.columns.map(item => {
                                    return (
                                        <th
                                            key={ item.value }
                                            className={ classnames(props.tableColumnClassName) }
                                        >
                                            { item.title }
                                        </th>

                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dataSource.map((item) => {
                                return (
                                    <tr key={ item.rowTitle }>

                                        <td className={
                                            classnames(style['row-title'], props.tableDataClassName)
                                            }
                                        >
                                            { item['rowTitle'] }
                                        </td>
                                        {
                                            Object.keys(item).map(column => {

                                                return column !== 'rowTitle'
                                                    ? (
                                                        <td
                                                            key={ column }
                                                            className={ classnames(props.tableDataClassName) }
                                                        >
                                                            {
                                                                ['Y', 'N'].includes(item[column])
                                                                ? (
                                                                    <ReoIcon
                                                                        name={
                                                                            item[column] === 'Y'
                                                                                ? 'icon-check'
                                                                                : 'icon-icon_cross2'
                                                                        }
                                                                        className={
                                                                            item[column] === 'Y'
                                                                            ? style['icon-checked']
                                                                            : style['icon-unchecked']
                                                                        }
                                                                        width={ 18 }
                                                                        color={ '#fff' }
                                                                    />
                                                                )
                                                                : item[column]
                                                            }
                                                        </td>
                                                    )
                                                    : null;
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }

                    </tbody>

                </table>

            </ReoCarouselButton>
            <p className={ style['table-note'] }>
                { props.tableNote }
            </p>
        </div>
    );
};

export default ReoTable;
export {
    IProps
};
