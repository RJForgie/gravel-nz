import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/20/solid'

interface Race {
  title: string;
  date: string;
  location: string;
  terrain: string;
  registrationUrl?: string;
  raceOptions: number[];
}

interface RaceCardProps {
  race: Race;
}

export function RaceCard({ race }: RaceCardProps) {
  const raceDate = new Date(race.date);

  return (
    <div className="w-full max-w-3xl">
      <h2 className="sr-only">Race Summary for {race.title}</h2>
      <div 
        className="rounded-md shadow-xl ring-1 ring-neutral-700/50 backdrop-blur-sm bg-neutral-900/95"
        role="article"
      >
        <dl className="flex flex-wrap">
          <div className="flex-auto pt-4 pl-4">
            <div className="flex items-baseline gap-x-3">
              <dt className="text-xl font-semibold text-neutral-100">{race.title}</dt>
              <dd className="text-lg font-medium text-neutral-300">
                {race.raceOptions.map((distance, index) => (
                  <span key={distance}>
                    {distance}km{index < race.raceOptions.length - 1 ? ' / ' : ''}
                  </span>
                ))}
              </dd>
            </div>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-3 border-t border-neutral-800/80 px-4 pt-4">
            <dt className="flex-none">
              <span className="sr-only">Location</span>
              <MapPinIcon 
                aria-hidden="true" 
                className="h-5 w-4 text-neutral-300" 
              />
            </dt>
            <dd className="text-sm font-medium text-neutral-100">{race.location}</dd>
          </div>
          <div className="mt-2.5 flex w-full flex-none gap-x-3 px-4">
            <dt className="flex-none">
              <span className="sr-only">Date</span>
              <CalendarDaysIcon 
                aria-hidden="true" 
                className="h-5 w-4 text-neutral-300" 
              />
            </dt>
            <dd className="text-sm text-neutral-300">
              <time dateTime={race.date}>
                {raceDate.toLocaleDateString('en-NZ', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </dd>
          </div>
        </dl>
        {race.registrationUrl && (
          <div className="mt-4 border-t border-neutral-800/80 px-4 py-4">
            <a 
              href={race.registrationUrl}
              className="group inline-flex items-center text-sm font-semibold text-[#7DA186] hover:text-[#8FB598] focus:outline-none focus:ring-2 focus:ring-[#2C432F] rounded-sm px-1 -mx-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Register for ${race.title} (opens in new tab)`}
            >
              Register Now <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
