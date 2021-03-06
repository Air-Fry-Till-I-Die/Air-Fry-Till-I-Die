import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class RecipeCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RecipeCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      owner: String,
      servings: Number,
      description: String,
      image: String,
      ingredients: { label: 'ingredients', type: Array },
      'ingredients.$': { type: Array },
      'ingredients.$.$': { type: String },
      /*  ingredients: {
        type: Array,
        minCount: 1,
        maxCount: 15,
      },  */
      instructions: { label: 'ingredients', type: Array },
      'instructions.$': { type: String },
      /*  instructions: {
        type: Array,
        minCount: 1,
        maxCount: 15,
      },  */
      publicAccess: Boolean,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.allPublicationName = `${this.name}.publication.all`;
  }
}

export const Recipes = new RecipeCollection();
