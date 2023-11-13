import { MissionUtils } from "@woowacourse/mission-utils";
import ERROR from "../../src/constant/error";

class checkDate{
date
    constructor(dateNumber) {
        this.date = Number(dateNumber);
        this.isCorrectDate();
    }

    isCorrectDate() {
        // const dateInRange =  /^[1-9]\d*$/;
        if(isNaN(this.date)) {
            throw new Error(MissionUtils.Console.print(ERROR.NUMBER));
        }
        if(this.date < 1 || this.date >31){
            throw new Error(MissionUtils.Console.print(ERROR.RANGE));
        }
        return;
    }
}

export default checkDate;