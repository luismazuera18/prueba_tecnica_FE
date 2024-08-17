"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20vh",
      }}
    >
      <Image src="/img/googleLogo.jpg" width={300} height={100} alt="Google" />
      <form onSubmit={handleSearch} style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar en Google"
          style={{ padding: "10px", width: "300px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
