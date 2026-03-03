import type { Int } from "#scripts/types";


export class Timestamp
{
  mins:   Int;
  secs:   Int;
  frames: Int;

  constructor(mins?: Int, secs?: Int, frames?: Int)
  {
    this.mins = mins ?? 0;
    this.secs = secs ?? 0;
    this.frames = frames ?? 0;
  }

  shifted(duration: Timestamp): Timestamp
  {
    return new Timestamp(
      this.mins + (duration.mins ?? 0),
      this.secs + (duration.secs ?? 0),
      this.frames + (duration.frames ?? 0),
    );
  }

  raw(): string
  {
    let m = this.mins.toString().padStart(2, "0");
    let s = this.secs.toString().padStart(2, "0");
    let f = this.frames.toString().padStart(2, "0");

    return [m, s, f].join(":")
  }

  to_json(): object
  {
    return {
      mins: this.mins,
      secs: this.secs,
      frames: this.frames,
    };
  }

  static from_json(data?: Record<string, number>): Timestamp
  {
    return new Timestamp(data?.mins, data?.secs, data?.frames);
  }
}
