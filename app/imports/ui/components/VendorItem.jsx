import React from 'react';
import { Item, Button, Modal, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Products } from '../../api/product/Product';
import ProductCard from './ProductCard';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {
  render() {
    const product = this.props.products.filter(prod => prod.owner === this.props.vendor.owner);
    return (
        <Item>
          <Item.Image size='medium' src={this.props.vendor.image}/>
          <Item.Content>
          <Item.Header as='a' href={this.props.vendor.link} target="_blank">{this.props.vendor.name}</Item.Header>
          <Item.Meta>{this.props.vendor.address}</Item.Meta>
          <Item.Description style={{ fontsize: 24 }}>
            {this.props.vendor.description}
          </Item.Description>
          <Item.Extra>
            <Modal
                trigger={<Button>Show Products</Button>}
                header={this.props.vendor.name}
                content={
                  <div style={{ color: 'black', fontSize: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                    <Card.Group itemsPerRow={3} centered>
                      {product.map((prod, index) => <ProductCard key={index}
                                                                             product={prod}/>)}
                    </Card.Group>
                  </div>
                }
                actions={[{ key: 'done', content: 'Done', positive: true }]}
            />
          </Item.Extra>
          </Item.Content>
        </Item>
    );
  }
}

/** Require a document to be passed to this component. */
VendorItem.propTypes = {
  vendor: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Products.allPublicationName);
  return {
    products: Products.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(VendorItem);
