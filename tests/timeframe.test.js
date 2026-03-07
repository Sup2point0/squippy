import { test, assert } from "vitest";

import { Timeframe as Tfr } from "#scripts/types";


const FPS = 60;

const Tf = (m, s, f) => new Tfr(m, s, f);


test("earlier-than", () =>
{
  assert.isTrue( Tf(0, 0, 0).earlier_than(Tf(0, 0, 1)) );
  assert.isTrue( Tf(0, 1, 0).earlier_than(Tf(0, 1, 1)) );
  assert.isTrue( Tf(1, 1, 0).earlier_than(Tf(1, 1, 1)) );
  assert.isTrue( Tf(1, 1, 1).earlier_than(Tf(1, 2, 0)) );

  assert.isTrue( Tf(0, 1, 0).earlier_than(Tf(1, 0, 0)) );

  assert.isFalse( Tf(0, 0, 0).earlier_than(Tf(0, 0, 0)) );
  assert.isFalse( Tf(1, 1, 1).earlier_than(Tf(1, 1, 1)) );
  assert.isFalse( Tf(1, 0, 0).earlier_than(Tf(0, 1, 0)) );
});

test("difference", () =>
{
  let received;

  assert.deepEqual( Tfr.difference(Tf(0, 0, 0), Tf(0, 0, 0), FPS), Tf(0, 0, 0) );
  assert.deepEqual( Tfr.difference(Tf(0, 0, 0), Tf(0, 0, 1), FPS), Tf(0, 0, 1) );
  assert.deepEqual( Tfr.difference(Tf(0, 0, 0), Tf(0, 1, 0), FPS), Tf(0, 1, 0) );
  assert.deepEqual( Tfr.difference(Tf(0, 0, 0), Tf(1, 0, 0), FPS), Tf(1, 0, 0) );

  assert.deepEqual( Tfr.difference(Tf(0, 1, 0), Tf(1, 0, 0), FPS), Tf(0, 59, 0) );
  assert.deepEqual( Tfr.difference(Tf(0, 59, 0), Tf(1, 0, 0), FPS), Tf(0, 1, 0) );
  assert.deepEqual( Tfr.difference(Tf(0, 0, 1), Tf(1, 0, 0), FPS), Tf(0, 59, 59) );
});
