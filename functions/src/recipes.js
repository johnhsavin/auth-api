import { db } from "./dbConnect.js";

const coll = db.collection('recipes');

export async function createRecipe() {   // PROTECT this Route
  let newRecipe = req.body;
  // add users ID to recipe
  newRecipe.userId = req.locals.id   // new recipe ID is the person's ID
  await coll.add(newRecipe);
  // send back updated list of recipes.
  getAllRecipes(req, res);
}

export async function getAllRecipes() {
  const recipeColl = await coll.get();
  const recipes = recipeColl.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.send(recipes);
} 