import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import Pagination from "../pagination/Pagination";
import { getBeers } from "../Api";
import "./ListBeer.css";

function ListBeer() {
  const [beers, setBeers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageNumberLimit = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const response = await getBeers(pageNumberLimit, currentPage);
        setBeers(response.data);
       //console.log(response);
        setTotalPages(Math.ceil(response.data / pageNumberLimit));
        setError(null);
      } catch (err) {
        setError(err.message);
        setBeers(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBeer();
  }, [currentPage]);

  let showBeer = (index) => {
    navigate("/renderbeer", { state: {beerId: index} });
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    totalPages,
  };

  return (
    <main className="App-container">
      {loading && <div>A moment please...</div>}
      {error && <div>{`Problem fetching the post data - ${error}`}</div>}
      <div className="beer_list">
        <h1>BEER LIST</h1>
        <Search />
        <div className="tbl-content">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th scope="col">Name</th>
                <th scope="col">Tagline</th>
                <th scope="col">First Brewed</th>
                <th scope="col">Volume</th>
                <th scope="col">Ibu</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {beers &&
                beers.length > 0 &&
                beers.map((beer) => {
                  return (
                    <tr
                      key={beer.id}
                      onClick={() => showBeer(beer.id)}
                      className="table-body__row" 
                    >
                      <td>{beer.name}</td>
                      <td>{beer.tagline}</td>
                      <td>{beer.first_brewed}</td>
                      <td>{beer.volume.value} litre</td>
                      <td>{beer.ibu}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>
            <Pagination
              {...paginationAttributes}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              onPageChange={onPageChange}
            />
          </div>
        </div>

        {/*<ul>
          {item &&
            item.length > 0 &&
            item.map((itemObj) => (
              <div onClick={() => showBeer()} className="single_list">
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
        </ul> */}
      </div>
    </main>
  );
}

export default ListBeer;
