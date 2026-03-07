import type { Int } from "#scripts/types";


/** A measure of time in a subtitling context, consisting of minute, second and frame components. Can be used as both a single timestamp or duration to be used with other `Timeframe`s. */
export class Timeframe
{
  mins:   Int | null;
  secs:   Int | null;
  frames: Int | null;


  constructor(mins?: Int | null, secs?: Int | null, frames?: Int | null)
  {
    this.mins = mins ?? null;
    this.secs = secs ?? null;
    this.frames = frames ?? null;
  }


  is_empty(): boolean
  {
    return (this.mins == null && this.secs == null && this.frames == null);
  }

  is_nonempty(): boolean
  {
    return !this.is_empty();
  }

  /** Is this timeframe valid? i.e. has every component been set? */
  is_valid(): boolean
  {
    return (this.mins != null && this.secs != null && this.frames != null);
  }

  /** Return this timeframe if it is valid, otherwise return `null`. */
  check(): Timeframe | null
  {
    return this.is_valid() ? this : null
  }

  /** (out-of-place) Return this timeframe shifted by `duration` as a new `Timeframe`. */
  shifted(duration: Timeframe): Timeframe
  {
    return new Timeframe(
      (this.mins ?? 0) + (duration.mins ?? 0),
      (this.secs ?? 0) + (duration.secs ?? 0),
      (this.frames ?? 0) + (duration.frames ?? 0),
    );
  }

  /** Render this timeframe in the format `mm:ss::ff`. */
  display(framerate: Int): string
  {
    let m = (this.mins ?? 0).toString().padStart(2, "0");
    let s = (this.secs ?? 0).toString().padStart(2, "0");

    let f = Math.round(((this.frames ?? 0) / framerate) * 1000);
    let ms = f.toString().padStart(3, "0");

    return `00:${m}:${s},${ms}`;
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
