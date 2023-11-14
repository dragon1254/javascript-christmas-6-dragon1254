import { MissionUtils } from "@woowacourse/mission-utils";
import InputView from "../view/InputView.js";
import checkDate from "../validator/ValidateDate.js";
import checkMenu from "../validator/ValidateMenu.js";
import makeMenu from "../util/menu/makeMenu.js";
import NUMBERS from "../../src/constant/numbers.js";
import makeDateDiscount from "../util/date/makeDateDiscount.js";
import OutputView from "../view/OutputView.js";


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
        this.present();
        this.benefitPrices();
    }

    async getDate() {
        const temporaryDate = await InputView.readDate();
        try{
            const dateObject = new checkDate(temporaryDate);
            this.date = Object.values(dateObject)[0]
        } catch(error) {
            MissionUtils.Console.print(error.message);
            return await this.getDate();
        }
    }


    async getMenu() {
        const menu = await InputView.readMenu();
        try{
            const menuListObject = new makeMenu(menu,this.menulist);
            this.menulist = Object.values(menuListObject)[0];
            this.menuCount = Object.values(this.menulist);
            const correctMenu = new checkMenu(this.menulist);
        } catch(error) {
            MissionUtils.Console.print(error);
            return await this.getMenu();
        }
    }


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
            this.Present = true;
        }
        if(this.BeforeDiscount < NUMBERS.SHAMPAIN_STANDARD){
            this.Present = false;
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
        OutputView.printMenu(this.date, this.menulist);
        OutputView.printBeforeDiscount(this.BeforeDiscount);
        if(this.haveDiscount['yes'] === true){
            OutputView.printYesBenefit(this.Present, this.haveDiscount);
        }
        if(this.haveDiscount['yes'] === false){
            OutputView.printNoBenefit();
        }
        const calculatePrice = this.afterDiscount();
        OutputView.printAfterBenefit(calculatePrice);
        OutputView.printBadge(this.totalDiscountPrice,this.Present);
    }
}

export default controller;