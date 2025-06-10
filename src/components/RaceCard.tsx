import { CalendarDaysIcon, MapPinIcon, ArrowTrendingUpIcon } from '@heroicons/react/20/solid'
import type { CollectionEntry } from 'astro:content';

interface RaceCardProps {
  race: CollectionEntry<"races">;
}

export function RaceCard({ race }: RaceCardProps) {
  const { data } = race;
  const raceDate = new Date(data.date);
  const mainRaceOption = data.raceOptions[0]; // Using first race option as main

  return (
    <div className="w-full max-w-3xl">
      <h2 className="sr-only">Race Summary</h2>
      <div className="rounded-md shadow-xl ring-1 ring-neutral-700/50 backdrop-blur-sm bg-neutral-900/95">
        <dl className="flex flex-wrap">
          <div className="flex-auto pt-4 pl-4">
            <div className="flex items-baseline gap-x-3">
              <dt className="text-xl font-semibold text-neutral-200">{data.title}</dt>
              <dd className="text-lg font-medium text-neutral-400">{mainRaceOption.distance}km</dd>
            </div>
          </div>
          <div className="flex-none self-end px-4 pt-3">
            <dt className="sr-only">Status</dt>
            <dd className="inline-flex items-center rounded-md bg-[#1C2A1E] px-2 py-0.5 text-xs font-medium text-[#4A7153] ring-1 ring-[#2C432F]/30 ring-inset">
              {data.status}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-3 border-t border-neutral-800/80 px-4 pt-4">
            <dt className="flex-none">
              <span className="sr-only">Location</span>
              <MapPinIcon aria-hidden="true" className="h-5 w-4 text-neutral-2000" />
            </dt>
            <dd className="text-sm font-medium text-neutral-200">{data.location}</dd>
          </div>
          <div className="mt-2.5 flex w-full flex-none gap-x-3 px-4">
            <dt className="flex-none">
              <span className="sr-only">Date</span>
              <CalendarDaysIcon aria-hidden="true" className="h-5 w-4 text-neutral-2000" />
            </dt>
            <dd className="text-sm text-neutral-400">
              <time dateTime={data.date}>
                {raceDate.toLocaleDateString('en-NZ', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </dd>
          </div>
          <div className="mt-2.5 flex w-full flex-none gap-x-3 px-4">
            <dt className="flex-none">
              <span className="sr-only">Elevation</span>
              <ArrowTrendingUpIcon aria-hidden="true" className="h-5 w-4 text-neutral-2000" />
            </dt>
            <dd className="text-sm text-neutral-400">{mainRaceOption.elevation}m elevation gain</dd>
          </div>
        </dl>
        {data.registrationUrl && (
          <div className="mt-4 border-t border-neutral-800/80 px-4 py-4">
            <a href={data.registrationUrl} className="group inline-flex items-center text-sm font-semibold text-[#4A7153] hover:text-[#5C8A66] transition-colors">
              Register Now <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
