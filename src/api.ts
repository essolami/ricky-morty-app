const BASE_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (
  page = 1,
  name = "",
  status = "",
  species = "",
  gender = ""
) => {
  const response = await fetch(
    `${BASE_URL}/character/?page=${page}&name=${name}&status=${status}&species=${species}&gender=${gender}`
  );
  return response.json();
};

export const fetchCharacterDetails = async (id: number) => {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  return response.json();
};
