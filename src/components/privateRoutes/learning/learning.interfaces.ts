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
    subtitles: object | object[];
    proggress: number;
    medals: object | object[];
}