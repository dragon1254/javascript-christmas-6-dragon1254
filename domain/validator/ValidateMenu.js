import { MissionUtils } from "@woowacourse/mission-utils";
import ERROR from "../../src/constant/error.js";
import NUMBERS from "../../src/constant/numbers.js";

class checkMenu{
#menuList

    constructor(menuList) {
        this.#menuList = menuList
        this.#isCorrctCount();
    }

// 음료수를 제일 마지막에 배치했으므로 value에서 음료수 부분(뒤쪽 3개)을 자른 배열의 값이 모두 0 이 되면 음료수만 주문한 것
    #isCorrctCount(){
        const checkFood = Object.values(this.#menuList).slice(0,9);
        const menuCount = Object.values(this.#menuList);
        let sum = 0;
        if(checkFood.every(num => num ===0)){
            throw new Error(MissionUtils.Console.print(ERROR.MENU));
        }
        if(menuCount.some(num => num < 1 && num !==0)) {
            throw new Error(MissionUtils.Console.print(ERROR.MENU));
        }
        menuCount.forEach(element => {
            sum = sum + element
        });
        if(sum > NUMBERS.MAX_MENU) {
            MissionUtils.Console.print(ERROR.OVER_TWENTY);
            // throw new Error(MissionUtils.Console.print(ERROR.OVER_TWENTY))
        }
    }
}

export default checkMenu
