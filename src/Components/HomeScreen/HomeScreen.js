import { React, useEffect, useState, useRef } from "react";
import "./HomeScreenStyle.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import SearchIcon from "@mui/icons-material/Search";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ModalComponent } from './ModalComponent.js'




export const HomeScreen = () => {
  const sendValueToAutocompleteApi = useRef();

  const dispatch = useDispatch();
  const accessFavoritesLocationsState = useSelector(
    (state) => state.favorites.items
  );

  const [queryAutocompleteInitialValue, setAutocompleteQueryValue] =
    useState("tel aviv");
  const [initialCityName, setCityName] = useState("Tel Aviv");
  const [initialCityId, setCityId] = useState("123456");

  const [intialDailyForecast, setDailyForecast] = useState([]);

  const [initialFiveDayForecast, setFiveDayForecast] = useState([]);

  const evokeSearch = async () => {
    setAutocompleteQueryValue(sendValueToAutocompleteApi.current.value);
  };

  const randomKey = uuidv4();

  const [openLightMode, setLightMode] = useState(false);
  const [initialDarkModeColor, setLightModeColor] = useState(
    "rgba(39, 39, 39, 0.365)"
  );

  const getApi = async () => {
    const baseUrl = "https://dataservice.accuweather.com";
    const apiKey = "naVC2bff8XWaRtUDrU50CRxiwkwe1Udu";

    const getCurrentAndFiveDayWheather = async () => {
      axios
        .get(
          `${baseUrl}/forecasts/v1/daily/1day/${initialCityId}?apikey=${apiKey}&language=en-us&details=true&metric=true`
        )
        .then((res) => {
          setDailyForecast(res.data);
        });

      axios
        .get(
          `${baseUrl}/forecasts/v1/daily/5day/${initialCityId}?apikey=${apiKey}&language=en-us&details=false&metric=true`
        )
        .then((res) => {
          setFiveDayForecast(res.data);
        });
    };

    await axios
      .get(
        `${baseUrl}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${queryAutocompleteInitialValue}&language=en-us`
      )
      .then((res) => {
        if (!res.data[0]) {
          setCityId("215854");
          setCityName("Tel Aviv");
        } else if (res.data[0].Key) {
          setCityId(res.data[0].Key);
          setCityName(res.data[0].LocalizedName);
        }
      })
      .then(() => {
        getCurrentAndFiveDayWheather();
      })
      .catch((err) => alert(err));
  };

  const addToFavorites = () => {
    const foundDuplicateCityId = accessFavoritesLocationsState.some(
      (city) => city.CityId === initialCityId
    );

    if (foundDuplicateCityId === true) {
      setOpen(true);
      return false;
    } else if (foundDuplicateCityId === false) {
      dispatch({
        type: "ADD_TO_FAVORITES",
        payload: {
          CityName: initialCityName,
          CityId: initialCityId,
          CityCurrentForecast: intialDailyForecast.DailyForecasts,
        },
      });
    }
  };



  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);



  useEffect(() => {
    getApi();
    evokeSearch();
  }, [initialCityName, queryAutocompleteInitialValue]);

  return (
    <div className="homepage-maindiv">

      <ModalComponent open={open} setOpen={setOpen} handleClose={handleClose} />

      <div className="search-bar-container">
        <input
          id="search-bar-input"
          type="text"
          defaultValue=""
          ref={sendValueToAutocompleteApi}
        />

        <Button variant="text" id="evoke-search" onClick={evokeSearch}>
          <SearchIcon />
        </Button>
      </div>

      <div
        className="terminal-maindiv"
        style={{ backgroundColor: initialDarkModeColor }}
      >
        <div className="terminal-top">
          {intialDailyForecast.DailyForecasts &&
          intialDailyForecast.DailyForecasts.length > 0 ? (
            <div id="terminal-top-main-details-cotainer">
              {intialDailyForecast.DailyForecasts.map((item) => (
                <div key={randomKey}>
                  <img src={`accuWeatherIcons/${item.Day.Icon}.png`} alt="" />

                  <div id="top-city-name">{initialCityName}</div>
                  <div>
                    <span id="top-max-temp">
                    {item.Temperature.Maximum.Value}°
                    </span>
                    <span id="top-min-temp">
                      /{item.Temperature.Minimum.Value}°
                    </span>
                  </div>
                  <div className="terminal-top-date-and-details">
                    {item.Date.slice(0, 10)}
                  </div>

                  <div className="terminal-top-date-and-details">
                    {item.Day.IconPhrase}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="loading-data-spinner-container">
              <CircularProgress color="inherit" />
            </div>
          )}

          {openLightMode ? (
            <Button
            
              variant="text"
              id="dark-light-btn"
              onClick={() => {
                setLightModeColor("rgba(39, 39, 39, 0.227)");
                setLightMode(false);
              }}
            >
              <WbSunnyIcon className="dark-light-mode-icon" />
            </Button>
          ) : (
            <Button 
              variant="text"
              id="dark-light-btn"
              onClick={() => {
                setLightModeColor("rgba(5, 5, 5, 0.379)");
                setLightMode(true);
              }}
            >
              <ModeNightIcon className="dark-light-mode-icon" />
            </Button>
          )}

          <Button
            variant="text"
            id="add-to-favorites-btn"
            onClick={addToFavorites}
          >
            Add Location To Favorites ✓
          </Button>

    


        </div>

        <div className="terminal-bottom">
          {initialFiveDayForecast.DailyForecasts &&
          initialFiveDayForecast.DailyForecasts.length > 0 ? (
            <ul id="terminal-bottom-5day-forecast">
              {initialFiveDayForecast.DailyForecasts.map((item, id) => (
                <li className="terminal-data-container-day" key={id}>
                  <img src={`accuWeatherIcons/${item.Day.Icon}.png`} alt="" />

                  <div>
                    <span id="bottom-max-temp">
                      {item.Temperature.Maximum.Value}°
                    </span>
                    <span id="bottom-min-temp">
                      /{item.Temperature.Minimum.Value}°
                    </span>
                  </div>
                  <div className="terminal-bottom-date-and-details">
                    {" "}
                    {item.Date.slice(0, 10)}
                  </div>
                  <div className="terminal-bottom-date-and-details">
                    {item.Day.IconPhrase}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="loading-data-spinner-container">
              {" "}
              <CircularProgress color="inherit" />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
