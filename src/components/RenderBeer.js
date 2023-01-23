import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBeer } from "../Api";
import "./RenderBeer.css";

function RenderBeer() {
  const [beer, setBeer] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const response = await getBeer(location.state.beerId);
        setBeer(response.data);
        console.log(response.data);
      } catch (err) {
        setBeer(null);
      } finally {
      }
    };
    fetchBeer();
  }, []);

  return (
    <div className="single-beer__container">
      {beer &&
        beer.length > 0 &&
        beer.map((item) => (
          <div>
            <div className="beer-container">
              <div className="single-beer__image">
                <h2>{item.name}</h2>
                <img className="image-beer" src={item.image_url} />
              </div>
              <div className="description">
                <p>{item.tagline}</p>
                <p>{item.first_brewed}</p>
                <p>{item.description}</p>
                <h3>Ingredients:</h3>
                <p>Malt name: {item.ingredients.malt[0].name}</p>
                <p>Amount: {item.ingredients.malt[0].amount.value} kg</p>
                <p>Hops name: {item.ingredients.malt[1].name}</p>
                <p>Amount: {item.ingredients.malt[1].amount.value} g</p>
                <p>Hops name: {item.ingredients.malt[2]?.name}</p>
                <p>Amount: {item.ingredients.malt[2]?.amount.value} g</p>
                <p>Yeast: {item.ingredients.yeast}</p>  
              </div>
              <div className="specification">
                <p>ABV: {item.abv}</p>
                <p>IBU: {item.ibu}</p>
                <p>Final Gravity: {item.target_fg}</p>
                <p>EBC: {item.ebc}</p>
                <p>SRM: {item.srm}</p>
                <p>PH: {item.ph}</p>
                <p>Attenuation level: {item.attenuation_level}</p>
                <p>
                  Volume: {item.volume.value} {item.volume.unit}
                </p>
                <p>
                  Boil Volume: {item.boil_volume.value} {item.boil_volume.unit}
                </p>
                <p>Method Temp: {item.method.mash_temp[0].temp.value} &#8451;</p>
                <p>Beer brewing time: {item.method.mash_temp[0].duration ? item.method.mash_temp[0].duration : "/"} min</p>
                <p>Fermentation: {item.method.fermentation.temp.value} &#8451;</p>
                
              </div>
              <div className="specification">
                <h3>Food Pairing</h3>
                <p>{item.food_pairing[0]}</p>
                <p>{item.food_pairing[1]}</p>
                <p>{item.food_pairing[2]}</p>
                <p>{item.food_pairing[3]}</p>
              </div>
            </div>
            <div className="tips">
              <button 
                  onClick={() => navigate(-1)}
                  type="submit"
                  className="btn btn-primary ">Back</button>
                  <p>{item.brewers_tips}</p>
                  <p>{item.contributed_by}</p>
              </div>
            </div>
        ))}
    </div>
  );
}

export default RenderBeer;
