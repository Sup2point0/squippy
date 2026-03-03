import { Timeframe, type Int } from "#scripts/types";


export class Subtitle
{
  static id_count = 0;

  id: Int;

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
    Subtitle.id_count++;
    this.id = Subtitle.id_count;

    this.start    = data?.start    ?? null;
    this.duration = data?.duration ?? null;
    this.end      = data?.end      ?? null;
    this.body     = data?.body     ?? "";
  }


  /** Alter the starting timestamp of this subtitle, initialising it if it was previously unset, or uninitialising it if all components have been cleared. */
  set_start(data: {
    mins?: number | null,
    secs?: number | null,
    frames?: number | null,
  })
  {
    if (this.start == null) {
      this.start = new Timeframe(data.mins, data.secs, data.frames);
    }
    else {
      if (data.mins !== undefined) this.start.mins = data.mins;
      if (data.secs !== undefined) this.start.secs = data.secs;
      if (data.frames !== undefined) this.start.frames = data.frames;
    }
    
    if (
        this.start.mins == null
      && this.start.secs == null
      && this.start.frames == null
    ) {
      this.start = null;
    }
  }

  /** Alter the ending timestamp of this subtitle, initialising it if it was previously unset, or uninitialising it if all components have been cleared. */
  set_end(data: {
    mins?: number | null,
    secs?: number | null,
    frames?: number | null,
  })
  {
    if (this.end == null) {
      this.end = new Timeframe(data.mins, data.secs, data.frames);
    }
    else {
      if (data.mins !== undefined) this.end.mins = data.mins;
      if (data.secs !== undefined) this.end.secs = data.secs;
      if (data.frames !== undefined) this.end.frames = data.frames;
    }
    
    if (
        this.end.mins == null
      && this.end.secs == null
      && this.end.frames == null
    ) {
      this.end = null;
    }
  }

  /** Get the specified ending timestamp of this subtitle if set. Otherwise calculate it from `start`, using the duration of this subtitle if set, otherwise using `default_duration`. */
  end_or_from(start: Timeframe, default_duration: Timeframe): Timeframe
  {
    return this.end?.check() ?? start.shifted(this.duration?.check() ?? default_duration);
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
