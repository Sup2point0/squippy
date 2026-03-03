import { Timeframe } from "#scripts/types";


export class Subtitle
{
  /** The starting timestamp of the subtitle. If none provided, it will be auto-calculated relative to the end of the previous subtitle, using global defaults. */
  start: Timeframe | null = $state(null);

  /** How long the subtitle should last for. If `end` is explicitly provided, this is ignored. If none provided, the global default will be used instead. */
  duration: Timeframe | null = $state(null);

  /** The ending timestamp of the subtitle. If none provided, it will be auto-calculated using `.duration` and `.start`. */
  end: Timeframe | null = $state(null);

  /** The text contained in the subtitle. */
  body: string = $state("");


  constructor(data?: {
    start?:    Timeframe | null,
    duration?: Timeframe | null,
    end?:      Timeframe | null,
    body:      string,
  })
  {
    this.start    = data?.start    ?? null;
    this.duration = data?.duration ?? null;
    this.end      = data?.end      ?? null;
    this.body     = data?.body     ?? "";
  }


  /** Alter the starting timestamp of this subtitle, initialising it if it was previously unset. */
  set_start(data: { mins?: number, secs?: number, frames?: number })
  {
    if (this.start === null) {
      this.start = new Timeframe(data.mins, data.secs, data.frames);
    }
    else {
      if (data.mins) this.start.mins = data.mins;
      if (data.secs) this.start.secs = data.secs;
      if (data.frames) this.start.frames = data.frames;
    }
  }

  /** Alter the ending timestamp of this subtitle, initialising it if it was previously unset. */
  set_end(data: { mins?: number, secs?: number, frames?: number })
  {
    if (this.end === null) {
      this.end = new Timeframe(data.mins, data.secs, data.frames);
    }
    else {
      if (data.mins) this.end.mins = data.mins;
      if (data.secs) this.end.secs = data.secs;
      if (data.frames) this.end.frames = data.frames;
    }
  }

  calc_end_from(start: Timeframe, default_duration: Timeframe): Timeframe
  {
    return start.shifted(this.duration ?? default_duration);
  }


  to_json(): object
  {
    return {
      start:    this.start?.to_json()    ?? null,
      duration: this.duration?.to_json() ?? null,
      end:      this.end?.to_json()      ?? null,
      body:     this.body,
    };
  }

  static from_json(data: Record<string, any>)
  {
    return new Subtitle({
      start:    Timeframe.from_json(data.start),
      duration: Timeframe.from_json(data.duration),
      end:      Timeframe.from_json(data.end),
      body:     data.body,
    });
  }
}
