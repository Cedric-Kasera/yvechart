export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Choose Your Stack",
      description:
        "Select from hundreds of predefined technology icons and components.",
    },
    {
      id: "02",
      title: "Connect & Configure",
      description:
        "Link services together, define protocols, and set properties for each node.",
    },
    {
      id: "03",
      title: "Export & Share",
      description:
        "Generate infrastructure code or share a readonly link with your stakeholders.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-bg-canvas py-24 sm:py-32 border-t border-b border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How YveChart works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Go from idea to documented architecture in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
            >
              <span className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-xl font-bold text-white shadow-md ring-4 ring-white">
                {step.id}
              </span>
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-center text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
