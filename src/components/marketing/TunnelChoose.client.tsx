import {HydrogenResponse} from '@shopify/hydrogen';

export const TunnelChoose = ({response}: {response?: HydrogenResponse}) => {
  return (
    <div className="mx-auto mb-16 max-w-7xl">
      <div className="relative mb-16 mt-8">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="relative z-0 inline-flex rounded-md shadow-sm">
            <span className="relative z-10 inline-flex  cursor-pointer flex-col items-center rounded-l-md border border-brand-500 bg-white px-8 py-6  ring-1 ring-brand-500 hover:bg-gray-50 focus:z-10 focus:border-brand-500  focus:outline-none  focus:ring-1  focus:ring-brand-500">
              <span className="text-xl font-medium text-gray-700">
                14-ft wide
              </span>
              <span className="text-gray-500">Light-duty bows</span>
            </span>
            <span className="relative -ml-px inline-flex  cursor-pointer flex-col items-center rounded-r-md border border-gray-300 bg-white px-8 py-6 hover:bg-gray-50 focus:z-10 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500">
              <span className="text-xl font-medium text-gray-700">
                16-ft wide
              </span>
              <span className="text-gray-500">Heavy-duty bows</span>
            </span>
          </span>
        </div>
      </div>
      <div className="flex justify-between divide-x">
        <div className="flex flex-grow flex-col px-8">
          <figure className="relative h-48 w-full overflow-hidden rounded-lg xl:h-64">
            <div
              className="h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://farmersfriend.imgix.net/originals/images/Proxies/Cat-tunnel-with-flowers-web.jpg?auto=compress%2Cformat&fit=max&h=380&q=80&w=570&s=e1f3c305d73d03ce16a6b95e3e8fb3b4")',
              }}
            ></div>
            <div className="absolute top-0 h-full w-full bg-gradient-to-br from-black via-transparent to-transparent opacity-40"></div>
          </figure>
          <div className="flex flex-1 flex-col justify-between py-3 xl:py-6">
            <div className="mb-2">
              <div>
                <h3 className="text-center text-xl font-bold text-brand-500 xl:text-4xl">
                  Basic
                </h3>
              </div>
              <div className="flex justify-center text-lg">
                <ul className="list-inside list-disc space-y-1">
                  <li className="text-gray-800">5-ft bow spacing</li>
                  <li className="text-gray-800">50 feet long</li>
                  <li className="text-gray-800">Wind bracing</li>
                  <li className="text-gray-800">Poly purlin strap</li>
                  <li className="hidden text-gray-800"></li>
                  <li className="hidden text-gray-800">Cross bars</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <div className="my-4">
                <div className="mb-2 flex items-start justify-center text-gray-800">
                  <span className="mr-1 text-3xl font-medium">$</span>
                  <span className="text-xl font-normal xl:text-5xl">1,330</span>
                </div>
              </div>
              <div className="relative z-0 inline-flex w-full rounded-md shadow-sm">
                <a
                  href="/"
                  className="relative inline-flex flex-1 items-center justify-center rounded-lg border border-brand-500 bg-brand-500 px-4 py-2 text-base font-medium text-white transition-colors duration-150 hover:bg-brand-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-brand-300 focus:ring-opacity-30 lg:text-lg xl:text-xl"
                >
                  Add to cart
                </a>
              </div>
              <div className="relative mx-4 mt-4 mb-2">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white-warm px-2 text-lg text-gray-500">
                    or
                  </span>
                </div>
              </div>
              <span className="relative z-0 inline-flex w-full justify-center">
                <a
                  href="/caterpillar-tunnel/configure"
                  className="relative text-base font-medium text-brand-600 hover:underline lg:text-lg"
                >
                  Customize
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col px-8">
          <figure className="relative h-48 w-full overflow-hidden rounded-lg xl:h-64">
            <div
              className="h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://assets.farmersfriend.com/originals/images/_square/Cat-Tunnel-Sunset-half.jpg?mtime=20191029082808&amp;focal=50%25+50%25&amp;tmtime=20200629154425")',
              }}
            ></div>
            <div className="absolute top-0 h-full w-full bg-gradient-to-br from-black via-transparent to-transparent opacity-40"></div>
          </figure>
          <div className="flex flex-1 flex-col justify-between py-3 xl:py-6">
            <div className="mb-2">
              <div>
                <h3 className="text-center text-xl font-bold text-brand-500 xl:text-4xl">
                  Classic
                </h3>
              </div>
              <div className="flex justify-center text-lg">
                <ul className="list-inside list-disc space-y-1">
                  <li className="text-gray-800">5-ft bow spacing</li>
                  <li className="text-gray-800">50 feet long</li>
                  <li className="text-gray-800">Wind bracing</li>
                  <li className="text-gray-800">Steel center purlin</li>
                  <li className="text-gray-800">Lift kit</li>
                  <li className="hidden text-gray-800">Cross bars</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <div className="my-4">
                <div className="mb-2 flex items-start justify-center text-gray-800">
                  <span className="mr-1 text-3xl font-medium">$</span>
                  <span className="text-xl font-normal xl:text-5xl">2,490</span>
                </div>
              </div>
              <div className="relative z-0 inline-flex w-full rounded-md shadow-sm">
                <a
                  href="/"
                  className="relative inline-flex flex-1 items-center justify-center rounded-lg border border-brand-500 bg-brand-500 px-4 py-2 text-base font-medium text-white transition-colors duration-150 hover:bg-brand-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-brand-300 focus:ring-opacity-30 lg:text-lg xl:text-xl"
                >
                  Add to cart
                </a>
              </div>
              <div className="relative mx-4 mt-4 mb-2">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white-warm px-2 text-lg text-gray-500">
                    or
                  </span>
                </div>
              </div>
              <span className="relative z-0 inline-flex w-full justify-center">
                <a
                  href="/caterpillar-tunnel/configure/?width=16-ft&style=classic&length=50-ft&bowSpacing=5-ft&liftKit=Lift%20Kit"
                  className="relative text-base font-medium text-brand-600 hover:underline lg:text-lg"
                >
                  Customize
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col px-8">
          <figure className="relative h-48 w-full overflow-hidden rounded-lg xl:h-64">
            <div
              className="h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://farmersfriend.imgix.net/originals/images/16ft-Tunnel-Website-Tallplastic.jpg?auto=compress%2Cformat&fit=max&fm=jpg&position=38.38%2066.29&q=80&w=1200&s=6c024d2a4e5557482bdcccd3d3343e0b")',
              }}
            ></div>
            <div className="absolute top-0 h-full w-full bg-gradient-to-br from-black via-transparent to-transparent opacity-40"></div>
          </figure>
          <div className="flex flex-1 flex-col justify-between py-3 xl:py-6">
            <div className="mb-2">
              <div>
                <h3 className="text-center text-xl font-bold text-brand-500 xl:text-4xl">
                  Gothic
                </h3>
              </div>
              <div className="flex justify-center text-lg">
                <ul className="list-inside list-disc space-y-1">
                  <li className="text-gray-800">5-ft bow spacing</li>
                  <li className="text-gray-800">50 feet long</li>
                  <li className="text-gray-800">Wind bracing</li>
                  <li className="text-gray-800">Steel center purlin</li>
                  <li className="text-gray-800">Lift kit</li>
                  <li className="text-gray-800">Cross bars</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <div className="my-4">
                <div className="mb-2 flex items-start justify-center text-gray-800">
                  <span className="mr-1 text-3xl font-medium">$</span>
                  <span className="text-xl font-normal xl:text-5xl">2,610</span>
                </div>
              </div>
              <div className="relative z-0 inline-flex w-full rounded-md shadow-sm">
                <a
                  href="/"
                  className="relative inline-flex flex-1 items-center justify-center rounded-lg border border-brand-500 bg-brand-500 px-4 py-2 text-base font-medium text-white transition-colors duration-150 hover:bg-brand-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-brand-300 focus:ring-opacity-30 lg:text-lg xl:text-xl"
                >
                  Add to cart
                </a>
              </div>
              <div className="relative mx-4 mt-4 mb-2">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white-warm px-2 text-lg text-gray-500">
                    or
                  </span>
                </div>
              </div>
              <span className="relative z-0 inline-flex w-full justify-center">
                <a
                  href="/caterpillar-tunnel/configure/?width=16-ft&style=gothic&length=50-ft&bowSpacing=5-ft&liftKit=Lift%20Kit"
                  className="relative text-base font-medium text-brand-600 hover:underline lg:text-lg"
                >
                  Customize
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
