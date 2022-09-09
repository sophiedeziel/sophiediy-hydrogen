import {useRouteParams, gql} from '@shopify/hydrogen';
import {Suspense} from 'react';
import Moment from 'moment';
import Twitch from '../../components/Twitch.client';

import Layout from '../../components/Layout.server';

import useSophieDIYQuery from '../../hooks/useSophieDIYQuery';

export default function Project() {
  Moment.locale('fr');
  const {handle} = useRouteParams();

  const {data} = useSophieDIYQuery(QUERY, {handle});
  const {project} = data;

  return (
    <Layout>
      <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
        {project.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{__html: project.description}}
        className="prose prose-md max-w-none leading-relaxed prose-stone"
      />
      {project.twitchVideos.map((video) => (
        <>
          <h2 className="font-bold text-2xl md:text-3xl text-gray-900 mb-6 mt-6">
            {Moment(video.streamStartedAt).calendar()}
          </h2>
          <Suspense fallback={null}>
            <Twitch videoId={video.twitchId} />
          </Suspense>
        </>
      ))}
    </Layout>
  );
}

const QUERY = gql`
  query ProjectByHandle($handle: String!) {
    project(handle: $handle) {
      id
      title
      description
      descriptionRaw
      handle
      twitchVideos {
        id
        twitchId
        streamStartedAt
      }
    }
  }
`;
