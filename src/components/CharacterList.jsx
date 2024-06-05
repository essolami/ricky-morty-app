import React, { useState, useEffect } from "react";
import { fetchCharacters } from "../api";
import { useNavigate } from "react-router-dom";

const CharacterList = ({ addFavorite }) => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(
          page,
          search,
          status,
          species,
          gender
        );
        if (data.info.count <= 20) {
          setHasMore(false);
        } else {
          setCharacters(data.results);
          setHasMore(true);
        }
      } catch (error) {
        setError("Failed to fetch data");
      }
      setLoading(false);
    };
    getCharacters();
  }, [page, search, status, species, gender]);

  const handleAddFavorite = (character) => {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
    addFavorite(character);
  };

  const isFavorite = (character) =>
    favorites.some((fav) => fav.id === character.id);

  const handleCharacterClick = (id) => {
    navigate(`/character/${id}`);
  };

  return (
    <div className="container mx-auto p-4 cursor-pointer">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 w-full"
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="border rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 w-full"
        >
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="robot">Robot</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border rounded px-4 py-2 mb-2 md:mb-0 w-full"
        >
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      {loading && <div className="text-center">Loading...</div>}
      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {characters.map((character) => (
            <li
              key={character.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer"
              onClick={() => handleCharacterClick(character.id)}
            >
              <img
                src={character.image}
                alt={character.name}
                className="rounded-full mb-2 w-24 h-24"
              />
              <h3 className="text-lg font-semibold">{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              <p>Gender: {character.gender}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating when clicking the button
                  handleAddFavorite(character);
                }}
                className={`mt-2 px-4 py-2 rounded ${
                  isFavorite(character)
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
                disabled={isFavorite(character)}
              >
                {isFavorite(character)
                  ? "Added to Favorites"
                  : "Add to Favorites"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasMore}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      {!hasMore && <div className="text-center mt-4">No more data</div>}
    </div>
  );
};

export default CharacterList;
