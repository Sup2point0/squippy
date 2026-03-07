import { Subtitle, Timeframe, type Int } from "#scripts/types";


const TIMESTAMP = /(?:(\d+):)?(?:(\d+):)(\d+)(?:[,.](\d+))?/.source;
const SEPARATOR = / *--> */.source;
const RE_TIMESTAMPS = new RegExp(TIMESTAMP + SEPARATOR + TIMESTAMP);

const IDX_START = 1;
const IDX_END   = 5;


enum Ctx {
  COUNT,
  TIMESTAMPS,
  BODY,
  RECOVER,
}


export function parse_srt(src: string, framerate: Int): Subtitle[]
{
  let out = [];

  let ctx = Ctx.COUNT;
  let i = 1;
  let data = null;

  for (let line of src.split(/\r?\n/))
  {
    // console.log(`i = ${i}; ctx = ${Ctx[ctx]}; code = ${line.charCodeAt(0)}; line = ${line}`);

    switch (ctx) {
      case Ctx.COUNT:
        if (parseInt(line) !== i) continue;
        ctx = Ctx.TIMESTAMPS;
        
        data = {
          start: null,
          end: null,
          duration: null,
          body: "",
        };
        break;

      case Ctx.TIMESTAMPS:
        let matches = line.match(RE_TIMESTAMPS);
        if (!matches) continue;

        ctx = Ctx.BODY;

        {
          let mins = matches[IDX_START + 1];
          let secs = matches[IDX_START + 2];
          let milli = matches[IDX_START + 3];

          data!.start = new Timeframe(
            mins && parseInt(mins),
            secs && parseInt(secs),
            milli && Math.round(framerate * parseInt(milli) / 1000),
          );
        }
        {
          let mins = matches[IDX_END + 1];
          let secs = matches[IDX_END + 2];
          let milli = matches[IDX_END + 3];

          data!.end = new Timeframe(
            mins && parseInt(mins),
            secs && parseInt(secs),
            milli && Math.round(framerate * parseInt(milli) / 1000),
          );
        }
        // TODO: Set duration

        break;

      case Ctx.BODY:
        if (line.length === 0) {
          ctx = Ctx.COUNT;
          out.push(new Subtitle(data ?? undefined));
          data = null;
          i++;
        }
        else {
          data!.body += line;
        }
        break;
    }
  }

  if (data) {
    out.push(new Subtitle(data));
  }

  return out;
}
