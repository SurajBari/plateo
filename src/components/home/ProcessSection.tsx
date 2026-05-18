const steps = [
  { title: "Clay Selection", detail: "Fine alluvial clay is sourced and purified for food-safe composition." },
  { title: "Wheel Shaping", detail: "Master potters hand-throw each form to maintain traditional character." },
  { title: "Fire & Finish", detail: "Low-carbon kiln process delivers strength, warmth, and natural terracotta tone." },
];

export default function ProcessSection() {
  return (
    <section id="process" className="px-6 py-20 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-5xl font-semibold text-ink md:text-6xl">Our Process</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="paper-card rounded-sm p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-terracotta">0{index + 1}</p>
              <h3 className="mt-3 text-3xl font-medium text-ink">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
