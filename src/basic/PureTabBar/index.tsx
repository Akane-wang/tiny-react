import classnames from 'classnames';
import React from 'react';
import { IProps, ITabBar } from './interface';
import style from './tab.module.less';
import { ReoCarouselButton } from '@/basic/ReoButton';
class PureTabBar extends React.Component<IProps> {
    public render(): React.ReactElement {
        return (
            <div className={ classnames(style['tab-wrap']) }>
                <div className={ classnames('layout', style['tab-content'], this.props.className) }>
                    <p className={ classnames(style['tab-title']) }>{this.props.title}</p>
                    <div className={ classnames(style['tab-bar-wrap']) }>
                        <ReoCarouselButton
                            type='ghost'
                            size='medium'
                            iconRightClassName={ style['carousel-button-right'] }
                            iconLeftClassName={ style['carousel-button-left'] }
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
