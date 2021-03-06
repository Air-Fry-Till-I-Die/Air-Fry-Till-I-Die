import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Inventory } from '../../api/inventory/Inventory';
import InventoryCard from '../components/InventoryCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListInventory extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container id='my-inventory-page'>
          <Header as="h2" textAlign="center" inverted>My Inventory</Header>
          <Card.Group>
            {this.props.inventory.map((inventory, index) => <InventoryCard key={index}
                                                                  inventory={inventory}
                                                                  />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListInventory.propTypes = {
  inventory: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionInventory = Meteor.subscribe(Inventory.userPublicationName);
  return {
    inventory: Inventory.collection.find({}).fetch(),
    ready: subscriptionInventory.ready(),
  };
})(ListInventory);
