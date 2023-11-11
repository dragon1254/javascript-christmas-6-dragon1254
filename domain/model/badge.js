class checkBadge{
#totalDiscountPrice

    constructor(totalDiscountPrice){
        this.#totalDiscountPrice = totalDiscountPrice
        this.level();
    }

    level(){
        if(this.#totalDiscountPrice >= 20000){
            return '산타'
        }
        if(this.#totalDiscountPrice < 20000 && this.#totalDiscountPrice >= 10000){
            return '트리'
        }
        if(this.#totalDiscountPrice <10000 && this.#totalDiscountPrice >= 5000){
            return '별'
        }
        if(this.#totalDiscountPrice < 5000){
            return '없음'
        }
    }
}

export default checkBadge;