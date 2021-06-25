import React from "react";
import { Switch, Route } from "react-router-dom";
import Pokemon from "./Pokemon";
import Pokedex from "./Pokedex";

const App = () => {
   return (
      <Switch>
         <Route path="/:pokemonId" render={(props) => <Pokemon {...props} />} />
         <Route path="/" render={(props) => <Pokedex {...props} />} />
      </Switch>
   );
};

export default App;
