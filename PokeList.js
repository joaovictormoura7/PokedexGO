import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  Platform,
  TextInput,
  Text,
  Button,
  View,
} from "react-native";
import PokemonCard from "./PokeCard";
import { SafeAreaView} from "react-native-safe-area-context";
// import { Button } from "react-native-web";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function PokemonList(props) {
  const {
    pokemons,
    loadPokemons,
    isNext,
    filterData,
    setFilterData,
    valor,
    load,
  } = props;

  const laodMore = () => {
    loadPokemons();
  };

  const [search, setSearch] = useState("");
  const [poke, setPoke] = useState(false);

  useEffect(() => {}, [search]);

  const searchFilter = (text) => {
    setSearch(text);
    if (text) {
      setFilterData(pokemons);
    }
  };
  const searchFilterDone = () => {
    if (search) {
      const newData = filterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilterData(newData);
      setSearch("");
      if (Object.keys(newData).length == 0) {
        setPoke(true);
      } else {
        setPoke(false);
      }
      console.log(`aqui ${Object.keys(newData).length}`);
    } else {
      setFilterData(pokemons);
      setSearch(search);
    }
  };
  const Reload = () => {
    setFilterData(pokemons);
  };
  

  return (
    <SafeAreaView>
      {valor && (
        <View style={styles.search}>
          <TextInput
            style={styles.textInputStyle}
            value={search}
            placeholder="  Nome do Pokemon  "
            onChangeText={(text) => searchFilter(text)}
          />
          <Button title="Buscar" color="#1ff2d6" onPress={searchFilterDone} />
          <Button title="Todos" color="#1ff2d6" onPress={Reload} />
        </View>
      )}
      <FlatList
        data={filterData}
        numColumns={3}
        showsVerticalScrollIndicator={false} 
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={isNext && laodMore} 
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={styles.list}>
            {poke && (
              <View style={styles.aviso}>
                <Text style={styles.alertaText}>
                  Não encontramos Pokemons com esse nome
                </Text>
              </View>
            )}
            {!load && (
              <View style={styles.alerta}>
                <Text style={styles.alertaText}>Baixando Dados...</Text>

                <ActivityIndicator
                  size="large"
                  style={styles.spinner}
                  color="#a63ef0"
                />
              </View>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 5 : 0,
  },

  list: {
    marginBottom: 100,
  },
  alerta: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  alertaText: {
    fontSize: 17,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
  textInputStyle: {
    height: 40,
    margin: 12,
    marginLeft: 0,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "60%",
  },

  search: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 6,
    height: 40,
    width: "100%",
    justifyContent: "space-evenly",
  },
  aviso: {
    width: "100%",
    height: 300,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
