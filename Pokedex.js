import React, { useState, useEffect } from "react";
import {getPokemonDetailsByUrlApi,getPokemonsApiTotal} from "../api/pokemon";
import PokemonList from "../components/PokeList";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [load, setLoad] = useState(false);

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    (async () => {
      await loadPokemons();
      await loadPokemonsTotal();
    })();
  }, []);

   const loadPokemonsTotal = async () => {
     try {
       const responseTotal = await getPokemonsApiTotal();

       const pokemonsArrayTotal = [];
       for await (const pokemon of responseTotal.results) {
         const pokemonDetailsTotal = await getPokemonDetailsByUrlApi(
           pokemon.url
         );

       pokemonsArrayTotal.push({
          id: pokemonDetailsTotal.id,
          name: pokemonDetailsTotal.name,
          type: pokemonDetailsTotal.types[0].type.name,
          order: pokemonDetailsTotal.order,
          image:
            pokemonDetailsTotal.sprites.other["official-artwork"].front_default,
        });
      }
      setFilterData([...pokemonsArrayTotal]);
      console.log(filterData);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApiTotal(nextUrl);
      setNextUrl(response.next);
      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
        });
      }
      setPokemons([...pokemons, ...pokemonsArray]);
      setFilterData([...pokemons, ...pokemonsArray]);
      setLoad(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PokemonList
        pokemons={pokemons}
        loadPokemonsTotal={loadPokemonsTotal}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
        filterData={filterData}
        setFilterData={setFilterData}
        valor={true}
        load={load}
      />
    </>
  );
}
