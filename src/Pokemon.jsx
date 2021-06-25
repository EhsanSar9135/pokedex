import React, { useState } from "react";
import mockData from "./mockData";
import { capitalize, Link, Typography } from "@material-ui/core";

const Pokemon = ({ match }) => {
   const { params } = match;
   const { pokemonId } = params;
   const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`]);

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

   return <>{generatePokemonJSX()}</>;
};

export default Pokemon;
