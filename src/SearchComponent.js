import { useState } from 'react';
import { Input, message } from 'antd';

const { Search } = Input;

function SearchComponent({ onSearch }) {
  const [results, setResults] = useState([]);
  async function getGists(username) {
    if (username.length === 0) {
      return message.error('Please enter user name', 1);
    }
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/gists`
      );
      let gists = [];
      if (response.status === 200) gists = await response.json();
      if (gists.length === 0)
        message.warn('No gists found for the user name entered', 1);
      setResults(gists);
      return onSearch(gists);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div
      className='App-header'
      style={{ height: results.length === 0 ? '100vh' : '' }}
    >
      <Search
        placeholder='Search user name'
        onSearch={(name) => getGists(name)}
        style={{ width: 200 }}
      />
    </div>
  );
}

export default SearchComponent;
