import Gist from './Gist';

function GistLists({ gists }) {
  return gists.map((gist) => {
    const { id } = gist;
    return <Gist key={id} gist={gist} />;
  });
}

export default GistLists;
