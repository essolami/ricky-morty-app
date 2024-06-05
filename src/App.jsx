import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import Favorites from "./components/Favorites";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (character) => {
    if (!favorites.some((fav) => fav.id === character.id)) {
      setFavorites([...favorites, character]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((character) => character.id !== id));
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-white shadow-md py-4 mb-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              Rick & Morty
            </Link>
            <Link
              to="/favorites"
              className="text-lg text-gray-800 hover:text-gray-600 transition-colors duration-200"
            >
              Favorites
            </Link>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<CharacterList addFavorite={addFavorite} />}
          />
          <Route
            path="/character/:id"
            element={<CharacterDetails addFavorite={addFavorite} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFavorite={removeFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
