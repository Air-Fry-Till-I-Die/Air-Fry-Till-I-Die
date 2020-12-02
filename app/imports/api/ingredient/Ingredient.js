import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class IngredientsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'IngredientsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      image: String,
      servings: { type: Number, defaultValue: 1 },
      unit: { type: String, allowedValues: ['Tsp', 'Tbsp', 'Cup', 'Oz', 'lb', ' '] },
      calories: Number,
      fat: Number,
      carbs: Number,
      protein: Number,
      sodium: Number,
      vegetarian: { type: Boolean, defaultValue: false },
      vegan: { type: Boolean, defaultValue: false },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.publicPublicationName = `${this.name}.publications.public`;
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Ingredients = new IngredientsCollection();
