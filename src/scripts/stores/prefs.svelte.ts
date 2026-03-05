import { persisted } from "svelte-persisted-store";

import { Timeframe } from "#scripts/types";


export class PrefsData
{
  /** The target framerate for the subtitles, which determines the maximum frame values and how adding frames works. */
  framerate: number = $state(60);

  /** The default duration subtitles will last for if unspecified. */
  default_duration: Timeframe = $state(new Timeframe(0, 3));

  /** Should potentially distracting UI tidbits be shown? */
  show_flavour: boolean = $state(true);


  to_json(): string
  {
    return JSON.stringify({
      framerate:        this.framerate,
      default_duration: this.default_duration.to_json(),
      show_flavour:     this.show_flavour,
    });
  }

  static from_json(json: string): PrefsData
  {
    let data = JSON.parse(json);

    let out = new PrefsData();

    for (let [key, value] of Object.entries(data)) {
      if (key in out && value) {
        /* @ts-ignore */
        out[key] = value;
      }
    }

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
