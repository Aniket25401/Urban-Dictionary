import React from "react";
import { getUrbanDictionary } from "../api";
import LoadingState from "./Loading";

function Result({ searchTerm, dicType, setShowResult }) {
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  

  React.useEffect(() => {
    if (dicType === "urban") {
      getUrbanDictionary(searchTerm)
      .then((data) => {
        setResult(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false);
      })
    }
  }, []);
  console.log(result);

  let resultScreen;

  if (dicType === "urban")  {

    if(result.length <= 0) {
      resultScreen = <div className="error">No results found</div>
    } else {
    resultScreen = result.map((item) => {
      return (
        <>
          <div className="meanings-cont">
            <div className="meanings">
              <aside className="author-cont">
                <div className="author">
                  <h3 className="name truncate">{item.author}</h3>
                  <p className="data">{item.written_on}</p>
                </div>
              </aside>
              <div className="def_cont">
                <div className="def-cont">
                  <h3 className="definition">{item.definition}</h3>
                  <p className="example">{item.example}</p>
                </div>
                <div className="def-bottom-div">
                  <div className="src-link_cont">
                    <a href={item.permalink}>Source</a>
                    <img src="./left-arrow.svg" alt="left-arrow" />
                  </div>
                  <div className="thumbs-cont">
                    <div className="thumbs-up">
                      <img src="./like.svg" alt="thumbs-up" />
                      <p>{item.thumbs_up}</p>
                    </div>
                    <div className="thumbs-down">
                      <img src="./dislike.svg" alt="thumbs-down" />
                      <p>{item.thumbs_down}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
    }
  }

  return (
    <main className="result-main">
      <div className="result-top-cont">
        <button
          className="btn-icon r_btn-icon"
          onClick={() => setShowResult(false)}
        >
          <img src="./right-arrow.svg" alt="left-arrow" title="Back to Home" />
        </button>
        <div className="result-searchbar">
          <input
            id="search-input"
            type="text"
            placeholder="Search Something"
            autoComplete="off"
          />
        </div>
        <button
          className="btn-icon r_btn-icon"
          onClick={() => setShowResult(false)}
        >
          <img
            src="./toggle.svg"
            alt="left-arrow"
            title="Toggle Dictionary mode"
          />
        </button>
      </div>
      {dicType === "urban" && (
        <header className="header urban-header">
          <div className="word word-urban">
            <h2>{searchTerm}</h2>
          </div>
        </header>
      )}
      {error ? <div className="error">{error}</div> : <div className="result-scr">{loading ? <LoadingState /> : resultScreen}</div>}
      
    </main>
  );
}

export default Result;
