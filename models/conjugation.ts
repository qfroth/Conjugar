import { pointOfViews } from "./pointOfViews";
import { times } from "./times";

export class conjugation {
    public pointOfView: pointOfViews;
    public time: times;
    public conjugacion : string;
    constructor(pointOfView:pointOfViews, time:times, conjugacion:string){
        this.pointOfView = pointOfView;
        this.time = time;
        this.conjugacion = conjugacion;
    }
}