import Console from "@woowacourse/mission-utils/src/console";
import InputView from "../view/InputView";
import checkDate from "../validator/ValidateDate";
import checkMenu from "../validator/ValidateMenu";
import makeMenu from "../util/menu/makeMenu";
import NUMBERS from "../../src/constant/numbers";
import makeDateDiscount from "../util/date/makeDateDiscount";
import checkBenefit from "../util/benefit/textBenefit";


class controller {
#date

#menulist

#menuCount

#menuPriceArray

#inputView

#beforeDiscount

#haveDiscount

#present

#getBenefit

#totalBenefitPrice

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
        };
        this.#menuPriceArray = [6000, 5500, 8000, 55000, 54000, 35000, 25000, 15000, 5000, 3000, 60000, 25000];
        this.#haveDiscount = {
            yes: true,
            weekdays: 0,
            weekends: 0,
            special: 0,
            dday: 0
        }
        this.#inputView = new InputView();
    }

    async start() {
        await this.getDateAndMenu();
        this.calculator();
    }

    async getDateAndMenu() {
        await this.getDate();
        await this.getMenu();
    }

    calculator() {
        this.#haveDiscount = this.discount()
        this.#present = this.present();
    }


    // 날짜를 받아와서 체크하고 에러가 뜨면 다시 받는다
    // ㄴ 체크 할때 문자인지 확인, 1~31 범위안인지 확인
    async getDate() {
        try{
            this.#date = await this.#inputView.readDate();
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
            const menu = await this.#inputView.readMenu();
            this.#menulist = new makeMenu(menu,this.#menulist);
            this.#menuCount = Object.values(this.#menulist);
            const correctMenu = new checkMenu(menu, this.#menulist);
        } catch(error) {
            Console.print(error)
            await this.getMenu()
        }
        this.#beforeDiscount = this.beforeDiscount();
    }

    beforeDiscount() {
        let sumWithoutDiscount = 0;
        this.#menuPriceArray.forEach((element,index) => {
            sumWithoutDiscount = sumWithoutDiscount + element * this.#menuCount[index];
        });
        return sumWithoutDiscount;
    }

// 할인은 따로 빼서 #date가 25이하이면 크리스마스디데이를 true로 26이상이면 false로 만듦
// true이면 혜택에 크리스마스디데이할인 추가, false이면 삭제
            // 디데이 할인: #date * 100 + 1000(100, 1000은 숫자 const로 만들었음- DAILY_DISCOUNT,BASIC_DISCOUNT)
// 공통은 #date가 3,10,17,24,25,31 이면 특별할인으로 1000원 추가
//         #date가 1,2,8,9,15,16,22,23,29,30 에는 메인 메뉴 2023원 할인(#menuList에서 index 3,4,5,6)
//         위 날짜를 제외한 날에는(평일) 디저트 메뉴(#menuList에서 index 7,8) 2023원 할인
            // ㄴ  2023도 숫자 const로 COMMON_DISCOUNT
// 혜택쪽에서도 문구 추가 삭제
// beforeDiscount가 10000보다 작으면 discount 없음 혜택 없음 총 혜택 금액 0원 이벤트 배지 없음

    discount() {
        if(this.#beforeDiscount < 10000){
            this.#haveDiscount[yes] = false;
        }
        let getDiscount = new makeDateDiscount(this.#date,this.#haveDiscount, this.#menuCount)
        if(this.#date <= NUMBERS.CHRISTMAS_DATE){
            this.#haveDiscount = getDiscount.onDDayDiscount()
        }
        if(this.#date > NUMBERS.CHRISTMAS_DATE){
            this.#haveDiscount =  getDiscount.commonDiscount()
        }
    }

    present() {
        if(this.#beforeDiscount >= 120000){
            return true;
        }
        if(this.#haveDiscount < 120000){
            return false;
        }
    }

    getBenefits() {
        const arrayDiscount = Object.values(this.#haveDiscount);
        if(arrayDiscount[0] === true){
            this.#getBenefit = new checkBenefit(arrayDiscount,this.#present); 
        }
        if(arrayDiscount[0] === false){
            this.#getBenefit = '없음'
        }
    }
// 이 계산쪽을 다른곳으로 빼는것도 생각
    benefitPrices() {
        const arrayDiscount = Object.values(this.#haveDiscount);
        let discountPrice = 0;
        if(arrayDiscount[0] === true){
            for(let i = 1; i < arrayDiscount.length; i++){
                discountPrice = discountPrice + arrayDiscount[i];
            }
        }
        this.#totalBenefitPrice = discountPrice;
    }

    afterDiscount() {

    }

    badge() {

    }

}

export default controller;