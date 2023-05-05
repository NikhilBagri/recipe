import './App.css';
import Axios from "axios";
import { useState, useLayoutEffect } from 'react';
import RecipeTile from './RecipeTile';



function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#ffffff"
});

  const YOUR_APP_ID = `746d3b75`;
  const YOUR_APP_KEY = "f51de1b748a051b29accf828f55c1bc6";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <>
    <div className='main'>
    <div className="app">
      <h1 onClick={getRecipeInfo}>Recipedia 🧑🏻‍🍳</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="search here for recipe"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
      </form>

      <div className="app__recipes">
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
      </div>
    </div>
    </div>
    </>
  );
}

export default App;