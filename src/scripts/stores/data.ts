import { persisted } from "svelte-persisted-store";

import { Timeframe, Subtitle } from "#scripts/types";


export class SessionData
{
  subtitles: Subtitle[] = [];

  export_raw(default_duration: Timeframe): string
  {
    let lines = [];
    let last_timestamp = new Timeframe();

    for (let [i, sub] of this.subtitles.entries())
    {
      let start: Timeframe = sub.start ?? last_timestamp;
      let end:   Timeframe = sub.calc_end_from(start, default_duration);

      let frags = [
        `${i+1}`,
        `${start.display()} --> ${end.display()}`,
        sub.body,
      ];

      lines.push(frags.join("\n"));
      last_timestamp = end;
    }

    return lines.join("\n\n");
  }

  to_json(): string
  {
    let out = JSON.stringify({
      subtitles: this.subtitles.map(sub => sub.to_json())
    });

    return out;
  }

  static from_json(json: string): SessionData
  {
    let data = JSON.parse(json);

    let out = new SessionData();
    out.subtitles = data.subtitles?.map(sub => Subtitle.from_json(sub)) ?? out.subtitles;

    return out;
  }
}


export const data = persisted("sub2.0-session-data", new SessionData(), {
  syncTabs: true,
  serializer: {
    parse:     (json: string)      => SessionData.from_json(json),
    stringify: (data: SessionData) => data.to_json(),
  },
});
