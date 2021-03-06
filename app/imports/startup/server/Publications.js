import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Inventory } from '../../api/inventory/Inventory';
import { Recipes } from '../../api/recipe/Recipe';
import { Ingredients } from '../../api/ingredient/Ingredient';
import { Vendors } from '../../api/vendor/Vendor';
import { Products } from '../../api/product/Product';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Inventory.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Inventory.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Recipes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.collection.find({ owner: username } || { publicAccess: true });
  }
  return this.ready();
});

Meteor.publish(Ingredients.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Ingredients.collection.find({ owner: username } || { publicAccess: true });
  }
  return this.ready();
});

Meteor.publish(Recipes.allPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.collection.find({ $or: [{ owner: username }, { publicAccess: true }] });
  }
  return Recipes.collection.find({ publicAccess: true });
});

Meteor.publish(Vendors.allPublicationName, function () {
  return Vendors.collection.find();
});

Meteor.publish(Products.allPublicationName, function () {
  return Products.collection.find();
});

Meteor.publish(Ingredients.publicPublicationName, function () {
  return Ingredients.collection.find();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Inventory.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Inventory.collection.find();
  }
  return this.ready();
});

Meteor.publish(Recipes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipes.collection.find();
  }
  return this.ready();
});

Meteor.publish(Recipes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipes.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
