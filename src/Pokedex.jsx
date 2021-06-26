import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
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
   TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
   pokedexContainer: {
      padding: "20px 50px 0 50px",
   },
   cardMedia: {
      margin: "auto",
   },
   cardContent: {
      textAlign: "center",
   },
   searchContainer: {
      display: "flex",
      background: fade(theme.palette.common.white, 0.15),
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "5px",
      marginBottom: "5px",
   },
   searchIcon: {
      alignSelf: "flex-end",
      marginBottom: "5px",
   },
   searchInput: {
      width: "200px",
      margin: "5px",
   },
}));

const Pokedex = ({ history }) => {
   const {
      pokedexContainer,
      cardMedia,
      cardContent,
      searchContainer,
      searchIcon,
      searchInput,
   } = useStyles();
   const [pokemonData, setPokemonData] = useState();
   const [filter, setFilter] = useState("");

   useEffect(() => {
      const getData = async () => {
         const response = await axios.get(
            "https://pokeapi.co/api/v2/pokemon?limit=870"
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
            <Toolbar>
               <div className={searchContainer}>
                  <SearchIcon className={searchIcon} />
                  <TextField
                     onChange={(e) => setFilter(e.target.value)}
                     className={searchInput}
                     label="Pokemon"
                     variant="standard"
                  />
               </div>
            </Toolbar>
         </AppBar>
         {pokemonData ? (
            <Grid container spacing={2} className={pokedexContainer}>
               {Object.keys(pokemonData).map(
                  (pokemonId) =>
                     pokemonData[pokemonId].name.includes(filter) &&
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
