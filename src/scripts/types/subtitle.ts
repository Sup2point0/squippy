import type { Duration } from "#scripts/types";


export interface Subtitle
{
  start:     Duration;
  duration?: Duration;
  end?:      Duration;
  
  body:     string;
}
