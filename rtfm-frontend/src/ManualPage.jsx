import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ManualPage = () => {
	const [pageObject, setPageObject] = useState({});
	const { section, name } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/pages?section=${encodeURIComponent(section)}&page=${encodeURIComponent(name)}`);
        const result = await response.json();
	    setPageObject(result[0]);
      }
      catch (err) {
        console.log(`Error: ${err}`);
      }
    }
    fetchResults();
  },[])

  return (
    <div className="container">
      <article>
      <Link  id="back-link" to="/">Back to search</Link>
	  <div className="man-content" dangerouslySetInnerHTML={{ __html: pageObject.html_content }}>
	  </div>
      </article>
    </div>
  )
}

export default ManualPage
