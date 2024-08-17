export const fetchSearchResults = async (query) => {
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
      error: "Ocurrio un error al realizar la busqueda",
    };
  }
};
