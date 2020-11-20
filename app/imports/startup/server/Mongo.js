import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Inventory } from '../../api/inventory/Inventory';
import { Recipes } from '../../api/recipe/Recipe';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addDataInventory(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Inventory.collection.insert(data);
}

function addRecipe(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Recipes.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Inventory.collection.find().count() === 0) {
  if (Meteor.settings.defaultInventory) {
    console.log('Creating default data for inventory.');
    Meteor.settings.defaultInventory.map(data => addDataInventory(data));
  }
}

if (Recipes.collection.find().count() === 0) {
  if (Meteor.settings.defaultRecipe) {
    console.log('Creating default data for inventory.');
    Meteor.settings.defaultRecipe.map(data => addRecipe(data));
  }
}
