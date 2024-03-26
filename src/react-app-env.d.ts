/// <reference types="react-scripts" />


declare module 'react-rating-stars-component' {
    export interface RatingProps {
        count: number;
        value: number;
        edit: boolean;
        size: number;
        activeColor: string;
    }

    export default function Rating(props: RatingProps): JSX.Element;
}
