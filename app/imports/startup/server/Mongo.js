import { Meteor } from 'meteor/meteor';
import { Inventory } from '../../api/inventory/Inventory.js';
import { Recipes } from '../../api/recipe/Recipe.js';
import { Ingredients } from '../../api/ingredient/Ingredient.js';
import { Vendors } from '../../api/vendor/Vendor';
import { Products } from '../../api/product/Product';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addDataInventory(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Inventory.collection.insert(data);
}

function addDataIngredient(data) {
  console.log(`  Adding: ${data.name}`);
  Ingredients.collection.insert(data);
}

function addRecipe(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Recipes.collection.insert(data);
}

function addVendor(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Vendors.collection.insert(data);
}

function addProduct(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Products.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Inventory.collection.find().count() === 0) {
  if (Meteor.settings.defaultInventory) {
    console.log('Creating default data for inventory.');
    Meteor.settings.defaultInventory.map(data => addDataInventory(data));
  }
}

if (Ingredients.collection.find().count() === 0) {
  if (Meteor.settings.defaultIngredients) {
    console.log('Creating default data for ingredient.');
    Meteor.settings.defaultIngredients.map(data => addDataIngredient(data));
  }
}

if (Recipes.collection.find().count() === 0) {
  if (Meteor.settings.defaultRecipe) {
    console.log('Creating default data for Recipes.');
    Meteor.settings.defaultRecipe.map(data => addRecipe(data));
  }
}

if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default data for Vendors.');
    Meteor.settings.defaultVendors.map(data => addVendor(data));
  }
}

if (Products.collection.find().count() === 0) {
  if (Meteor.settings.defaultProducts) {
    console.log('Creating default data for Products.');
    Meteor.settings.defaultProducts.map(data => addProduct(data));
  }
}
