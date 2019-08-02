import { conjugation } from "./conjugation";

export class verb{
    public id: number;
    public name: string;
    public translation: string;
    public conjugations: conjugation[];
    constructor(id:number, name:string, translation:string, conjugations:conjugation[]){
        this.id = id;
        this.name = name;
        this.translation = translation;
        this.conjugations = conjugations;
    }
}