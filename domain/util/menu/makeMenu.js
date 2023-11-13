import { MissionUtils } from "@woowacourse/mission-utils";
import ERROR from "../../../src/constant/error";
import NUMBERS from "../../../src/constant/numbers";

class makeMenu{
#menu

MenuList

#inputMenuTitle = [];

    constructor(menu,menuList){
        this.#menu = menu;
        this.MenuList = menuList;
        this.list();
    }

    // 입력받은 메뉴를 ,로 잘라서 [시저샐러드-2,제로콜라-1]의 식의 형태로 만들고(inputMenuArray)
    // 원소 개수 만큼 반복문으로 돌면서 {
    // 그 배열의 각 원소를 - 기준으로 잘라서 [시저샐러드,2]라는 식의 형태르 만들어(temproraryMenuList)
    // temproraryMenuList[0]이 menuList의 key값과 같으면 
    // 그 key값에 해당하는 menuList의 value값에 temproraryMenuList[1]을 넣는식
    // }
    list(){
        let inputMenuArray = (this.#menu||'').split(',');
        this.#inputMenuTitle = Object.keys(this.MenuList);
        inputMenuArray.forEach(element => {
            let temproraryMenuList = element.split('-');
            this.equalWithMenuList(temproraryMenuList);
            this.formOfMenu(temproraryMenuList);
        });
        this.duplication(inputMenuArray);
        return this.MenuList
    }

    equalWithMenuList(temproraryMenuList) {
        for(let i =0; i< NUMBERS.ALL_MENU; i++){
            if(temproraryMenuList[0] === this.#inputMenuTitle[i]) {
                this.MenuList[this.#inputMenuTitle[i]] = Number(temproraryMenuList[1]);
            }
        }
    }


    // 이 두 부분은 ValidateMenu 부분이니까 옮길 수 없을 까 확인해야 함
    formOfMenu(temproraryMenuList){
        if(!Object.keys(this.MenuList).includes(temproraryMenuList[0])){
            throw new Error(MissionUtils.Console.print(ERROR.MENU));
        }
    }

    duplication(inputMenuArray){
        const setMenu = new Set(inputMenuArray);
        const setMenuArray = Array.from(setMenu)
        if(inputMenuArray.length != setMenuArray.length){
            throw new Error(MissionUtils.Console.print(ERROR.MENU))
        }
    }
}

export default makeMenu;