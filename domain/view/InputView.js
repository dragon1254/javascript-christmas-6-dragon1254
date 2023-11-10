import Console from "@woowacourse/mission-utils/src/console";
import MESSAGE from "../../src/constant/message";

const InputView = {
    async readDate() {
        const input = await Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)");
        return input;
    },

    async readMenu() {
        const inputMenu = await Console.readLineAsync(MESSAGE.MENU);
        return inputMenu;
    }
    // ...
}

export default InputView;