import React, {useEffect, useState} from "react";
import axios from "axios";

export default function App() {

  const [results, setResults] = useState([])
  const [query, setQuery] = useState(['react hooks'])

  //useEffect(() => {
  //  axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
  //        .then(response => {
  //          console.log(response.data)
  //          setResults(response.data.hits)
  //        })
  //}, [])

  //useEffect(async() => {
  //  const response = await axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
  //  setResults(response.data.hits)
  //}, [])

  useEffect(() => {
    getResults()
  }, [])

  const getResults = async () => {
    const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`)
    setResults(response.data.hits)
  }

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" onChange={event => setQuery(event.target.value)} value={query}  />
        <button type="submit" onClick={getResults}>Search</button>
      </form>
        <ul>
          {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url}>
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      
    </div>
  );
}