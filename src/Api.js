import axios from "axios";


// Dohvacanje liste piva i paginacija
export async function getBeers(limit, currentPage) {

    const params = {
      limit: limit,
      offset: (currentPage - 1) * limit,
    };
    const requestOptions = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("username, password"),
      },
      params: params,
    };
    return axios.get("https://api.punkapi.com/v2/beers", requestOptions);
}

export async function getBeer(id) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(
    `https://api.punkapi.com/v2/beers/${id}`,
    requestOptions
  );
}