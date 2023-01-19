import React from "react";

function Search() {
  
    return (
        <div className="search-beer">
            <input className="input-search" type="text" placeholder="Search beers"/>
            <div className="button-search">
              <button type="submit">SEARCH</button>
            </div>
      </div>
    );
  }
  
  export default Search;