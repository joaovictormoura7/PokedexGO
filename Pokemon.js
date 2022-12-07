import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import { getPokemonDetailsApi } from "../api/pokemon";
import Header from "../components/Pokemon/titulo";
import Type from "../components/Pokemon/modelo";
import Stats from "../components/Pokemon/Stats";
import useAuth from "../hooks/useAuth";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);
  //const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
}
