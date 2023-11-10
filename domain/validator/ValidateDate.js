import Console from "@woowacourse/mission-utils/src/console";
import ERROR from "../../src/constant/error";

class checkDate{
#date
    constructor(date) {
        this.#date = Number(date);
        this.isCorrectDate();
    }

    isCorrectDate() {
        const dateInRange =  /^[1-9]\d*$/;
        if(!dateInRange.test(this.#date)) {
            throw new Error(Console.print(ERROR.NUMBER));
        }
        if(this.#date < 1 || this.#date >31){
            throw new Error(Console.print(ERROR.RANGE));
        }
    }
}

export default checkDate;