import { TOptionKey, IOption } from './interface';
const getTarget = (options: Array<IOption<TOptionKey>>, key: TOptionKey): IOption<TOptionKey> | null => {

    for(const item of options) {
        if (item.key === key) {
            return item;
        }
        else if(item.children) {
            const res = getTarget(item.children, key);
            if (!res) {
                continue;
            }
            else {
                return res;
            }
        }
        else {
            continue;
        }
    }

    return null;

};
const getCurrentText = (selectedValue: TOptionKey, options: Array<IOption<TOptionKey>> = []): string => {

    // selectedValue : '' || options的key || string 非空字符

    if(!selectedValue?.toString().trim().length) {
        return '';
    }

    const target = getTarget(options, selectedValue);

    if(target && !target?.children) {
        return target.text as string;
    }
    else {
        return '';
    }
};

function getMatchedOpts(search: string, options: Array<IOption<TOptionKey>>): Array<IOption<TOptionKey>> {

    const s = search.trim();
    if(s === '') {

        return options.slice(0);
    }
    return options.filter(opt => {

        return RegExp(s, 'i').exec(opt.text as string);
    });
}

const getCurrentOptions = (
    options: Array<IOption<TOptionKey>>,
    seletedPath: TOptionKey[] = [],
    searchValue: string = ''
): Array<IOption<TOptionKey>> => {
    // searchValue: '' || seletedPath = [];
    let resOptions: Array<IOption<TOptionKey>> = [];
    let flag = false;
    if ( seletedPath.length ||  searchValue.trim().length) {

        if(seletedPath.length) {
            const target = getTarget(options, seletedPath[seletedPath.length - 1]);
            resOptions = target?.children ?? [];
            flag = true;
        }
        if(searchValue.trim().length) {

            resOptions = getMatchedOpts(searchValue, flag ? resOptions : options);

        }

    }
    else {

        resOptions = options;

    }

    return resOptions;
};

const getParentOption = (options: Array<IOption<TOptionKey>>, seletedPath: TOptionKey[]): IOption<TOptionKey> | null => {
    let resOption = null;
    if ( seletedPath.length ) {

        resOption = getTarget(options, seletedPath[seletedPath.length - 1]);

    }

    return resOption ?? null;
};
export {
    getCurrentText,
    getCurrentOptions,
    getParentOption,
    getTarget
};
