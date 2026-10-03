import SectionHeading from "../shared/SectionHeading.jsx";
import KissCounter from "./silly/KissCounter.jsx";
import DoYouLoveMe from "./silly/DoYouLoveMe.jsx";
import HugButton from "./silly/HugButton.jsx";
import ComplimentMachine from "./silly/ComplimentMachine.jsx";

export default function SillyStuff() {
  return (
    <section id="games" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="unserious, on purpose"
        title="silly relationship stuff"
        subtitle="don't overthink this part."
      />
      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        <KissCounter />
        <DoYouLoveMe />
        <HugButton />
        <ComplimentMachine />
      </div>
    </section>
  );
}
