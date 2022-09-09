import Twitch from '../components/Twitch.client';
import {Suspense} from 'react';

import backgroundImage from '../assets/hero-background.jpg';

export default function Hero() {
  return (
    <div
      className="relative mb-12"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8  ">
        <div className="pt-16">
          <Suspense fallback={null}>
            <Twitch />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
