import React, { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IProps, IUserCommentList, Target } from './interface';
import classnames from 'classnames';
import style from './evaluation.module.less';
import { ReoLink, ReoRate, ReoCarouselButton } from '@reolink/web.basic-component';
import { useResize } from '@/vm/hooks';
import { suffixPx } from '@/vm/dom-utils/element';
import config from './config';

// TODO：有一个问题是：如果在carouselButton内的children的长度，特别是两个屏幕的长度不同的，在resize之后就会height被设置成适应当前children（部分children）的高度，而导致另一屏比当前children更高的children显示不全，无论第一屏第二屏都会这样
const Evaluation: React.FC<IProps> = (props): React.ReactElement => {

    // 初始时获取所有数据，根据window尺寸计算得出不限制宽高时单个card的宽度和高度
    const [showCount, setShowCount] = useState({outOfDocument: true, count: props.userCommentList.length});

    const { widthOfWindow } = useResize();

    const [cardWidth, setCardWidth] = useState(((widthOfWindow > 1280 ? 1200 : (widthOfWindow - 40)) - 30 * (config.showCard_1024 - 1) ) / config.showCard_1024);

    const [cardHeight, setCardHeight] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const [showMoreState, setShowMoreState] = useState(true);
    const seeMore = 'See More';
    const seeLess = 'See Less';
    const handleMoreOrLess: any = () => {
        setShowMoreState(!showMoreState);
    };
    // 根据widthOfWindow设置card的宽度以及显示的个数
    useLayoutEffect(() => {

        if(widthOfWindow < 1024) {
            return;
        }
        // 仅处理1024以上，1023以下都是100%
        if( widthOfWindow >= 1280 ) {
            setCardWidth(( 1200 - 30 * (config.showCard_1024 - 1) ) / config.showCard_1024 );
        }
        else if (widthOfWindow >= 1024) {
            setCardWidth(( ( widthOfWindow - 40 ) - 30 * (config.showCard_1024 - 1) ) / config.showCard_1024 );
        }

        setShowCount({outOfDocument: true, count: widthOfWindow >= 1024 ? config.showCard_1024 : props.userCommentList.length});

    }, [props.userCommentList.length, widthOfWindow]);

    useEffect(() => {

        console.log(containerRef.current?.clientHeight );

        setCardHeight(containerRef.current?.clientHeight ?? 0);
        setShowCount((prev) => { return { outOfDocument: false, count: prev.count}; });

    }, [cardWidth]);

    return (
        <div className={ classnames(style.evaluation_wrap_container, props.className) }>
            <div
                className={ classnames(style['evaluation-wrap'], 'layout') }
                id="review"
            >
                <h2 className={ 'comp-header-title' }> { props.title } </h2>
                <div
                    className={ classnames(
                        style['container']
                    )  }
                    ref={ containerRef }
                >
                    {
                        // 1024以上是轮播且每次显示两个
                        widthOfWindow >= 1024
                            ? (
                                <ReoCarouselButton
                                    type={ 'dark' }
                                    showCount={ showCount.count }
                                    className={ classnames(
                                        style['carousel-button-wrap'],
                                        {
                                            [style['carousel-max-w']]: showCount.outOfDocument
                                        }
                                    ) }
                                    childrenClassName={ classnames(
                                        style['carousel-children'],
                                        {
                                            [style['carousel-children-max-w']]: showCount.outOfDocument
                                        }
                                    ) }
                                    iconRightClassName={ classnames(style['icon'], style['icon-right']) }
                                    iconLeftClassName={ style['icon'] }
                                >
                                    {
                                        props.userCommentList.map((item, index) => {
                                            return (
                                                <div
                                                    key={ item.title }
                                                    className={ classnames(
                                                        style['evaluation-card'],
                                                        'evaluation-card',
                                                        item.className,
                                                        {
                                                            [style['not-first-card']]: index % showCount.count !==0
                                                        }
                                                    ) }
                                                    style={
                                                        {
                                                            '--card-height': suffixPx(
                                                                showCount.outOfDocument
                                                                    ? 'unset'
                                                                    : cardHeight
                                                            ),
                                                            '--card-width': suffixPx(cardWidth),
                                                            '--show-count': showCount.count
                                                        } as CSSProperties
                                                    }
                                                >
                                                    <ReoRate
                                                        rate={ item.star }
                                                        disabled={ true }
                                                    >
                                                    </ReoRate>
                                                    <p className={ style['user-comment-title'] }> { item.title } </p>
                                                    <p
                                                        className={ style['user-comment'] }
                                                        dangerouslySetInnerHTML={{__html: item.comment}}
                                                    >

                                                    </p>
                                                    <p className={ style['user'] }> { item.user } </p>
                                                    <ReoLink
                                                        href={ item.href }
                                                        target={ item.target ?? '_blank' }
                                                        transition={ true }
                                                    >
                                                        { item.learnMore }
                                                    </ReoLink>
                                                </div>
                                            );
                                        })
                                    }
                                </ReoCarouselButton>
                            )
                            : (
                                <div className={ 'layout' }>
                                    {
                                        props.userCommentList.map((item, index) => {
                                            return (
                                                <div
                                                    key={ item.title }
                                                    className={ classnames(
                                                        style['evaluation-card'],
                                                        'evaluation-card',
                                                        item.className,
                                                        {
                                                            [style['not-first-card']]: index % showCount.count !==0,
                                                            [style['hidden-more-card']]:
                                                            ((index + 1) > config.showCard_767)
                                                            && showMoreState
                                                        }
                                                    ) }
                                                >
                                                    <ReoRate
                                                        rate={ item.star }
                                                        disabled={ true }
                                                        // width={ widthOfWindow > 767 ?  24 : 16 } // TODO:回头发包版本，给它加上
                                                    >
                                                    </ReoRate>
                                                    <p className={ style['user-comment-title'] }> { item.title } </p>
                                                    <p className={ style['user-comment'] }> { item.comment } </p>
                                                    <p className={ style['user'] }> { item.user } </p>
                                                    <ReoLink
                                                        href={ item.href }
                                                        target={ item.target ?? '_blank' }
                                                        transition={ true }
                                                    >
                                                        { item.learnMore }
                                                    </ReoLink>
                                                </div>
                                            );
                                        })
                                    }
                                    <ReoLink
                                        icon={ showMoreState ? 'icon-icon_plus' : 'icon-icon_cross2' }
                                        onClick={ () => handleMoreOrLess() }
                                        className={ classnames(
                                            style['show-more-faq'],
                                            { ['must-be-hidden']: showCount.count <= config.showCard_767 }
                                        ) }
                                    >
                                        { showMoreState ? seeMore : seeLess }
                                    </ReoLink>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default Evaluation;
export {
    IProps,
    IUserCommentList,
    Target
};
