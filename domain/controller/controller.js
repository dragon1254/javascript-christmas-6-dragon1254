import Console from "@woowacourse/mission-utils/src/console";
import InputView from "../view/InputView";
import checkDate from "../validator/ValidateDate";
import checkMenu from "../validator/ValidateMenu";
import makeMenu from "../util/menu/makeMenu";


class controller {
#date
#menulist

    constructor(){
        this.#menulist = {
            양송이수프: 0, 
            타파스:0, 
            시저샐러드:0, 
            티본스테이크:0, 
            바비큐립:0,
            해산물파스타:0, 
            크리스마스파스타:0,
            초코케이크:0, 
            아이스크림:0,
            제로콜라:0, 
            레드와인:0,
            샴페인:0
        }
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

    async getMenu() {
        try{
            const menu = await new InputView().readMenu();
            this.#menulist = new makeMenu(menu,this.#menulist).list();
            const correctMenu = new checkMenu(this.#menulist);
        } catch(error) {
            Console.print(error)
            await this.getMenu()
        }
    }





}

export default controller;