import { isEmpty } from ".";

/**
 * Funcion que realiza la peticion al BE para obtener los animales
 * @param {*} query
 * @returns
 */
export const fetchSearchResults = async (query) => {
  if (isEmpty(query)) {
    const error = "No se proporciono un query Valido";
    return { success: false, error, data: [] };
  }

  try {
    const response = await fetch(
      `http://localhost:6401/searchAnimals/${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      success: false,
      data: [],
      error: "Ocurrio un error al realizar la busqueda",
    };
  }
};
