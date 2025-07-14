import { CalendarDaysIcon, MapPinIcon, MapIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/20/solid'

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

function getRelativeDate(date: Date): string {
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Past event';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 7) return `In ${diffDays} days`;
  if (diffDays < 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
  if (diffDays < 365) return `In ${Math.ceil(diffDays / 30)} months`;
  return `In ${Math.ceil(diffDays / 365)} years`;
}

export function RaceCard({ race }: RaceCardProps) {
  const raceDate = new Date(race.date);
  const relativeDate = getRelativeDate(raceDate);
  
  // Terrain-based color schemes
  const getTerrainColors = (terrain: string) => {
    switch (terrain) {
      case 'gravel':
        return {
          gradient: 'from-[#C49B7A] via-[#A67C52] to-[#8B5A2B]',
          button: {
            text: 'text-[#C49B7A]',
            bg: 'bg-[#C49B7A]/10',
            hoverBg: 'hover:bg-[#C49B7A]',
            border: 'border-[#C49B7A]/30',
            hoverBorder: 'hover:border-[#C49B7A]',
            focus: 'focus:ring-[#C49B7A]/50'
          }
        };
      case 'bikepacking':
        return {
          gradient: 'from-[#7A8BA4] via-[#5A6B84] to-[#3A4B64]',
          button: {
            text: 'text-[#7A8BA4]',
            bg: 'bg-[#7A8BA4]/10',
            hoverBg: 'hover:bg-[#7A8BA4]',
            border: 'border-[#7A8BA4]/30',
            hoverBorder: 'hover:border-[#7A8BA4]',
            focus: 'focus:ring-[#7A8BA4]/50'
          }
        };
      default:
        // Fallback to current muted sage
        return {
          gradient: 'from-[#8B9B87] via-[#6B7B67] to-[#5A6B57]',
          button: {
            text: 'text-[#8B9B87]',
            bg: 'bg-[#8B9B87]/10',
            hoverBg: 'hover:bg-[#8B9B87]',
            border: 'border-[#8B9B87]/30',
            hoverBorder: 'hover:border-[#8B9B87]',
            focus: 'focus:ring-[#8B9B87]/50'
          }
        };
    }
  };

  const terrainColors = getTerrainColors(race.terrain);

  return (
    <div className="group w-full max-w-3xl">
      <h2 className="sr-only">Race Summary for {race.title}</h2>
      <div 
        className="relative rounded-lg shadow-xl ring-1 ring-neutral-700/50 backdrop-blur-sm bg-neutral-900/95 overflow-hidden transition-all duration-300 hover:ring-neutral-600/70 hover:shadow-2xl hover:bg-neutral-800/95"
        role="article"
      >
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${terrainColors.gradient}`}></div>
        
        <div className="p-5">
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-['Outfit'] text-2xl font-bold leading-tight text-neutral-100 group-hover:text-white transition-colors">
                {race.title}
              </h3>
              <div className="text-base font-medium text-neutral-400">
                {relativeDate}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                <span className="text-base text-neutral-300">{race.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                <time 
                  dateTime={race.date}
                  className="text-base text-neutral-300"
                >
                  {raceDate.toLocaleDateString('en-NZ', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <GlobeAsiaAustraliaIcon className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                <span className={`text-base capitalize font-medium ${terrainColors.button.text}`}>{race.terrain}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapIcon className="h-4 w-4 text-neutral-400" />
                <div className="flex flex-wrap gap-1.5">
                  {race.raceOptions.map((distance) => (
                    <span
                      key={distance}
                      className="px-2.5 py-1 text-neutral-200 rounded-full text-base font-medium border bg-neutral-800/60 border-neutral-700/50 hover:bg-neutral-700/60 transition-colors"
                    >
                      {distance}km
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {race.registrationUrl && (
              <a 
                href={race.registrationUrl}
                className={`inline-flex items-center px-4 py-2 text-base font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 ${terrainColors.button.focus} ${terrainColors.button.text} hover:text-white ${terrainColors.button.bg} ${terrainColors.button.hoverBg} border ${terrainColors.button.border} ${terrainColors.button.hoverBorder}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Register for ${race.title} (opens in new tab)`}
              >
                Register
                <span aria-hidden="true" className="ml-1.5">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
