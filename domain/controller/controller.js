import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "../view/InputView";
import checkDate from "../validator/ValidateDate";
import checkMenu from "../validator/ValidateMenu";
import makeMenu from "../util/menu/makeMenu";
import NUMBERS from "../../src/constant/numbers";
import makeDateDiscount from "../util/date/makeDateDiscount";
import checkBenefit from "../util/benefit/textBenefit";
import checkBadge from "../model/badge";
import OutputView from "../view/OutputView";


class controller {
#date

#menulist

#menuCount

#menuPriceArray

#beforeDiscount

#haveDiscount

#present

#getBenefit

#totalDiscountPrice


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
            '크리스마스 디데이 할인': 0,
            '평일 할인': 0,
            '주말 할인': 0,
            '특별 할인': 0
        }
        // this.#inputView = InputView
        // const { InputView } = require('../view/InputView');
    }

    async start() {
        await this.getDate();
        this.calculator();
        this.printAll();
    }

    // async getDateAndMenu() {
    //     await this.getDate();
    //     await this.getMenu();
    // }

    calculator() {
        this.#haveDiscount = this.discount()
        this.#present = this.present();
        this.getBenefits();
        this.benefitPrices();
    }


    // 날짜를 받아와서 체크하고 에러가 뜨면 다시 받는다
    // ㄴ 체크 할때 문자인지 확인, 1~31 범위안인지 확인
    async getDate() {
        let temporaryDate = await InputView.readDate();
        try{
            console.log(0);
            this.#date = new checkDate(temporaryDate);
            console.log(1);
        } catch(error) {
            console.log(2);
            MissionUtils.Console.print(error);
            await this.getDate();
        }
    }
    // 메뉴를 받아와서 체크하고 에러가 뜨면 다시 받는다
    // 메뉴 받아와서 메뉴 리스트 만들고
    // 그 리스트를 체크쪽에 보내서 체크

    async getMenu() {
        let menu = await InputView.readMenu();
        try{
            console.log(3);
            this.#menulist = new makeMenu(menu,this.#menulist);
            this.#menuCount = Object.values(this.#menulist);
            const correctMenu = new checkMenu(menu, this.#menulist);
            console.log(4);
        } catch(error) {
            console.log(5);
            MissionUtils.Console.print(error)
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
        if(this.#beforeDiscount >= NUMBERS.SHAMPAIN_STANDARD){
            return true;
        }
        if(this.#haveDiscount < NUMBERS.SHAMPAIN_STANDARD){
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
// 이 계산쪽을 다른곳으로 빼는것도 생각. 진짜 혜택 금액은 #this.present가 true일때 샴페인 25000원 더해준 값
    benefitPrices() {
        const arrayDiscount = Object.values(this.#haveDiscount);
        let discountPrice = 0;
        if(arrayDiscount[0] === true){
            for(let i = 1; i < arrayDiscount.length; i++){
                discountPrice = discountPrice + arrayDiscount[i];
            }
        }
        this.#totalDiscountPrice = discountPrice;
    }

// this.#beforeDiscount - this.#totalDiscountPrice 
// 이것뿐이라 따로 정해줄 필요없을 수 있음. 출력에서 바로 계산만 해줘도 될 수 있으니 고민하기
    afterDiscount() {
        const netPrice = this.#beforeDiscount - this.#totalDiscountPrice;
        return netPrice;
    }

    // #present가 true일때는 샴페인 받으니 무조건 산타. 
    // #present가 false일때 #totalDiscountPrice3가 20000 넘으면 산타, 10000~20000이면 트리, 5000~10000 이면 별, 0~5000이면 없음
    // if문 2개 써서 #present 하고 false일 때는 따로 클래스(든 메소드든) 빼줌(depth관리)
    // model쪽에 따로 만들어서 연결시켜줌

    // badge() {
    //     if(this.#present === true){
    //         return '산타';
    //     }
    //     if(this.#present === false){
    //         const badgeLevel = new checkBadge(this.#totalDiscountPrice);
    //     }
    // }

    printAll() {
        const printMenu = OutputView.printMenu(this.#menulist);
        const printBefore = OutputView.printBefore(this.#beforeDiscount);
        if(this.#haveDiscount[yes] === true){
            const printBenefit = OutputView.printYesBenefit(this.#present, this.#haveDiscount);
            const totalBenefit = OutputView.printTotalBenefit();
        }
        if(this.#haveDiscount[yes] === false){
            const printNotBenefit = OutputView.printNoBenefit();
        }
        const calculatePrice = this.afterDiscount();
        const printAfterDiscount = OutputView.printAfterBenefit();
        const getBadge = OutputView.printBadge(this.#totalDiscountPrice,this.#present);
    }
}

export default controller;