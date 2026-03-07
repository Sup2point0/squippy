import { test, assert } from "vitest";

import { Timeframe } from "#scripts/types";


test("earlier-than", () =>
{
  assert.isTrue(new Timeframe(0, 0, 0).earlier_than(new Timeframe(0, 0, 1)));
  assert.isTrue(new Timeframe(0, 1, 0).earlier_than(new Timeframe(0, 1, 1)));
  assert.isTrue(new Timeframe(1, 1, 0).earlier_than(new Timeframe(1, 1, 1)));
  assert.isTrue(new Timeframe(1, 1, 1).earlier_than(new Timeframe(1, 2, 0)));

  assert.isFalse(new Timeframe(0, 0, 0).earlier_than(new Timeframe(0, 0, 0)));
  assert.isFalse(new Timeframe(1, 1, 1).earlier_than(new Timeframe(1, 1, 1)));
});
