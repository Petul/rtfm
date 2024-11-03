import { useState, useEffect } from 'react'

function App() {
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
      <div clsasName="search-results">
        <ul>
          {
            searchResults.map((res) => (
              <li>{res.name}: {res.section}</li>
            ))
          }
        </ul>
      </div>
    </main>
  )
}

export default App
