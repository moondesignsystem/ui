import { describe, it, expect } from "@jest/globals";
import getDimension from "../../src/scripts/utils/getDimension";

describe("getDimension", () => {
  it("should convert 0 to 0", () => {
    expect(getDimension(0)).toBe(0);
  });

  it("should convert numbers to px values", () => {
    expect(getDimension(16)).toBe("16px");
    expect(getDimension(32)).toBe("32px");
  });

  it("should handle decimal values", () => {
    expect(getDimension(8.5)).toBe("8.5px");
    expect(getDimension(24.25)).toBe("24.25px");
  });

  it("should handle negative values", () => {
    expect(getDimension(-10)).toBe("-10px");
    expect(getDimension(-5.5)).toBe("-5.5px");
  });

  it("should handle large values", () => {
    expect(getDimension(1000)).toBe("1000px");
    expect(getDimension(9999.99)).toBe("9999.99px");
  });

  it("should handle small positive values", () => {
    expect(getDimension(0.1)).toBe("0.1px");
    expect(getDimension(1.5)).toBe("1.5px");
  });
});
