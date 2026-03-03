import { persisted } from "svelte-persisted-store";

import { Timestamp, Subtitle } from "#scripts/types";


export class SessionData
{
  subtitles: Subtitle[] = [];

  export_raw(): string
  {
    return (
      this.subtitles
        .entries()
        .map(([i, sub]) => {
          let j    = i + 1;
          let line = sub.export_raw();
          return `${j}\n${line}`;
        })
        .toArray()
        .join("\n\n")
    );
  }

  to_json(): string
  {
    let out = JSON.stringify({
      subtitles: this.subtitles.map(sub => sub.to_json())
    });

    console.log("to_json =", out);

    return out;
  }

  static from_json(json: string): SessionData
  {
    let data = JSON.parse(json);
    console.log("data =", data);
    
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
