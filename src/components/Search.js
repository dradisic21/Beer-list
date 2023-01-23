import React from "react";
import { searchBeer } from "../Api";

function Search(props) {

  const handleSearch = () => {
    const keyword = document.querySelector("#search-input").value;
    if(keyword === undefined || keyword === "") {
      return;
    }
    const search = async (keyword) => {
      try {
        const response = await searchBeer(keyword);
        console.log(response.data);
        props.filterBeers(response.data);
      } catch (err) {
        
      } finally {
      }
    };
    search(keyword);
  };

  

  return (
    <div className="search-beer">
      <input
        className="input-search"
        id="search-input"
        type="text"
        placeholder="Search beers"
      />
      <div className="button-search">
        <button type="submit" onClick={() => handleSearch()}>SEARCH</button>
      </div>
    </div>
  );
}

export default Search;
