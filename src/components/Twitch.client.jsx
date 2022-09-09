import {TwitchEmbed} from 'react-twitch-embed';

export default function Twitch({videoId}) {
  const container = 'sophie-diy-container' + videoId;

  const twitchProps = {
    channel: videoId ? undefined : 'sophiediy',
    id: container,
    darkMode: false,
    // width: '100%',
    // height: '100%',
    muted: true,
    fontSize: 'medium',
    withChat: true,
    video: videoId ? 'v' + videoId : undefined,
    autoplay: videoId ? false : true,
  };

  return (
    <div className="text-indigo-900 px-4 xl:px-12 -mx-4 xl:-mx-12">
      <div className="text-center mb-16">
        <TwitchEmbed {...twitchProps} />
      </div>
    </div>
  );
}
