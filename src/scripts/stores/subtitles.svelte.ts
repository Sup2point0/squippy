import { persisted } from "svelte-persisted-store";

import { Timeframe, Subtitle } from "#scripts/types";


export class SubtitlesData
{
  subs: Subtitle[] = $state([]);

  react()
  {
    subtitles.update(v => v);
  }

  /** Change the ordering of one subtitle to be either 1 position or 1 position later. */
  reorder_in(subtitle: Subtitle, direction: "up" | "down"): boolean
  {
    let idx = this.subs.indexOf(subtitle);
    if (idx === -1) return false;

    switch (direction) {
      case "up":
        if (idx === 0) return false;
        [this.subs[idx-1], this.subs[idx]] = [this.subs[idx], this.subs[idx-1]];
        break;

      case "down":
        if (idx === (this.subs.length - 1)) return false;
        [this.subs[idx], this.subs[idx+1]] = [this.subs[idx+1], this.subs[idx]];
        break;
    }

    this.react();

    return true;
  }

  delete(subtitle: Subtitle): boolean
  {
    let idx = this.subs.indexOf(subtitle);

    if (idx === -1) {
      return false;
    }
    
    this.subs.splice(idx, 1);
    this.react();

    return true;
  }

  export_raw(default_duration: Timeframe): string
  {
    let lines = [];
    let last_timestamp = new Timeframe();

    for (let [i, sub] of this.subs.entries())
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
      subtitles: this.subs.map(sub => sub.to_json())
    });

    return out;
  }

  static from_json(json: string): SubtitlesData
  {
    let data = JSON.parse(json);

    let out = new SubtitlesData();
    out.subs = data.subtitles?.map(sub => Subtitle.from_json(sub)) ?? out.subs;

    return out;
  }
}


export const subtitles = persisted("sub2.0-session-data", new SubtitlesData(), {
  syncTabs: true,
  serializer: {
    parse:     (json: string)      => SubtitlesData.from_json(json),
    stringify: (data: SubtitlesData) => data.to_json(),
  },
});
