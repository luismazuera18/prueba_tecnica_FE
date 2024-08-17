"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchSearchResults } from "@/utils/api";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      const performSearch = async () => {
        setLoading(true);
        const searchResults = await fetchSearchResults(searchQuery);
        if (searchResults?.success) {
          setResults(searchResults.data);
        } else {
          setResults([]);
        }

        setLoading(false);
      };

      performSearch();
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  const handleSelectResult = (result) => {
    setSelectedResult(result);
  };

  const handleLogoClick = () => {
    router.push("/"); // Redirige a la página principal
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1 }}>
        <form
          onSubmit={handleSearch}
          style={{ marginBottom: "20px", width: "100%", maxWidth: "600px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/img/googleLogo.jpg"
              width={50}
              height={50}
              alt="Google Logo"
              style={{ marginRight: "10px" }}
              onClick={handleLogoClick}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              style={{ padding: "10px", width: "100%", fontSize: "16px" }}
            />
            <button
              type="submit"
              style={{ padding: "10px 20px", marginLeft: "10px" }}
            >
              Buscar
            </button>
          </div>
        </form>
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <h1>Resultados para: {query}</h1>

          {loading ? (
            <p>Loading...</p>
          ) : results.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {/*Se mapea el resultado obtenido del BE */}
              {results.map((result, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "20px", cursor: "pointer" }}
                  onClick={() => handleSelectResult(result)}
                >
                  <a target="_blank" rel="noopener noreferrer">
                    <h3>{result?.name ?? ""}</h3>
                    <p>{`https://${result?.name}.com`}</p>
                    <p>{result?.locations[0] ?? ""}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron resultados para: {query}.</p>
          )}
        </div>
      </div>
      {/** Seccion en la que se visualiza el resumen de la opcion seleccionada */}
      <div style={{ flex: 1, marginLeft: "20px" }}>
        {selectedResult ? (
          <div style={{ padding: "20px", border: "1px solid #ddd" }}>
            <h2>{selectedResult?.name}</h2>
            <p>
              <strong>Locations: </strong>
              {selectedResult?.locations[0] ?? ""}
            </p>
            <p>
              <strong>Kingdom: </strong>
              {selectedResult?.taxonomy?.kingdom ?? ""}
            </p>
            <p>
              <strong>family: </strong>
              {selectedResult?.taxonomy?.family ?? ""}
            </p>
          </div>
        ) : (
          <p>Select a result to see the details.</p>
        )}
      </div>
    </div>
  );
}
