import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import IngredientCard from '../components/IngredientCard';
import { Ingredients } from '../../api/ingredient/Ingredient';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListIngredients extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List of Ingredients</Header>
          <Card.Group>
            {this.props.ingredient.map((ingredient, index) => <IngredientCard key={index}
                                                                  ingredient={ingredient}
                                                                  />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListIngredients.propTypes = {
  ingredient: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionInventory = Meteor.subscribe(Ingredients.publicPublicationName);
  return {
    ingredient: Ingredients.collection.find({}).fetch(),
    ready: subscriptionInventory.ready(),
  };
})(ListIngredients);
