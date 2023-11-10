import Console from "@woowacourse/mission-utils/src/console";
import ERROR from "../../../src/constant/error";
import NUMBERS from "../../../src/constant/numbers";

class makeMenu{
#menu

#menuList

#inputMenuTitle = [];


    constructor(menu,menuList){
        this.#menu = menu;
        this.#menuList = menuList;
    }

    // 입력받은 메뉴를 ,로 잘라서 [시저샐러드-2,제로콜라-1]의 식의 형태로 만들고(inputMenuArray)
    // 원소 개수 만큼 반복문으로 돌면서 {
    // 그 배열의 각 원소를 - 기준으로 잘라서 [시저샐러드,2]라는 식의 형태르 만들어(temproraryMenuList)
    // temproraryMenuList[0]이 menuList의 key값과 같으면 
    // 그 key값에 해당하는 menuList의 value값에 temproraryMenuList[1]을 넣는식
    // }
    list(){
        const inputMenuArray = this.#menu.split(',');
        this.#inputMenuTitle = Object.keys(this.#menuList);
        inputMenuArray.forEach(element => {
            let temproraryMenuList = element.split('-');
            this.equalWithMenuList(temproraryMenuList);
        });
        this.duplication(inputMenuArray);
        return this.#menuList
    }

    equalWithMenuList(temproraryMenuList) {
        for(let i =0; i< NUMBERS.ALL_MENU; i++){
            if(temproraryMenuList[0] === this.#inputMenuTitle[i]) {
                this.#menuList[this.#inputMenuTitle[i]] = temproraryMenuList[1]
            }
        }
    }


    duplication(inputMenuArray){
        const setMenu = new Set(inputMenuArray);
        const setMenuArray = Array.from(setMenu)
        if(inputMenuArray.length != setMenuArray.length){
            throw new Error(Console.print(ERROR.MENU))
        }
    }
}

export default makeMenu;