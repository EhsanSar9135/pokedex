import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
   Card,
   Grid,
   CardContent,
   CardMedia,
   AppBar,
   Toolbar,
   CircularProgress,
   Typography,
   capitalize,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
   pokedexContainer: {
      padding: "20px 50px 0 50px",
   },
   cardMedia: {
      margin: "auto",
   },
   cardContent: {
      textAlign: "center",
   },
});

const Pokedex = ({ history }) => {
   const { pokedexContainer, cardMedia, cardContent } = useStyles();
   const [pokemonData, setPokemonData] = useState();

   useEffect(() => {
      const getData = async () => {
         const response = await axios.get(
            "https://pokeapi.co/api/v2/pokemon?limit=807"
         );
         const { data } = response;
         const { results } = data;
         const newPokemonData = {};
         results.forEach((pokemon, index) => {
            newPokemonData[index + 1] = {
               id: index + 1,
               name: pokemon.name,
               sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
               }.png`,
            };
         });
         setPokemonData(newPokemonData);
      };
      getData();
   }, []);

   const getPokemonCard = (pokemonId) => {
      const { id, name, sprite } = pokemonData[pokemonId] || {};

      return (
         <Grid item xs={4} key={pokemonId}>
            <Card onClick={() => history.push(`/${pokemonId}`)}>
               <CardMedia
                  className={cardMedia}
                  image={sprite}
                  style={{ width: "130px", height: "130px" }}
               />
               <CardContent className={cardContent}>
                  <Typography>{`${id}. ${capitalize(name)}`}</Typography>
               </CardContent>
            </Card>
         </Grid>
      );
   };
   return (
      <>
         <AppBar position="static">
            <Toolbar />
         </AppBar>
         {pokemonData ? (
            <Grid container spacing={2} className={pokedexContainer}>
               {Object.keys(pokemonData).map((pokemonId) =>
                  getPokemonCard(pokemonId)
               )}
            </Grid>
         ) : (
            <CircularProgress />
         )}
      </>
   );
};

export default Pokedex;
