import {TwitchEmbed} from 'react-twitch-embed';

export default function Twitch() {
  const container = 'sophie-diy-container';
  // eslint-disable-next-line no-unused-vars
  const tail = ([_x, ...xs]) => xs;
  const hack = () => {
    const twitchContainer = document.getElementById(container);
    const toRemove = tail(twitchContainer.children);
    toRemove.forEach((child) => {
      twitchContainer.removeChild(child);
    });
  };

  return (
    <div className="text-gray-900 pt-16 rounded-[40px] px-4 xl:px-12 bg-gradient-to-b from-white -mx-4 xl:-mx-12">
      <div className="text-center mb-16">
        <TwitchEmbed
          channel="sophiediy"
          id={container}
          theme="light"
          width="100%"
          muted
          fontSize="medium"
          withChat={true}
          onAuthenticate={hack}
          onLoad={hack}
        />
      </div>
    </div>
  );
}
