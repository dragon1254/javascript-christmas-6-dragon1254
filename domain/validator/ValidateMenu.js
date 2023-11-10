import Console from "@woowacourse/mission-utils/src/console";
import ERROR from "../../src/constant/error";

class checkMenu{
#menu

#menuList

    constructor(menu, menuList) {
        this.#menu = menu;
        this.#menuList = menuList
        this.#isCorrctCount();
    }
// 음료수를 제일 마지막에 배치했으므로 value에서 음료수 부분(뒤쪽 3개)을 자른 배열의 값이 모두 0 이 되면 음료수만 주문한 것
    #isCorrctCount(){
        const checkFood = Object.values(this.#menuList).slice(0,9);
        if(checkFood.every(num => num ===0)){
            throw new Error(Console.print(ERROR.MENU));
        }
        if(Object.values(this.#menuList).some(num => num < 1)) {
            throw new Error(Console.print(ERROR.MENU));
        }
    }
}

export default checkMenu
