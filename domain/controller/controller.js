import Console from "@woowacourse/mission-utils/src/console";
import InputView from "../view/InputView";
import checkDate from "../validator/ValidateDate";


class controller {
#date

    constructor(){

    }

    async start() {
        await this.getDateAndMenu();
    }

    async getDateAndMenu() {
        
    }

    async getDate() {
        try{
            this.#date = await new InputView().readDate();
            const correctDate = new checkDate(date);
            
        } catch(errror) {
            Console.print(errror);
            await this.getDate();
        }
    }

}

export default controller;