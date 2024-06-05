import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../api";

const CharacterDetails = ({ addFavorite }) => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const getCharacterDetails = async () => {
      const data = await fetchCharacterDetails(id);
      setCharacter(data);
    };
    getCharacterDetails();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded shadow p-4 flex flex-col items-center">
        <img
          src={character.image}
          alt={character.name}
          className="rounded-full mb-2 w-32 h-32"
        />
        <h1 className="text-2xl font-semibold">{character.name}</h1>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <button
          onClick={() => addFavorite(character)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default CharacterDetails;
