import { Daemon } from "@/components/daemon/Daemon";
import { Hud } from "@/components/hud/Hud";
import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/Preloader";

/** Chrome for every page: the home page plus /projects/, /certificates/ and /resume/. */
export default function DaemonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-paper text-ink">
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Hud />
      <main id="main">{children}</main>
      <Daemon />
    </div>
  );
}
