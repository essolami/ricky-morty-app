import React from "react";

const Favorites = ({ favorites, removeFavorite }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Favorites</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((character) => (
          <li
            key={character.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center"
          >
            <img
              src={character.image}
              alt={character.name}
              className="rounded-full mb-2 w-24 h-24"
            />
            <h3 className="text-lg font-semibold">{character.name}</h3>
            <button
              onClick={() => removeFavorite(character.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
