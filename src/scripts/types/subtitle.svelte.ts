import { Timestamp } from "#scripts/types";


export class Subtitle
{
  start:    Timestamp = $state(new Timestamp());
  duration: Timestamp | null = $state(null);
  end:      Timestamp | null = $state(null);
  
  body: string = $state("");

  constructor(data: {
    start: Timestamp,
    duration?: Timestamp,
    end?: Timestamp,
    body: string,
  })
  {
    this.start = data.start ?? new Timestamp();
    this.duration = data.duration ?? null;
    this.end = data.end ?? null;
    this.body = data.body ?? "";

    if (this.duration === null && this.end === null) {
      console.warn("Subtitle instantiated with no duration or endpoint set, defaulting to 1 second duration");
      this.duration = new Timestamp(0, 1);
    }
  }

  calc_end(): Timestamp
  {
    return (
      this.end ?? this.start.shifted(this.duration ?? new Timestamp(0, 1))
    );
  }

  export_raw(): string
  {
    let start = this.start.raw();
    let end   = this.calc_end().raw();
    let body  = this.body;
    
    return `${start} --> ${end}\n${body}`;
  }

  to_json(): object
  {
    console.log("this =", this);
    return {
      start:    this.start.to_json(),
      duration: this.duration?.to_json() ?? null,
      end:      this.end?.to_json() ?? null,
      body:     this.body,
    };
  }

  static from_json(data: Record<string, any>)
  {
    return new Subtitle({
      start:    Timestamp.from_json(data.start),
      duration: Timestamp.from_json(data.duration),
      end:      Timestamp.from_json(data.end),
      body:     data.body,
    });
  }
}
