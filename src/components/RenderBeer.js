import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBeer } from "../Api";


function RenderBeer() { 
    const [beer, setBeer] = useState({});
    const location = useLocation();
    console.log(location)


    useEffect(() => {
        const fetchBeer = async () => {
          try {
            const response = await getBeer(location.state.beerId);
            setBeer(response.data.id);
          } catch (err) {
            setBeer(null);
          } finally {
          }
        };
        fetchBeer();
      }, []);

      const renderBeer = () => {
        
      }

    return (
        <div className="single-beer__container">
            <div className="single-beer__image">

            </div>
            
        </div>
    )
}

export default RenderBeer;