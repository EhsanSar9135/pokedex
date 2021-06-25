import React from "react";

const Pokemon = ({ match }) => {
   const { params } = match;
   const { pokemonId } = params;
   return <div>{`This is the pokemon page ${pokemonId}`}</div>;
};

export default Pokemon;
