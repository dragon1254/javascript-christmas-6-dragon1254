import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "../view/InputView";
import checkDate from "../validator/ValidateDate";
import checkMenu from "../validator/ValidateMenu";
import makeMenu from "../util/menu/makeMenu";
import NUMBERS from "../../src/constant/numbers";
import makeDateDiscount from "../util/date/makeDateDiscount";
import OutputView from "../view/OutputView";


class controller {
date

menulist

menuCount

#menuPriceArray

BeforeDiscount

haveDiscount

Present

totalDiscountPrice


    constructor(){
        this.menulist = {
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
        this.haveDiscount = {
            yes: true,
            '크리스마스 디데이 할인': 0,
            '평일 할인': 0,
            '주말 할인': 0,
            '특별 할인': 0
        }
    }

    async start() {
        await this.getDateAndMenu();
        this.calculator();
        this.printAll();
    }

    async getDateAndMenu() {
        await this.getDate();
        await this.getMenu();
    }

    calculator() {
        this.beforeDiscount();
        this.discount()
        this.Present = this.present();
        this.benefitPrices();
    }

    async getDate() {
        try{
            const temporaryDate = await InputView.readDate();
            const dateObject = new checkDate(temporaryDate);
            this.date = Object.values(dateObject)[0]
        } catch(error) {
            MissionUtils.Console.print(error.message);
        //     await this.getDate();
        }
    }

    async getMenu() {
        try{
            let menu = await InputView.readMenu();
            const menuListObject = new makeMenu(menu,this.menulist);
            this.menulist = Object.values(menuListObject)[0];
            this.menuCount = Object.values(this.menulist);
            const correctMenu = new checkMenu(menu, this.menulist);    
        } catch(error) {
            MissionUtils.Console.print(error)
            // await this.getMenu()
        }
    }


    // async getMenu() {
    //     let isValidMenu = false;
    
    //     while (!isValidMenu) {
    //         try {
    //             let menu = await InputView.readMenu();
    //             this.menulist = new makeMenu(menu, this.menulist);
    //             this.menuCount = Object.values(this.menulist);
    //             const correctMenu = new checkMenu(menu, this.menulist);
    //             isValidMenu = true; 
    //         } catch (error) {
    //             MissionUtils.Console.print(error.message);
    //         }
    //     }
    // }

    beforeDiscount() {
        let sumWithoutDiscount = 0;
        this.#menuPriceArray.forEach((element,index) => {
            sumWithoutDiscount = sumWithoutDiscount + element * this.menuCount[index];
        });
        this.BeforeDiscount = sumWithoutDiscount;
    }

    discount() {
        if(this.BeforeDiscount < 10000){
            this.haveDiscount['yes'] = false;
        }
        let getDiscount = new makeDateDiscount(this.date,this.haveDiscount, this.menuCount)
        if(this.date <= NUMBERS.CHRISTMAS_DATE){
            this.haveDiscount = getDiscount.onDDayDiscount()
        }
        if(this.date > NUMBERS.CHRISTMAS_DATE){
            this.haveDiscount =  getDiscount.commonDiscount()
        }
    }

    present() {
        if(this.BeforeDiscount >= NUMBERS.SHAMPAIN_STANDARD){
            return true;
        }
        if(this.haveDiscount < NUMBERS.SHAMPAIN_STANDARD){
            return false;
        }
    }

    benefitPrices() {
        const arrayDiscount = Object.values(this.haveDiscount);
        let discountPrice = 0;
        if(arrayDiscount[0] === true){
            for(let i = 1; i < arrayDiscount.length; i++){
                discountPrice = discountPrice + arrayDiscount[i];
            }
        }
        this.totalDiscountPrice = discountPrice;
    }

    afterDiscount() {
        const netPrice = this.BeforeDiscount - this.totalDiscountPrice;
        return netPrice;
    }

    printAll() {
        const printMenu = OutputView.printMenu(this.menulist);
        const printBefore = OutputView.printBeforeDiscount(this.BeforeDiscount);
        if(this.haveDiscount['yes'] === true){
            const printBenefit = OutputView.printYesBenefit(this.Present, this.haveDiscount);
            // const totalBenefit = OutputView.printTotalBenefit(this.Present, this.haveDiscount);
        }
        if(this.haveDiscount['yes'] === false){
            const printNotBenefit = OutputView.printNoBenefit();
        }
        const calculatePrice = this.afterDiscount();
        const printAfterDiscount = OutputView.printAfterBenefit(calculatePrice);
        const getBadge = OutputView.printBadge(this.totalDiscountPrice,this.Present);
    }
}

export default controller;