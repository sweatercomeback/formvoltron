import { AssertionError } from "assert";
import { hasValues } from "./useForm";

describe("hasValue determines if there are values", function() {
  it("determines no values", function() {
    const target = hasValues({});
    expect(target).toEqual(false);
  });
  it("determines no values if key is undefined", function() {
    const target = hasValues({ key1: undefined });
    expect(target).toEqual(false);
  });
  it("determines no values if key is null", function() {
    const target = hasValues({ key1: null });
    expect(target).toEqual(false);
  });
  it("determines no values if key is empty string", function() {
    const target = hasValues({ key1: "" });
    expect(target).toEqual(false);
  });
  it("handles string values", function() {
    const target = hasValues({ value1: "test" });
    expect(target).toEqual(true);
  });
  it("handles date values", function() {
    const target = hasValues({ currentDate: new Date() });
    expect(target).toEqual(true);
  });
  it("handles boolean values", function() {
    const target = hasValues({ isTrue: false });
    expect(target).toEqual(true);
  });
});
