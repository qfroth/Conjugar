
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verb } from '../models/verb';

export class dataPersistence {
    private static _dataKey: string = 'conjugarVerbos'
    private static _storedData: verb[];
    static async getVerbs() {
        if (this._storedData === undefined || this._storedData === null) {
            const data = await AsyncStorage.getItem(this._dataKey);
            if(data){
            this._storedData = JSON.parse(data);
            }else{
                this._storedData = [];
            }
        }
        return this._storedData;
    }

    static async clearData(){
        this._storedData = [];
        await AsyncStorage.clear();
    }
    static async addOrUpdateVerb(updatedVerb: verb) {
        const verbs = await this.getVerbs();
        let verb = verbs.find((item: verb) => item.id === updatedVerb.id);
        const duplicate = verbs.find((item: verb) => item.name === updatedVerb.name);
        if(duplicate && !verb){
            return {success:false, id:duplicate.id};
        }
        if(!verb){
            verb = updatedVerb;
            verbs.push(verb);
        }else{
        verb.name = updatedVerb.name;
        verb.conjugations = updatedVerb.conjugations;
        verb.translation = updatedVerb.translation;
        }
        await AsyncStorage.setItem(this._dataKey, JSON.stringify(verbs));
        return {success: true};
    }
}