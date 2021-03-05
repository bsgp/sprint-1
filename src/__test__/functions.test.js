const onBarcodeSubmit = require("../functions/onBarcodeSubmit");
const getItemGroups = require("../functions/getItemGroups");
const getItemPayloads = require("../functions/getItemPayloads");

const { task, groups } = require("../store");

describe("Functions", () => {
  it("onBarcodeSubmit is a function", () => {
    expect(onBarcodeSubmit).toBeInstanceOf(Function);
  });

  it("select matched item", () => {
    onBarcodeSubmit("WRAP 20191127");
    expect(task.items[8].selected).toBe(true);

    onBarcodeSubmit("WRAP 20191123");
    expect(task.items[9].selected).toBe(true);
    expect(task.items[9].iStockID).toBe("20191123");

    onBarcodeSubmit("PALLET 20191123");
    expect(task.items[0].selected).toBe(true);

    onBarcodeSubmit("LABEL-2.0 20191122");
    expect(task.items[10].selected).toBe(true);
  });

  it("getItemGroups is a function", () => {
    expect(getItemGroups).toBeInstanceOf(Function);
  });

  it("getItemGroups should return a correct value", () => {
    const groups = [
      [
        {
          deliveryQuantity: 1,
          iStockID: "20191123",
          lineItemID: "1",
          originalItemID: "1",
          productID: "PALLET",
          selected: true,
          targetLogisticsArea: { id: "101-10", text: "원자재창고" },
          unitCode: "EA",
        },
        {
          deliveryQuantity: 1,
          iStockID: "20191127",
          lineItemID: "2-3",
          originalItemID: "2",
          productID: "WRAP",
          selected: true,
          targetLogisticsArea: { id: "101-10", text: "원자재창고" },
          unitCode: "MTR",
        },
        {
          deliveryQuantity: 1,
          iStockID: "20191122",
          lineItemID: "5-2",
          originalItemID: "5",
          productID: "LABEL-2.0",
          selected: true,
          targetLogisticsArea: { id: "101-10", text: "원자재창고" },
          unitCode: "MTR",
        },
      ],
      [
        {
          deliveryQuantity: 1,
          iStockID: "20191123",
          lineItemID: "2-4",
          originalItemID: "2",
          productID: "WRAP",
          selected: true,
          targetLogisticsArea: { id: "101-10", text: "원자재창고" },
          unitCode: "MTR",
        },
      ],
    ];
    expect(getItemGroups(task)).toEqual(groups);
  });

  it("getItemPayloads is a function", () => {
    expect(getItemPayloads).toBeInstanceOf(Function);
  });

  it("getItemPayloads should return a correct value", () => {
    const result = [
      [
        {
          ProductID: "PALLET",
          ActualQuantity: { unitCode: "EA", _value_1: 1 },
          IdentifiedStockID: "20191123",
          TargetLogisticsAreaID: "101-10",
        },
        {
          ProductID: "WRAP",
          IdentifiedStockID: "20191127",
          TargetLogisticsAreaID: "101-10",
          SplitIndicator: true,
        },
        {
          ActualQuantity: { unitCode: "MTR", _value_1: 1 },
          IdentifiedStockID: "20191127",
          TargetLogisticsAreaID: "101-10",
        },
        {
          ProductID: "LABEL-2.0",
          IdentifiedStockID: "20191122",
          TargetLogisticsAreaID: "101-10",
          SplitIndicator: true,
        },
        {
          ActualQuantity: { unitCode: "MTR", _value_1: 1 },
          IdentifiedStockID: "20191122",
          TargetLogisticsAreaID: "101-10",
        },
      ],
      [
        {
          ProductID: "WRAP",
          IdentifiedStockID: "20191127",
          TargetLogisticsAreaID: "101-10",
          SplitIndicator: true,
        },
        {
          ActualQuantity: { unitCode: "MTR", _value_1: 1 },
          IdentifiedStockID: "20191123",
          TargetLogisticsAreaID: "101-10",
        },
      ],
    ];
    expect(getItemPayloads(task, groups)).toEqual(result);
  });
});
