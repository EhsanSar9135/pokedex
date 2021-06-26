import React, { useEffect, useState } from "react";
import mockData from "./mockData";
import {
   capitalize,
   Link,
   Typography,
   CircularProgress,
   Button,
} from "@material-ui/core";
import axios from "axios";

const Pokemon = ({ match, history }) => {
   const { params } = match;
   const { pokemonId } = params;
   const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`]);

   useEffect(() => {
      const getSingleData = async () => {
         try {
            const response = await axios.get(
               `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            );
            const { data } = response;
            setPokemon(data);
         } catch (error) {
            setPokemon(false);
         }
      };
      getSingleData();
   }, [pokemonId]);

   const generatePokemonJSX = () => {
      const { id, name, species, height, weight, types, sprites } = pokemon;
      const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      const { front_default } = sprites;
      return (
         <>
            <Typography variant="h1">
               {`${id}. ${capitalize(name)}`}
               <img src={front_default} alt="sprite" />
            </Typography>
            <img
               style={{ width: "300px", height: "300px" }}
               src={fullImageUrl}
               alt="fullImage"
            />
            <Typography variant="h3">Pokemon Info</Typography>
            <Typography>
               {"Species: "}
               <Link href={species.url}> {species.name} </Link>
            </Typography>
            <Typography> Height: {height} </Typography>
            <Typography> Weight: {weight} </Typography>
            <Typography variant="h6">Types:</Typography>
            {types.map((typeInfo) => {
               const { type } = typeInfo;
               const { name } = type;
               return <Typography key={name}>{`${name}`}</Typography>;
            })}
         </>
      );
   };

   return (
      <>
         {pokemon === undefined && <CircularProgress />}
         {pokemon !== undefined && pokemon && generatePokemonJSX()}
         {pokemon === false && <Typography> Pokemon not found </Typography>}
         {pokemon !== undefined && (
            <Button variant="contained" onClick={() => history.push("/")}>
               back to pokedex
            </Button>
         )}
      </>
   );
};

export default Pokemon;
