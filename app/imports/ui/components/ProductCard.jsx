import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProductCard extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header style={{ fontsize: 30 }}>
              {this.props.product.name}
            </Card.Header>
            <Image src={this.props.product.image} wrapped ui={true} />
            <Card.Meta style={{ fontsize: 24 }}>
              Price: {this.props.product.price}
              <br/>
              In Stock: {this.props.product.inStock}
              <hr/>
            </Card.Meta>
            <Card.Description>
              {this.props.product.description}
              <br/>
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProductCard);
