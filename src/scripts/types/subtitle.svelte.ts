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

  _textarea?: HTMLElement;


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

    this._textarea = undefined;
  }


  /** Alter either the starting timestamp, ending timestamp, or duration of this subtitle, initialising it if it was previously unset, or uninitialising it if all components have been cleared. */
  set(
    field: "start" | "end" | "duration",
    data: {
      mins?: number | null,
      secs?: number | null,
      frames?: number | null,
    }
  )
  {
    if (this[field] == null) {
      this[field] = new Timeframe(data.mins ?? 0, data.secs ?? 0, data.frames ?? 0);
    }
    else {
      if (data.mins !== undefined) this[field].mins = data.mins;
      if (data.secs !== undefined) this[field].secs = data.secs;
      if (data.frames !== undefined) this[field].frames = data.frames;
    }
    
    if (
        this[field].mins == null
      && this[field].secs == null
      && this[field].frames == null
    ) {
      this[field] = null;
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
