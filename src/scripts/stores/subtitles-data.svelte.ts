import { persisted } from "svelte-persisted-store";

import { Timeframe, Subtitle, type Int } from "#scripts/types";
import type { PrefsData } from "#scripts/stores";


export class SubtitlesData
{
  subs: Subtitle[] = $state([]);

  focused: Subtitle | null = null;


  react()
  {
    subtitles.update(v => v);
  }

  sync_focus()
  {
    this.focused?._textarea?.focus();
    this.focused?._textarea?.scrollIntoView({ behavior: "smooth" });
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
        if (idx === this.subs.length - 1) return false;
        [this.subs[idx], this.subs[idx+1]] = [this.subs[idx+1], this.subs[idx]];
        break;
    }

    this.react();

    return true;
  }

  /** Change the ordering of one subtitle to a new index in the list. */
  reorder_to_by_idx(index: Int, new_index: Int, correct?: boolean): boolean
  {
    let idx = new_index - (index < new_index && correct ? 1 : 0);
    let sub = this.subs.splice(index, 1)[0];
    this.subs.splice(idx, 0, sub);

    return true;
  }

  reorder_before_by_id(subtitle_id: Int, target_id: Int): boolean
  {
    let i = this.subs.findIndex(sub => sub.id === subtitle_id);
    if (i === -1) return false;
    
    let j = this.subs.findIndex(sub => sub.id === target_id);
    if (j === -1) return false;

    return this.reorder_to_by_idx(i, j, true);
  }

  reorder_after_by_id(subtitle_id: Int, target_id: Int): boolean
  {
    let i = this.subs.findIndex(sub => sub.id === subtitle_id);
    if (i === -1) return false;
    
    let j = this.subs.findIndex(sub => sub.id === target_id);
    if (j === -1) return false;

    return this.reorder_to_by_idx(i, j, false);
  }

  focus(subtitle: Subtitle): boolean
  {
    if (!subtitle._textarea) return false;

    subtitle._textarea.focus();
    this.focused = subtitle;

    return true;
  }

  change_focus(subtitle: Subtitle, direction: "previous" | "next"): boolean
  {
    let idx = this.subs.indexOf(subtitle);
    if (idx === -1) return false;

    switch (direction) {
      case "previous":
        if (idx === 0) {
          idx = this.subs.length;
        }
        this.focus(this.subs[idx-1]);
        break;

      case "next":
        if (idx === this.subs.length - 1) {
          idx = -1;
        }
        this.focus(this.subs[idx+1]);
        break;
    }

    return true;
  }

  /** Delete the given `subtitle`. */
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

  /** Export the subtitles to SRT format. */
  export_raw(prefs: PrefsData): string
  {
    let lines = [];
    let last_timestamp = new Timeframe();

    for (let [i, sub] of this.subs.entries())
    {
      let start: Timeframe = sub.start?.check() ?? last_timestamp;
      let end:   Timeframe = sub.end_or_from(start, prefs.default_duration);

      let frags = [
        `${i+1}`,
        `${start.display(prefs.framerate)} --> ${end.display(prefs.framerate)}`,
        sub.body,
      ];

      lines.push(frags.join("\n"));
      last_timestamp = end;
    }

    return lines.join("\n\n");
  }


  to_json(): string
  {
    return JSON.stringify({
      subtitles: this.subs.map(sub => sub.to_json())
    });
  }

  static from_json(json: string): SubtitlesData
  {
    let data = JSON.parse(json);

    let out = new SubtitlesData();
    /* @ts-ignore */
    out.subs = data.subtitles?.map(sub => Subtitle.from_json(sub)) ?? out.subs;

    return out;
  }
}


/** The global subtitles store. */
export const subtitles = persisted("squippy.subs", new SubtitlesData(), {
  syncTabs: true,
  serializer: {
    parse:     (json: string)      => SubtitlesData.from_json(json),
    stringify: (data: SubtitlesData) => data.to_json(),
  },
});
