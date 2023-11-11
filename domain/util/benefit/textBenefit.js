
class checkBenefit{
#arrayDiscount

#present

    constructor(arrayDiscount, present){
        this.#arrayDiscount = arrayDiscount;
        this.#present = present;
        this.text();
    }

    text(){
        let [firstText, secondText, thirdText, fourthText, fifthText, fullText] = ['','','','','',''];
        if(!(this.#arrayDiscount[4] === 0)){
            firstText = `크리스마스 디데이 할인: -${this.#arrayDiscount[4].toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원\n`};
        if(!(this.#arrayDiscount[1] === 0)){
            secondText = `평일 할인: -${this.#arrayDiscount[1].toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원\n`};
        if(!(this.#arrayDiscount[2] === 0)){
            thirdText = `주말 할인: -${this.#arrayDiscount[2].toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원\n`};
        if(!(this.#arrayDiscount[3] === 0)){
            fourthText = `특별 할인: -${this.#arrayDiscount[3].toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원\n`};
        fifthText = this.shampain()
        fullText = firstText + secondText + thirdText + fourthText + fifthText;
        return fullText;
    }
    
    shampain(){
        if(this.#present === true){
            return '증정 이벤트: -25,000원'
        }
    }
}

export default checkBenefit;