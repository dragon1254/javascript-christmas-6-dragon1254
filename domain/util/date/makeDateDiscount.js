import NUMBERS from "../../../src/constant/numbers";

class makeDateDiscount{
#date

#haveDiscount

#menuCount

    constructor(date,haveDiscount,menuCount) {
        this.#date = date;
        this.#haveDiscount = haveDiscount;
        this.#menuCount = menuCount;
    }

    onDDayDiscount(){
        let discount = this.#date * NUMBERS.DAILY_DISCOUNT + NUMBERS.BASIC_DISCOUNT;
        this.#haveDiscount[dday] = discount
        this.commonDiscount()
        return this.#haveDiscount
    }

    commonDiscount(){
        if(this.#date === 3 || 10 || 17 || 24 || 25 || 31){
            this.#haveDiscount[special] = 1000;
        }
        if(this.#date === 1 || 2 || 8 || 9 || 15 || 16 || 22 || 23 || 29 || 30){
            this.weekendDiscount();
        }
        if(this.#date === 3 || 4 || 5 || 6 || 7 || 10 || 11 || 12 || 13 || 14 || 17 || 18 || 19 || 20 || 21 || 24 || 25 || 26 || 27 || 28 || 31){
            this.weekdaysDiscount();
        }
        return this.#haveDiscount
    }
    
    weekendDiscount(){
        let mainMenu = this.#menuCount.slice(3,7);
        let mainSum = 0
        mainMenu.forEach(element => {
            mainSum = mainSum + element * NUMBERS.COMMON_DISCOUNT;
        });
        this.#haveDiscount[weekends] = mainSum;
    }

    weekdaysDiscount(){
        let dessertMenu = this.#menuCount.slice(7,9);
        let dessertSum = 0
        dessertMenu.forEach(element => {
            dessertSum = dessertSum + element * NUMBERS.COMMON_DISCOUNT;
        });
        this.#haveDiscount[weekends] = mainSum;

    }
    

}

export default makeDateDiscount;