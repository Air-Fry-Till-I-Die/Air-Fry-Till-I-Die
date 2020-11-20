import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class InventoryCard extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image src={this.props.inventory.image}/>
          <Card.Header>{this.props.inventory.name}</Card.Header>
          <Card.Description>Servings: {this.props.inventory.servings}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={'/nutrition/'}>Nutrition</Link>
        </Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
InventoryCard.propTypes = {
  inventory: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(InventoryCard);
