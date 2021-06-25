import React, { useState } from "react";
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
import mockData from "./mockData";

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
   const [pokemonData, setPokemonDat] = useState(mockData);

   const getPokemonCard = (pokemonId) => {
      const { id, name } = pokemonData[`${pokemonId}`];
      const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

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
