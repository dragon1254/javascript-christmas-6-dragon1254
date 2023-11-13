import { MissionUtils } from "@woowacourse/mission-utils";
import NUMBERS from "../../src/constant/numbers.js";
import checkBadge from "../model/badge.js";

const OutputView = {
    printMenu(date, menulist) {
        let makeMenuList = Object.keys(menulist);
        let makeMenuCount = Object.values(menulist);
        let makeMenu = '';
        makeMenuList.forEach((element, index) => {
            if(makeMenuCount[index] !== 0){
                makeMenu = makeMenu + `${element} ${makeMenuCount[index]}개\n`
            }
        });
        MissionUtils.Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`)
        MissionUtils.Console.print("<주문 메뉴>");
        MissionUtils.Console.print(makeMenu)
    },

    printBeforeDiscount(beforeDiscount) {
        MissionUtils.Console.print('<할인 전 총주문 금액>')
        MissionUtils.Console.print(`${beforeDiscount.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원\n`)
    },

    printYesBenefit(present, haveDiscount){
        let titleDiscount = Object.keys(haveDiscount);
        let countDiscount = Object.values(haveDiscount);
        if(present === true){
            MissionUtils.Console.print(
                `<증정 메뉴>\n샴페인 1개`)
            this.printBenefit(titleDiscount, countDiscount);
            MissionUtils.Console.print('증정 이벤트: -25,000원')};
        if(present === false) {
            MissionUtils.Console.print(
                `<증정 메뉴>\n없음`)
            this.printBenefit(titleDiscount, countDiscount)};
        this.printTotalBenefit(present,countDiscount);
    },

    printBenefit(titleDiscount, countDiscount){
        MissionUtils.Console.print('<혜택 내역>');
        for(let i = 1; i<titleDiscount.length; i++){
            if(countDiscount[i] !== 0){
            MissionUtils.Console.print(`${titleDiscount[i]}: -${countDiscount[i].toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원\n`);
            }
        }
    },

    printNoBenefit(){
        MissionUtils.Console.print(`<증정 메뉴>\n없음\n`);
        MissionUtils.Console.print(`<혜택 내역>\n없음\n`);
        MissionUtils.Console.print(`<총혜택 금액>\n0원`);
    },

    printTotalBenefit(present,countDiscount){
        let sumDiscount = 0;
        for(let i = 1; i< countDiscount.length; i++){
            sumDiscount = sumDiscount + countDiscount[i];
        };
        if(present === true){
            sumDiscount = sumDiscount + NUMBERS.SHAMPAIN_PRICE;
            MissionUtils.Console.print('<총혜택 금액>')
            MissionUtils.Console.print(`-${sumDiscount.toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)};
        if(present === false){
            MissionUtils.Console.print('<총혜택 금액>')
            MissionUtils.Console.print(`-${sumDiscount.toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)};
    },

    printAfterBenefit(calculatePrice){
        MissionUtils.Console.print('<할인 후 예상 결제 금액>')
        MissionUtils.Console.print(`${calculatePrice.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)
    },
    printBadge(totalDiscountPrice,present){
        const getBadgeObject = new checkBadge(totalDiscountPrice,present);
        MissionUtils.Console.print('<12월 이벤트 배지>')
        const getBadge = Object.values(getBadgeObject)[0]
        MissionUtils.Console.print(getBadge);
    }
}

export default OutputView;