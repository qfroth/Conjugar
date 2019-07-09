import { conjugation } from "./conjugation";

export class verb{
    public name: string;
    public translation: string;
    public conjugations: conjugation[];
    constructor(name:string, translation:string, conjugations:conjugation[]){
        this.name = name;
        this.translation = translation;
        this.conjugations = conjugations;
    }
}