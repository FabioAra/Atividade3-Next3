// http://localhost:3000/movies

import { useState } from "react";

// Componente responsável por exibir a página de filmes
export default function Movies({ data }) {
  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para armazenar os dados dos filmes
  const [movieData, setMovieData] = useState(data);

  // Função para lidar com a pesquisa de filmes
  const handleSearch = async () => {
    // Faz uma requisição para a API OMDB com o novo termo de pesquisa
    const res = await fetch(`http://www.omdbapi.com/?apikey=59dad974&s=${searchTerm}`);
    // Converte a resposta para formato JSON
    const newData = await res.json();
    // Atualiza os dados com os resultados da nova pesquisa
    setMovieData(newData);
  };

  return (
    <div>
      <div>
        {/* Input para inserir o termo de pesquisa */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Botão para iniciar a pesquisa */}
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      <div>
        {/* Exibe os resultados da pesquisa */}
        {movieData.Search.map((m) => (
          <div key={m.imdbID}>
            {/* Exibe a imagem do pôster do filme */}
            <img src={m.Poster} alt={m.Title} style={{ maxWidth: "100px" }} />
            {/* Exibe o título e o ano de produção do filme */}
            {m.Title} --- {m.Year}
          </div>
        ))}
      </div>
    </div>
  );
}

// Função que é executada no servidor para obter os dados iniciais
export async function getServerSideProps(context) {
  // Obtém o termo de pesquisa da URL, padrão é "avengers" se não fornecido
  const searchTerm = context.query.search || "avengers";
  // Faz uma requisição para a API OMDB com o termo de pesquisa
  const res = await fetch(`http://www.omdbapi.com/?apikey=59dad974&s=${searchTerm}`);
  // Converte a resposta para formato JSON
  const data = await res.json();

  // Retorna os dados como props para o componente Movies
  return {
    props: {
      data,
    },
  };
}