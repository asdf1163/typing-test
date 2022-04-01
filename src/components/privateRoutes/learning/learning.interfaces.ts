export interface IdataCategory {
    id: number;
    categoryName: string;
    active: boolean;
}

export interface IlessonSlidePosition {
    slide: number;
    position: number;
}

export interface Ilesson {
    id: number;
    name: string;
    about: string;
    imgURL: string;
    subtitles: object | object[];
    proggress: number;
    medal: "gold" | "silver" | "bronze" | null;
}