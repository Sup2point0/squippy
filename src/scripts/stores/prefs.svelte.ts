import { persisted } from "svelte-persisted-store";

import { Timeframe } from "#scripts/types";


export class PrefsData
{
  /** The target framerate for the subtitles, which determines the maximum frame values and how adding frames works. */
  framerate: number = $state(60);

  /** The default duration subtitles will last for if unspecified. */
  default_duration: Timeframe = $state(new Timeframe(0, 3));


  to_json(): string
  {
    return JSON.stringify({
      framerate: this.framerate,
      default_duration: this.default_duration.to_json(),
    });
  }

  static from_json(json: string): PrefsData
  {
    let data = JSON.parse(json);

    let out = new PrefsData();

    if (data.framerate)        out.framerate        = data.framerate;
    if (data.default_duration) out.default_duration = data.default_duration;

    return out;
  }
}


export const prefs = persisted("squippy.prefs", new PrefsData(), {
  syncTabs: true,
  serializer: {
    parse:     (json: string)    => PrefsData.from_json(json),
    stringify: (data: PrefsData) => data.to_json(),
  },
});
