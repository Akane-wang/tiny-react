const defaultIcon = {
    ghost: {
        icon: {
            left: 'icon-icon-arrow_left',
            right: 'icon-icon-arrow_right',
            color: '#999999',
            hoverColor: '#00ade5',
            bgColor: 'transparent',
            hoverBgColor: 'transparent',
            boxShadow: 'unset',
            hoverBoxShadow: 'unset'
        },
        width: {
            large: 30,
            medium: 24,
            small: 16
        },
        padding: {
            large: 0,
            medium: 0,
            small: 0
        }
    },
    light: {
        icon: {
            left: 'icon-icon_arrow-left',
            right: 'icon-icon_arrow-right',
            color: '#555',
            hoverColor: '#555',
            bgColor: 'rgba(255, 255, 255, 0.8)',
            hoverBgColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12)',
            hoverBoxShadow: '0px 1px 6px rgba(0, 0, 0, 0.18)'
        },
        width: {
            large: 16,
            medium: 0,
            small: 12
        },
        padding: {
            large: 17,
            medium: 0,
            small: 13
        },
    },
    dark: {
        icon: {
            left: 'icon-icon_arrow-left',
            right: 'icon-icon_arrow-right',
            color: '#fff',
            hoverColor: '#fff',
            bgColor: 'rgba(0, 0, 0, 0.4)',
            hoverBgColor: 'rgba(0, 0, 0, 0.5)',
            boxShadow: 'unset',
            hoverBoxShadow: 'unset'
        },
        width: {
            large: 22,
            medium: 0,
            small: 12
        },
        padding: {
            large: 29,
            medium: 0,
            small: 14
        },
    },
    unset: {

    }
};

// button 有icon时不同大小的间距
const iconSizeSpace = {
    large: '10px',
    medium: '8px',
    small: '6px'
};

// loading不同尺寸的icon大小
const loadingWidth = {
    large: 20,
    medium: 18,
    small: 16
};

// icon不同尺寸的大小
const iconWidth = {
    right: {
        'large': 10,
        'medium': 10,
        'small': 10
    },
    left: {
        'large': 18,
        'medium': 16,
        'small': 14
    }
};

export { defaultIcon, iconSizeSpace, loadingWidth, iconWidth };
