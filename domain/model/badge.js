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
        if(this.#totalDiscountPrice >= 20000){
            this.badge = '산타'
            return this.badge};
        if(this.#totalDiscountPrice < 20000 && this.#totalDiscountPrice >= 10000){
            this.badge = '트리'
            return this.badge};
        if(this.#totalDiscountPrice <10000 && this.#totalDiscountPrice >= 5000){
            this.badge = '별'
            return this.badge};
        if(this.#totalDiscountPrice < 5000){
            this.badge = '없음'
            return this.badge};
    }
}

export default checkBadge;