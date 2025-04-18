import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/search/?q=${encodeURIComponent(searchString)}`);
        const result = await response.json();
        setSearchResults(result.rows);
      }
      catch (err) {
        console.log(`Error: ${err}`);
      }
    }
    fetchResults();
  }, [searchString])

  return (
    <main className="container-fluid">
      <div className="search-box">
      <form role="search">
        <input name="search" type="search" placeholder="Search" 
          onChange={event => {
              setSearchString(event.target.value)
            }}/>
      </form>
      </div>
      <div className="search-results">
        <ul>
          {
            searchResults.map((res) => (
              <article>
                <h3>
                  <Link className="secondary" to={`/man/${res.section}/${res.name}`}>
                    {res.name} ({res.section})
                  </Link>
                </h3>
                <p className="text">{res.description}</p>
              </article>
            ))
          }
        </ul>
      </div>
    </main>
  )
}

export default SearchPage
