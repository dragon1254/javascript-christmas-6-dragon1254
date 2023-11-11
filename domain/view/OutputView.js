import Console from "@woowacourse/mission-utils/src/console";
import NUMBERS from "../../src/constant/numbers";
import checkBadge from "../model/badge";

const OutputView = {
    printMenu(menulist) {
        let makeMenuList = Object.keys(menulist);
        let makeMenuCount = Object.values(menulist);
        let makeMenu = '';
        makeMenuList.forEach((element, index) => {
            if(makeMenuCount[index] !== 0){
                makeMenu = makeMenu + `${element} ${makeMenuCount[index]}개\n`
            }
        });
        Console.print("<주문 메뉴>");
        Console.print(makeMenu)
    },

    printBeforeDiscount(beforeDiscount) {
        Console.print('<할인 전 총주문 금액>')
        Console.print(`${beforeDiscount.toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원\n`)
    },

    printYesBenefit(present, haveDiscount){
        let titleDiscount = Object.keys(haveDiscount);
        let countDiscount = Object.values(haveDiscount);
        if(present === true){
            Console.print(
                `<증정 메뉴>
                샴페인 1개`)
            this.printBenefit(titleDiscount, countDiscount);
            Console.print('증정 이벤트: -25,000원')};
        if(present === false) {
            Console.print(
                `<증정 메뉴>
                없음`)
            this.printBenefit(titleDiscount, countDiscount)};
        this.printTotalBenefit(present,countDiscount);
    },

    printBenefit(titleDiscount, countDiscount){
        let benefitText =''
        Console.print('<혜택 내역>');
        for(let i = 1; i<titleDiscount.length; i++){
            if(countDiscount !== 0){
            benefitText = benefitText + `${titleDiscount[i]}: -${countDiscount[i].toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원\n`
            }
        }
    },

    printNoBenefit(){
        Console.print(
        `<증정 메뉴>
        없음
         
        <혜택 내역>
        없음
         
        <총혜택 금액>
        0원`)
    },

    printTotalBenefit(present,countDiscount){
        let sumDiscount = 0;
        for(let i = 1; i< countDiscount.length; i++){
            sumDiscount = sumDiscount + countDiscount[i];
        };
        if(present === true){
            sumDiscount = sumDiscount + NUMBERS.SHAMPAIN_PRICE;
            Console.print('<총혜택 금액>')
            Console.print(`-${sumDiscount.toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)};
        if(present === false){
            Console.print('<총혜택 금액>')
            Console.print(`-${sumDiscount.toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`)};
    },
    printBadge(totalDiscountPrice){
        const getBadge = new checkBadge(totalDiscountPrice);
        Console.print('<12월 이벤트 배지>')
        Console.print(getBadge);
    }
}

export default OutputView;