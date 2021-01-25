import { useState } from 'react';
import SearchComponent from './SearchComponent';
import GistLists from './GistLists';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  const [gists, setGists] = useState([]);
  function onSearch(gistLists) {
    setGists(gistLists);
  }
  return (
    <div className='App'>
      <SearchComponent onSearch={onSearch} />
      <GistLists gists={gists} />
    </div>
  );
}

export default App;
