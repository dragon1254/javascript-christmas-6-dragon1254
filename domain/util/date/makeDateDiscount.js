import NUMBERS from "../../../src/constant/numbers.js";

class makeDateDiscount{
#date

HaveDiscount

#menuCount

    constructor(date,haveDiscount,menuCount) {
        this.#date = date;
        this.HaveDiscount = haveDiscount;
        this.#menuCount = menuCount;
    }

    onDDayDiscount(){
        let discount = this.#date * NUMBERS.DAILY_DISCOUNT + NUMBERS.BASIC_DISCOUNT;
        this.HaveDiscount['크리스마스 디데이 할인'] = discount
        this.commonDiscount()
        return this.HaveDiscount
    }

    commonDiscount(){
        if(NUMBERS.SPECIAL_DATE.includes(this.#date)){
            this.HaveDiscount['특별 할인'] = NUMBERS.SPECIAL_DISCOUNT;
        }
        if(NUMBERS.WEEKEND_DATE.includes(this.#date)){
            this.weekendDiscount();
        }
        if(NUMBERS.WEEKDAY_DATE.includes(this.#date)){
            this.weekdaysDiscount();
        }
        return this.HaveDiscount
    }
    
    weekendDiscount(){
        let mainMenu = this.#menuCount.slice(3,7);
        let mainSum = 0
        mainMenu.forEach(element => {
            mainSum = mainSum + element * NUMBERS.COMMON_DISCOUNT;
        });
        this.HaveDiscount['주말 할인'] = mainSum;
    }

    weekdaysDiscount(){
        let dessertMenu = this.#menuCount.slice(7,9);
        let dessertSum = 0
        dessertMenu.forEach(element => {
            dessertSum = dessertSum + element * NUMBERS.COMMON_DISCOUNT;
        });
        this.HaveDiscount['평일 할인'] = dessertSum;
    }
}

export default makeDateDiscount;