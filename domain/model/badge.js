import NUMBERS from "../../src/constant/numbers";

class checkBadge{
#totalDiscountPrice
#present
badge

    constructor(totalDiscountPrice,present){
        this.#totalDiscountPrice = totalDiscountPrice;
        this.#present = present;
        this.level();
    }

    level(){
        if(this.#present === true){
            this.badge = '산타'
            return this.badge};
        if(this.#totalDiscountPrice >= NUMBERS.SANTA){
            this.badge = '산타'
            return this.badge};
        if(this.#totalDiscountPrice < NUMBERS.SANTA && this.#totalDiscountPrice >= NUMBERS.TREE){
            this.badge = '트리'
            return this.badge};
        if(this.#totalDiscountPrice < NUMBERS.TREE && this.#totalDiscountPrice >= NUMBERS.STAR){
            this.badge = '별'
            return this.badge};
        if(this.#totalDiscountPrice < NUMBERS.STAR){
            this.badge = '없음'
            return this.badge};
    }
}

export default checkBadge;