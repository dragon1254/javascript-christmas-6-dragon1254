import { MissionUtils } from "@woowacourse/mission-utils";
import MESSAGE from "../../src/constant/message";

const InputView = {
    async readDate() {
        const input = await MissionUtils.Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)");
        return input;
    },

    async readMenu() {
        const inputMenu = await MissionUtils.Console.readLineAsync(MESSAGE.MENU);
        return inputMenu;
    }
}

export default InputView;
