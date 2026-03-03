import type { Int } from "#scripts/types";


/** A measure of time in a subtitling context, consisting of minute, second and frame markers. Can be used as both a single timestamp or duration to be used with other `Timeframe`s. */
export class Timeframe
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

  /** (out-of-place) Return this timeframe shifted by `duration` as a new `Timeframe`. */
  shifted(duration: Timeframe): Timeframe
  {
    return new Timeframe(
      this.mins + (duration.mins ?? 0),
      this.secs + (duration.secs ?? 0),
      this.frames + (duration.frames ?? 0),
    );
  }

  /** Render this timeframe in the format `mm:ss::ff`. */
  display(): string
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

  static from_json(data?: Record<string, number>): Timeframe | null
  {
    return data ? new Timeframe(data.mins, data.secs, data.frames) : null;
  }
}
