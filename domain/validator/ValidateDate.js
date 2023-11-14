import { MissionUtils } from "@woowacourse/mission-utils";
import ERROR from "../../src/constant/error.js";

class checkDate{
date
    constructor(dateNumber) {
        this.date = Number(dateNumber);
        this.isCorrectDate();
    }

    isCorrectDate() {
        if(isNaN(this.date)) {
            throw new Error(MissionUtils.Console.print(ERROR.RANGE));
        }
        if(this.date < 1 || this.date >31){
            throw new Error(MissionUtils.Console.print(ERROR.RANGE));
        }
        return;
    }
}

export default checkDate;