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

    // 날짜를 받아와서 체크하고 에러가 뜨면 다시 받는다
    // ㄴ 체크 할때 문자인지 확인, 1~31 범위안인지 확인
    async getDate() {
        try{
            this.#date = await new InputView().readDate();
            const correctDate = new checkDate(this.#date);
            
        } catch(error) {
            Console.print(error);
            await this.getDate();
        }
    }
    // 메뉴를 받아와서 체크하고 에러가 뜨면 다시 받는다
    // 메뉴 받아와서 메뉴 리스트 만들고
    // 그 리스트를 체크쪽에 보내서 체크







}

export default controller;