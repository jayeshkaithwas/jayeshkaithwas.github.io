import { ShaderField } from "@/components/hero/ShaderField";
import { SplitText } from "@/components/motion/SplitText";
import { Label, Stat } from "@/components/ui/primitives";
import { PROFILE } from "@/content/site";

/**
 * 0x01 — the hero, and the LCP element.
 *
 * Full bleed: the name runs to both edges of the viewport. The <h1> and the
 * metrics are plain server-rendered text, painted before any JS or font swap.
 */
export function Ignition() {
  return (
    <section
      id="ignition"
      aria-labelledby="ignition-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-12"
    >
      <ShaderField />

      {/* Column rules — the grid made visible, behind everything. */}
      <div aria-hidden className="field-rules -z-10">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="bleed pt-10">
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink pb-3">
          <span className="label tnum text-burnt">0x01</span>
          <Label>{PROFILE.locationShort}</Label>
        </div>

        {/*
          Each line is sized independently so both fill the bleed width: at one
          shared size, "Jayesh" (6 glyphs) is always ~25% short of "Kaithwas"
          (8), which is the dead space on the right. Clash Display runs ~0.685em
          per uppercase glyph, so the sizes are in the inverse 8:6 ratio.

          The vh term is only a safety net for unusually short windows — set
          loose enough that vw wins on any normal laptop, because filling the
          width horizontally is the point.

          The vw factors are measured, not guessed: at a given font size the two
          words render 4.173px and 5.647px wide per pixel of font-size, and the
          line box is the viewport less ~47px of padding. 19.2 / 14.2 is the
          largest pair that still fits a 320px phone, and their ratio matches the
          glyph-width ratio, so both lines come out the same width. The earlier
          22.2 / 16.6 overflowed below ~700px and broke mid-word — "JAYES / H".
          Desktop is unchanged: the rem cap binds there, not the vw term.
        */}
        <h1 id="ignition-title" className="display mt-6 text-ink">
          <span className="block text-[clamp(3rem,min(19.2vw,44vh),19rem)] whitespace-nowrap">
            <SplitText text="Jayesh" stagger={44} />
          </span>
          <span className="block text-[clamp(2.25rem,min(14.2vw,33vh),14.25rem)] whitespace-nowrap">
            <SplitText text="Kaithwas" delay={180} stagger={44} />
          </span>
        </h1>

        <div className="field mt-8">
          <p className="label col-span-4 text-burnt md:col-span-4">{PROFILE.title}</p>
          <p className="text-balance col-span-4 mt-4 font-sans text-xl leading-tight text-ink md:col-span-4 md:mt-0 md:text-2xl xl:col-span-5">
            {PROFILE.thesis}
          </p>
        </div>
      </div>

      <div className="bleed pb-10">
        <div className="field gap-y-8">
          {PROFILE.headlineMetrics.map((m, i) => (
            <div key={m.label} className="col-span-4 md:col-span-4 xl:col-span-3">
              <Stat metric={m} size={i === 0 ? "lg" : "md"} />
            </div>
          ))}
          <div className="col-span-4 hidden items-end justify-end md:col-span-8 xl:col-span-3 xl:flex">
            <span aria-hidden className="label text-ink-3">
              Scroll ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
