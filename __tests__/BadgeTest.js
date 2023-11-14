import checkBadge from "../domain/model/badge";

describe("뱃지 테스트", () => {
    test("산타 뱃지 획득", () => {
      // given
      const totalDiscountPrice = 30000;
      const present = true;
      const badgeChecker = new checkBadge(totalDiscountPrice, present);
  
      // when
      const result = badgeChecker.level();
  
      // then
      expect(result).toBe("산타");
    });
  
    test("트리 뱃지 획득", () => {
      // given
      const totalDiscountPrice = 15000;
      const present = false;
      const badgeChecker = new checkBadge(totalDiscountPrice, present);
  
      // when
      const result = badgeChecker.level();
  
      // then
      expect(result).toBe("트리");
    });
  
    test("별 뱃지 획득", () => {
      // given
      const totalDiscountPrice = 7500;
      const present = false;
      const badgeChecker = new checkBadge(totalDiscountPrice, present);
  
      // when
      const result = badgeChecker.level();
  
      // then
      expect(result).toBe("별");
    });
  
    test("뱃지 없음", () => {
      // given
      const totalDiscountPrice = 3000;
      const present = false;
      const badgeChecker = new checkBadge(totalDiscountPrice, present);
  
      // when
      const result = badgeChecker.level();
  
      // then
      expect(result).toBe("없음");
    });
  });