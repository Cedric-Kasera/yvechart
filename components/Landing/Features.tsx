import {
  PuzzlePieceIcon,
  CursorArrowRaysIcon,
  CodeBracketIcon,
  UsersIcon,
  Square3Stack3DIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Drag & Drop Canvas",
    description:
      "Intuitively build your system architecture with a smooth, infinite canvas interface designed for speed.",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Real-time Collaboration",
    description:
      "Work with your team in real-time. See changes as they happen and comment on specific components.",
    icon: UsersIcon,
  },
  {
    name: "Export to Code",
    description:
      "Don't just draw pictures. Export your charts to Terraform, Docker Compose, or raw JSON configurations.",
    icon: CodeBracketIcon,
  },
  {
    name: "Component Library",
    description:
      "Access a rich library of pre-built components for AWS, Azure, GCP, and generic system design patterns.",
    icon: PuzzlePieceIcon,
  },
  {
    name: "Layered Visualization",
    description:
      "Group services into logical layers. Drill down into specific subsystems without losing context.",
    icon: Square3Stack3DIcon,
  },
  {
    name: "Instant Snapshots",
    description:
      "Version control your diagrams. Create named snapshots and revert to previous states instantly.",
    icon: BoltIcon,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Design better systems, faster
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            YveChart provides all the tools you need to create professional,
            maintainable, and clear system architecture diagrams.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-gray-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 font-bold">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
