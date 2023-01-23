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
  const loggedInUser = JSON.parse(localStorage.getItem("Username"));

  useEffect(() => {
    console.log('usao u useEffect');
    const fetchBeer = async () => {
      try {
        const response = await getBeers(pageNumberLimit, currentPage);
        setBeers(response.data);
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

  const filterBeers = (filteredBeers) => {
    setBeers(filterBeers);
  }

  let showBeer = (index) => {
    navigate("/renderbeer", { state: { beerId: index } });
  };
  const handleLogout = (e) => {
    localStorage.clear("userToken");
    navigate("/");
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = () => {};

  const onNextClick = () => {};

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
      <div className="image-container">
        <img src="../../images/cover_beer.jpeg" alt="header-image" />
      </div>
      <div className="beer_list">
        <Search filterBeers={filterBeers}/>
        <div className="tbl-content">
          <div className="hello">
            <h3>Hello {loggedInUser}</h3>
            <div className="button-content">
              <button onClick={handleLogout} type="submit" className="button">
                Logout
              </button>
            </div>
          </div>
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th scope="col"></th>
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
                      <td className="image-beer-list">
                        <img src={beer.image_url} />
                      </td>
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
      </div>
    </main>
  );
}

export default ListBeer;
