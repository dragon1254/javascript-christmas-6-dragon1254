class checkDate{
#date
    constructor(date) {
        this.#date = Number(date);
        this.isCorrectDate();
    }

    isCorrectDate() {
        if(isNaN(this.#date)) {
            throw new Error;
        }
        if(this.#date < 1 || this.#date >45){
            throw new Error;
        }
    }

    
}

export default checkDate;