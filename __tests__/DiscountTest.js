import makeDateDiscount from "../domain/util/date/makeDateDiscount";

describe("날짜에 대한 할인 테스트", () => {
  test("크리스마스 디데이 할인 테스트", () => {
    // given
    const date = 25; // 크리스마스
    const haveDiscount = {
      yes: true,
      '크리스마스 디데이 할인': 0,
      '평일 할인': 0,
      '주말 할인': 0,
      '특별 할인': 0,
    };
    const menuCount = [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 예시 메뉴 카운트
    const discountCalculator = new makeDateDiscount(date, haveDiscount, menuCount);

    // when
    discountCalculator.onDDayDiscount();
    

    // then
    expect(haveDiscount['크리스마스 디데이 할인']).toBe(3400);
  });

  test("특별 할인 테스트", () => {
    // given
    const date = 3; // 특별 할인 날짜
    const haveDiscount = {
      yes: true,
      '크리스마스 디데이 할인': 0,
      '평일 할인': 0,
      '주말 할인': 0,
      '특별 할인': 0,
    };
    const menuCount = [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0]; // 예시 메뉴 카운트
    const discountCalculator = new makeDateDiscount(date, haveDiscount, menuCount);

    // when
    discountCalculator.commonDiscount();

    // then
    expect(haveDiscount['특별 할인']).toBe(1000);
  });

  test("주말 할인 테스트", () => {
    // given
    const date = 15; // 주말 날짜
    const haveDiscount = {
      yes: true,
      '크리스마스 디데이 할인': 0,
      '평일 할인': 0,
      '주말 할인': 0,
      '특별 할인': 0,
    };
    const menuCount = [1, 1, 2, 2, 1, 3, 0, 2, 3, 3, 0, 0]; // 예시 메뉴 카운트
    const discountCalculator = new makeDateDiscount(date, haveDiscount, menuCount);

    // when
    discountCalculator.weekendDiscount();

    // then
    expect(haveDiscount['주말 할인']).toBe(12138);
  });

  test("평일 할인 테스트", () => {
    // given
    const date = 12; // 평일 날짜
    const haveDiscount = {
      yes: true,
      '크리스마스 디데이 할인': 0,
      '평일 할인': 0,
      '주말 할인': 0,
      '특별 할인': 0,
    };
    const menuCount = [1, 1, 2, 2, 1, 3, 0, 2, 3, 3, 0, 0]; // 예시 메뉴 카운트
    const discountCalculator = new makeDateDiscount(date, haveDiscount, menuCount);

    // when
    discountCalculator.weekdaysDiscount();

    // then
    expect(haveDiscount['평일 할인']).toBe(10115);
  });
});