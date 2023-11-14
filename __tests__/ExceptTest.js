import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

describe("추가 날짜 예외 테스트", () => {
  test("1보다 작은 날짜일 때", async () => {
    // given
    const INVALID_DATE_MESSAGE = "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["1", "해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["0", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_DATE_MESSAGE));
  });

  test("31보다 큰 날짜일 때", async () => {
    // given
    const INVALID_DATE_MESSAGE = "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["1", "해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["45", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_DATE_MESSAGE));
  });
});

describe("추가 주문 예외 테스트", () => {
    test("메뉴 숫자가 20개를 넘을 때", async () => {
        // given
        const INVALID_ORDER_MESSAGE = "[ERROR] 최대 20개까지만 주문할 수 있습니다.";
        const INPUTS_TO_END = ["해산물파스타-2"];
        const logSpy = getLogSpy();
        mockQuestions(["3", "해산물파스타-21", ...INPUTS_TO_END]);
    
        // when
        const app = new App();
        await app.run();
    
        // then
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_ORDER_MESSAGE));
      });
  
    test("음료수만 주문 할 때", async () => {
      // given
      const INVALID_ORDER_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
      const INPUTS_TO_END = ["해산물파스타-2"];
      const logSpy = getLogSpy();
      mockQuestions(["3", "제로콜라-2", ...INPUTS_TO_END]);
  
      // when
      const app = new App();
      await app.run();
  
      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_ORDER_MESSAGE));
    });
  
    test("중복메뉴 주문 할 때", async () => {
        // given
        const INVALID_ORDER_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
        const INPUTS_TO_END = ["해산물파스타-2"];
        const logSpy = getLogSpy();
        mockQuestions(["3", "제로콜라-2", "제로콜라-2", ...INPUTS_TO_END]);
    
        // when
        const app = new App();
        await app.run();
    
        // then
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_ORDER_MESSAGE));
      });
  });