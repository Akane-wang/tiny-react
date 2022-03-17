import React from 'react';
import { EPlacement as E, IPlacement, IArrowPoint, IOffsetAndProps, IBalloon } from './interface';

export function getPlacementPotion(propsPlacement: E, positionType: 'placement' | 'arrowPoint'): string  {
    const placement: IPlacement = {
        top: [E.TOP_LEFT, E.TOP_CENTER, E.TOP_RIGHT],
        bottom: [E.BOTTOM_LEFT, E.BOTTOM_CENTER, E.BOTTOM_RIGHT],
        right: [E.RIGHT_TOP, E.RIGHT_MIDDLE, E.RIGHT_BOTTOM],
        left: [E.LEFT_TOP, E.LEFT_MIDDLE, E.LEFT_BOTTOM]
    };

    const arrowPoint: IArrowPoint = {
        left: [E.TOP_LEFT, E.BOTTOM_LEFT],
        top: [E.RIGHT_TOP, E.LEFT_TOP],
        right: [E.TOP_RIGHT, E.BOTTOM_RIGHT],
        bottom: [E.RIGHT_BOTTOM, E.LEFT_BOTTOM],
        middle: [E.RIGHT_MIDDLE, E.LEFT_MIDDLE, E.TOP_CENTER, E.BOTTOM_CENTER]
    };

    let res = '';
    if(positionType === 'placement') {
        for(const [k, v] of Object.entries(placement)) {
            if(v.includes(propsPlacement)) {
                res = k;
                break;
            }
        }
    }
    else {
        for(const [k, v] of Object.entries(arrowPoint)) {
            if(v.includes(propsPlacement)) {
                res = k;
                break;
            }
        }
    }
    return res;
}

export function getPosition(prop: IOffsetAndProps, balloonRef: React.RefObject<HTMLDivElement>): IBalloon {
    let x = 0, y = 0;
    const balloonRefWidth = balloonRef.current?.offsetWidth ?? 0;
    const balloonRefHeight = balloonRef.current?.offsetHeight ?? 0;
    const targetWidth = Number(prop.targetWidth) ?? 0;
    const arrowPointWidth = 10;
    const arrowPointHeight = 5;
    const arrowPointAndIconSpace = 2;
    const topBottomArrowOffset = 14;
    const leftRightArrowOffset = 5;
    switch(prop.placement) {
        case E.TOP_RIGHT:
            x = prop.offsetLeft! - balloonRefWidth + topBottomArrowOffset + arrowPointWidth / 2 + targetWidth / 2;
            y = prop.offsetTop! - balloonRefHeight - arrowPointHeight - arrowPointAndIconSpace;
            break;
        case E.TOP_LEFT:
            x = prop.offsetLeft! - topBottomArrowOffset - arrowPointWidth / 2 + targetWidth / 2;
            y = prop.offsetTop! - balloonRefHeight - arrowPointHeight - arrowPointAndIconSpace;
            break;
        case E.TOP_CENTER:
            x = prop.offsetLeft! + targetWidth / 2;
            y = prop.offsetTop! - balloonRefHeight - arrowPointHeight - arrowPointAndIconSpace;
            break;
        case E.BOTTOM_RIGHT:
            x = prop.offsetLeft! - balloonRefWidth + topBottomArrowOffset + arrowPointWidth / 2 + targetWidth / 2;
            y = prop.offsetTop! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            break;
        case E.BOTTOM_CENTER:
            x = prop.offsetLeft! + targetWidth / 2;
            y = prop.offsetTop! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            break;
        case E.BOTTOM_LEFT:
            x = prop.offsetLeft! - topBottomArrowOffset - arrowPointWidth / 2 + targetWidth / 2;
            y = prop.offsetTop! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            break;
        case E.RIGHT_TOP:
            x = prop.offsetLeft! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            y = prop.offsetTop! + targetWidth / 2 - arrowPointHeight / 2 - leftRightArrowOffset;
            break;
        case E.RIGHT_MIDDLE:
            x = prop.offsetLeft! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            y = prop.offsetTop! + targetWidth / 2;
            break;
        case E.RIGHT_BOTTOM:
            x = prop.offsetLeft! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            y = prop.offsetTop! - balloonRefHeight + arrowPointWidth / 2 + leftRightArrowOffset + targetWidth / 2;
            break;
        case E.LEFT_TOP:
            x = prop.offsetLeft! - arrowPointAndIconSpace - balloonRefWidth - arrowPointHeight;
            y = prop.offsetTop! + targetWidth / 2 - arrowPointHeight / 2 - leftRightArrowOffset;
            break;
        case E.LEFT_MIDDLE:
            x = prop.offsetLeft! - balloonRefWidth - arrowPointHeight - arrowPointAndIconSpace;
            y = prop.offsetTop! + targetWidth / 2;
            break;
        case E.LEFT_BOTTOM:
            x = prop.offsetLeft! - balloonRefWidth - arrowPointHeight - arrowPointAndIconSpace;
            y = prop.offsetTop! - balloonRefHeight + targetWidth / 2 + 5;
            break;
        default: break;
    }

    return {x, y};
}
