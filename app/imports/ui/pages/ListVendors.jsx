import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
import VendorItem from '../components/VendorItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListVendors extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container id='my-recipe-page'>
          <Header as="h1" textAlign="center">Vendors</Header>
          <Item.Group divided>
            {this.props.vendors.map((vendor, index) => <VendorItem key={index}
                                                                   vendor={vendor}/>)}
          </Item.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListVendors.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vendors.allPublicationName);
  return {
    vendors: Vendors.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListVendors);
