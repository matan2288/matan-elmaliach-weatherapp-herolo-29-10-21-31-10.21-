import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./FavoritesStyle.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export const FavoriteLocationsWeatherScreen = () => {
  const dispatch = useDispatch();

  const accessFavoritesLocationsState = useSelector(
    (state) => state.favorites.items
  );

  const history = useHistory();

  const [initialFavoriteLocations, setFavoriteLocations] = useState([]);

  const getDataFromLocalStorage = () => {
    setFavoriteLocations(accessFavoritesLocationsState);
  };

  const removeFromList = (id) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: id });
  };

  const backToMainScreenWithFavCityDetails = (cityid) => {
    history.push("/");
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, [setFavoriteLocations, removeFromList]);

  return (
    <div>
      <ul id="terminal-bottom-5day-forecast">
        {initialFavoriteLocations && initialFavoriteLocations.length > 0 ? (
          initialFavoriteLocations.map((item) => (
            <li
              className="terminal-data-container-day fav-container-style"
              key={item.CityId}
              onClick={() => {
                backToMainScreenWithFavCityDetails(item.CityId);
              }}
            >
              <Button
                variant="text"
                id="evoke-remove-from-list-btn"
                onClick={() => {
                  removeFromList(item.CityId);
                }}
              >
                X
              </Button>

              <img
                src={`accuWeatherIcons/${item.CityCurrentForecast[0].Day.Icon}.png`}
                alt=""
              />

              <div id="fav-card-city-name">{item.CityName}</div>

              <div className="fav-screen-temp-container">
                <div id="bottom-fav-max-temp">
                  {item.CityCurrentForecast[0].Temperature.Maximum.Value}°
                </div>
                <div id="bottom-fav-min-temp">
                  /{item.CityCurrentForecast[0].Temperature.Minimum.Value}°
                </div>
              </div>

              <div className="terminal-bottom-date-and-details">
                {item.CityCurrentForecast[0].Date.slice(0, 10)}
              </div>
              <div className="terminal-bottom-date-and-details">
                {item.CityCurrentForecast[0].Day.IconPhrase}
              </div>
            </li>
          ))
        ) : (

          <div id="empty-favorites">
          Please add some locations
        </div>
        )}
      </ul>
    </div>
  );
};
