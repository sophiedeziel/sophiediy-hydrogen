import Layout from '../components/Layout.server';
import {flattenConnection, Link, gql} from '@shopify/hydrogen';
import useSophieDIYQuery from '../hooks/useSophieDIYQuery';

export default function Projets() {
  const {data, error} = useSophieDIYQuery(QUERY);
  if (error) {
    return `Error: ${error}`;
  }

  const projects = flattenConnection(data.projects);

  return (
    <Layout>
      <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
        Projets
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className=" text-white border border-gray-800 md:max-w-l md:flex-row"
          >
            <h2 className="w-full text-xl font-bold tracking-tight border border-gray-900 text-white bg-gray-900 p-4 hover:text-yellow-500">
              <Link to={'/projets/' + project.handle}>{project.title}</Link>
            </h2>
            <div className="text-lg font-bold text-gray-900 p-4">
              <span>
                {project.twitchVideos.length} video
                {project.twitchVideos.length > 1 ? 's' : ''}
              </span>
            </div>
            <div
              className="font-normal text-gray-800 p-4 prose"
              dangerouslySetInnerHTML={{__html: project.description}}
            ></div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query Projects {
    projects(first: 10) {
      edges {
        node {
          id
          description
          handle
          title
          status
          descriptionRaw
          twitchVideos {
            id
          }
        }
      }
    }
  }
`;
