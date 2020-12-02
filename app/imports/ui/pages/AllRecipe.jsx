import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Recipes } from '../../api/recipe/Recipe';
import RecipeCard from '../components/RecipeCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AllRecipe extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container id='all-recipe-page'>
          <Header as="h2" textAlign="center">List Recipes</Header>
          <Card.Group itemsPerRow={4} centered>
            {this.props.recipes.map((recipe, index) => <RecipeCard key={index}
                                                                   recipe={recipe}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AllRecipe.propTypes = {
  recipes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Recipes.allPublicationName);
  return {
    recipes: Recipes.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AllRecipe);
