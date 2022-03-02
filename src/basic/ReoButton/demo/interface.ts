import { IProps as ILinkProps } from '@/basic/ReoLink';

export interface IProps {
    className?: string;
    title: string;
    userCommentList: IUserCommentList[];
}

export interface IEvaluationContentProps extends IProps {
    widthOfWindow: number;
    showCount: number;
    onShowCountChange: (currentCount: any) => any;
}

export interface IUserCommentList extends ILinkProps {
    star: number;
    className?: string | React.CSSProperties;
    title: string;
    comment: string;
    user: string;
    learnMore: string;
}

export type Target = '_self' | '_blank' | '_parent' | '_top';
