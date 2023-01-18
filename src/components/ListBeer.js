import React, { useEffect, useState } from "react";
import Search from "./Search";

function ListBeer() {
  const [item, setItem] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://api.punkapi.com/v2/beers");
    const data = await response.json();
    return setItem(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="App-header">
      <div className="beer_list">
        <h1>BEER LIST</h1>
        <Search />
        <ul>
          {item &&
            item.length > 0 &&
            item.map((itemObj) => (
              <div className="single_list">
                <li>
                  <h3>{itemObj.name}</h3>
                </li>
                <li>
                  <img
                    src={itemObj.image_url}
                    alt="bears"
                    className="imgBeers"
                  />
                </li>
                <li>
                  <p>{itemObj.description}</p>
                </li>
              </div>
            ))}
        </ul>
      </div>
    </main>
  );
}

export default ListBeer;
