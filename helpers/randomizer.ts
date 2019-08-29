export class randomizer{
    public static random(min : number, max : number){
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        return rand;
    }
}