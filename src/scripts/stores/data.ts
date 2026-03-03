import { persisted } from "svelte-persisted-store";

import { Timestamp, type Subtitle } from "#scripts/types";


export class SessionData
{
  subtitles: Subtitle[] = [
    {
      start: new Timestamp(),
      body: "sup world"
    },
    {
      start: new Timestamp(),
      body: "sup world"
    },
    {
      start: new Timestamp(),
      body: "sup world"
    },
    {
      start: new Timestamp(),
      body: "sup world"
    },
    {
      start: new Timestamp(),
      body: "sup world"
    },
  ];

  export_raw(): string
  {
    return (
      this.subtitles
        .entries()
        .map(([i, sub]) => {
          let j     = i + 1;
          let start = sub.start.raw();
          let end   = sub.end?.raw() ?? start;
          let body  = sub.body;
          
          return `${j}\n${start} --> ${end}\n${body}`;
        })
        .toArray()
        .join("\n\n")
    );
  }
}


export const data = persisted("sub2.0-session-data", new SessionData());
