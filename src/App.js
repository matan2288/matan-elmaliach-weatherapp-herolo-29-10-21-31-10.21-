import { HomeScreen } from "./Components/HomeScreen/HomeScreen";
import { FavoriteLocationsWeatherScreen } from "./Components/FavoriteLocationsWeatherScreen/FavoriteLocationsWeatherScreen";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App-maindiv">
        <Navbar />
        <Route exact path="/" component={HomeScreen} />
        <Route
          path="/FavoriteLocations"
          component={FavoriteLocationsWeatherScreen}
        />
      </div>
    </Router>
  );
}

export default App;
