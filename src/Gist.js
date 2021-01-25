import { useEffect, useState, Fragment } from 'react';
import { Avatar, Tag, Card } from 'antd';

function Gist({ gist }) {
  const { description, files, forks_url } = gist;
  const fileTypes = Object.keys(files).map((fileKey) => {
    const file = files[fileKey];
    return file.language ? file.language : file.type;
  });

  const [forkers, setForkers] = useState([]);

  useEffect(() => {
    const getForks = async () => {
      const response = await fetch(forks_url);
      let forkers = (await response.json()) || [];

      forkers.sort((a, b) => {
        return (
          new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
      });

      setForkers(forkers.slice(0, 3));
    };

    getForks();
  }, []);

  const Forker = ({ forker }) => {
    const { owner } = forker;
    const { avatar_url, login } = owner;
    return (
      <div className='fork-avatar'>
        <Avatar src={avatar_url} />
        <span>{login}</span>
      </div>
    );
  };

  const ForkersList = () => {
    return (
      <Fragment>
        <p>Forkers: </p>
        {(forkers.length > 0 &&
          forkers.map((forker) => {
            return <Forker forker={forker} />;
          })) ||
          'No forkers yet!'}
      </Fragment>
    );
  };

  const FileTypes = () => {
    return (
      <Fragment>
        {fileTypes.map((fileType) => {
          return (
            <div>
              Language : <Tag>{fileType}</Tag>
            </div>
          );
        })}
      </Fragment>
    );
  };

  return (
    <div className='gist-main'>
      <Card title={description} bordered={false} style={{ width: 500 }}>
        <div className='gist-info'>
          <FileTypes />

          <ForkersList />
        </div>
      </Card>
    </div>
  );
}

export default Gist;
