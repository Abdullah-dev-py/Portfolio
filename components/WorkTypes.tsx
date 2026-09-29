import { Reveal } from "./Reveal";
import Carousel02 from "./carousel-02";

export function WorkTypes() {
  return (
    <section aria-labelledby="types-h" className="border-t border-black/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <h2
            id="types-h"
            className="text-center text-4xl font-semibold tracking-tighter sm:text-5xl"
          >
            The kind of work I do
          </h2>
        </Reveal>
        <div className="mx-auto mt-10 w-full max-w-6xl">
          <Carousel02 />
        </div>
      </div>
    </section>
  );
}
