import { persisted } from "svelte-persisted-store";

import type { Subtitle } from "#scripts/types";


export class SessionData
{
  subtitles: Subtitle[] = [
    {
      start: 0,
      body: "sup world"
    }
  ];
}


export const data = persisted("sub2.0-session-data", new SessionData());
