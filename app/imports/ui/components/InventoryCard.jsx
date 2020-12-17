import React from 'react';
import { Image, Card, Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Inventory } from '../../api/inventory/Inventory';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class InventoryCard extends React.Component {
  vegetarian = (this.props.inventory.vegetarian) ? 'Yes' : 'No';

  vegan = (this.props.inventory.vegan) ? 'Yes' : 'No';

  removeItem(docID) {
    console.log(`item to remove: ${docID}`);
    Inventory.collection.remove(docID);
  }

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image src={this.props.inventory.image}/>
          <Card.Header>{this.props.inventory.name}</Card.Header>
          <Card.Description>Amount Owned: {this.props.inventory.owned} {this.props.inventory.unit}<br/>
          Servings: {this.props.inventory.servings * this.props.inventory.owned} {this.props.inventory.unit}</Card.Description>
        </Card.Content>
        <Modal
            trigger={<Button>Show Nutrition</Button>}
            header={this.props.inventory.name}
            image={this.props.inventory.image}
            content={
              <div style={{ color: 'black', fontSize: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                <Image size='medium' src={this.props.inventory.image} centered/>
                Servings: {this.props.inventory.servings} {this.props.inventory.unit}
                <hr/>
                <p>
                  Calories:&nbsp;
                  {this.props.inventory.calories}
                  <br/>
                  Fat:&nbsp;
                  {this.props.inventory.fat} g
                  <br/>
                  Carbs:&nbsp;
                  {this.props.inventory.carbs} g
                  <br/>
                  Protein:&nbsp;
                  {this.props.inventory.protein} g
                  <br/>
                  Sodium:&nbsp;
                  {this.props.inventory.sodium} mg
                  <br/>
                  Vegetarian?&nbsp;
                  {this.vegetarian}
                  <br/>
                  Vegan?&nbsp;
                  {this.vegan}
                  <br/>
                </p>
              </div>
            }
            actions={[{ key: 'done', content: 'Done', positive: true }]}
        />
          <Button variant={'warning'}>
            <Link to={`/edit-inventory/${this.props.inventory._id}`}> Edit </Link>
          </Button>
        <Button onClick={() => this.removeItem(this.props.inventory._id)} color='red'>
          Remove
        </Button>
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
