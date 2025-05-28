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
      <div className="rounded-lg bg-gray-50 shadow-xs ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pt-6 pl-6">
            <dt className="text-sm/6 font-semibold text-gray-900">Distance</dt>
            <dd className="mt-1 text-base font-semibold text-gray-900">{mainRaceOption.distance}km</dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Status</dt>
            <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
              {data.status}
            </dd>
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">Location</span>
              <MapPinIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-sm/6 font-medium text-gray-900">{data.location}</dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Date</span>
              <CalendarDaysIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-sm/6 text-gray-500">
              <time dateTime={data.date}>
                {raceDate.toLocaleDateString('en-NZ', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Elevation</span>
              <ArrowTrendingUpIcon aria-hidden="true" className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-sm/6 text-gray-500">{mainRaceOption.elevation}m elevation gain</dd>
          </div>
        </dl>
        {data.registrationUrl && (
          <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
            <a href={data.registrationUrl} className="text-sm/6 font-semibold text-gray-900">
              Register Now <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
