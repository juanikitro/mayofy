import { introScript } from "@/lib/intro";
import { IntroRouteEntry } from "@/components/world/intro-route-entry";

/** Mount first inside the home world so the parser can establish the empty sky before content. */
export function IntroScript() {
  return <IntroRouteEntry source={introScript()} />;
}
