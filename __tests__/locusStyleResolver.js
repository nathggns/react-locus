import resolveStyles from "../src/locusStyleResolver";
import nthCheck from "../src/nth-check";

jest.mock("../src/nth-check", () => jest.fn(() => false));

describe("resolveStyles", () => {
  beforeEach(() => {
    nthCheck.mockReset();
  });
  it("does nothing with a regular set of styles", () => {
    const styles = Object.freeze({ color: "blue", backgroundColor: "red" });
    expect(resolveStyles(styles, { position: 0 })).toEqual(styles);
  });

  it("applies first-child styles if locus is first child", () => {
    const styles = Object.freeze({
      color: "blue",
      ":first-child": { color: "yellow" }
    });

    expect(resolveStyles(styles, { position: 0 })).toEqual({ color: "yellow" });
  });

  it("does not apply first-child styles if locus is not first child", () => {
    const styles = Object.freeze({
      color: "blue",
      ":first-child": { color: "yellow" }
    });

    expect(resolveStyles(styles, { position: 1 })).toEqual({ color: "blue" });
  });

  it("applies last-child styles if locus is last child", () => {
    const styles = Object.freeze({
      color: "blue",
      ":last-child": { color: "yellow" }
    });

    expect(resolveStyles(styles, { position: 5, total: 6 })).toEqual({
      color: "yellow"
    });
  });

  it("does not apply last-child styles if locus is not last child", () => {
    const styles = Object.freeze({
      color: "blue",
      ":last-child": { color: "yellow" }
    });

    expect(resolveStyles(styles, { position: 1, total: 6 })).toEqual({
      color: "blue"
    });
  });

  it("applies nth-child styles if locus is nth child", () => {
    nthCheck.mockReturnValue(true);
    const styles = Object.freeze({
      color: "blue",
      ":nth-child(6n-3)": { color: "yellow" }
    });

    expect(resolveStyles(styles, { position: 5, total: 6 })).toEqual({
      color: "yellow"
    });
  });

  it("integrates with nth-check correctly", () => {
    nthCheck.mockImplementationOnce(
      jest.requireActual("../src/nth-check").default
    );

    const styles = Object.freeze({
      color: "blue",
      ":nth-child(2n+1)": { color: "yellow" }
    });

    expect(resolveStyles(styles, { position: 0, total: 6 })).toEqual({
      color: "yellow"
    });
  });

  it("does not apply nth-child styles if locus is not nth child", () => {
    nthCheck.mockReturnValue(false);
    const styles = Object.freeze({
      color: "blue",
      ":nth-child(6n-3)": { color: "yellow" }
    });

    expect(resolveStyles(styles, { position: 1, total: 6 })).toEqual({
      color: "blue"
    });
  });

  it("correctly checks nth-child", () => {
    nthCheck.mockReturnValue(false);
    const styles = Object.freeze({
      color: "blue",
      ":nth-child(6n-3)": { color: "yellow" }
    });

    resolveStyles(styles, { position: 1, total: 6 });

    expect(nthCheck).toHaveBeenCalledWith("6n-3", 1);
  });
});
