import classnames from 'classnames';
import React from 'react';
import { IProps, ITabBar } from './interface';
import style from './tab.module.less';
import { ReoCarouselButton } from '@/basic/ReoButton';
import ReoLink from '@/basic/ReoLink';
class PureTabBar extends React.Component<IProps> {
    public render(): React.ReactElement {
        return (
            <div className={ classnames(style['tab-wrap']) }>
                <div className={ classnames('main-container', style['tab-content'], this.props.className) }>
                    <ReoLink
                        className={ classnames(style['tab-title']) }
                        href={ this.props.href }
                        underline={ false }
                        hoverColor={ '#333' }
                    >
                        { this.props.title }
                    </ReoLink>
                    <div className={ classnames(style['tab-bar-wrap']) }>
                        <ReoCarouselButton
                            color={ '#333' }
                            type='ghost'
                            size='medium'
                            iconRightClassName={ classnames(style['carousel-button-right'], this.props.iconRightClassName) }
                            iconLeftClassName={ classnames(style['carousel-button-left'], this.props.iconLeftClassName) }
                            childrenContainerClassName={ this.props.childrenContainerClassName }
                        >
                            {
                                this.props.tabBar.map(item => {
                                    return (
                                        <a
                                            href={ item.href }
                                            data-value={ item.value }
                                            key={ item.value }
                                            className={ classnames(style['tab-bar']) }
                                        >
                                            { item.text }
                                        </a>
                                    );
                                })
                            }
                        </ReoCarouselButton>

                    </div>
                </div>

            </div>
        );
    }
}

export {
    IProps,
    ITabBar
};

export default PureTabBar;
