import React from 'react';
import { Image, Card, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class IngredientCard extends React.Component {
  vegetarian = (this.props.ingredient.vegetarian) ? 'Yes' : 'No';

  vegan = (this.props.ingredient.vegan) ? 'Yes' : 'No';

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image src={this.props.ingredient.image}/>
          <Card.Header>{this.props.ingredient.name}</Card.Header>
          <Card.Description>Servings: {this.props.ingredient.servings}</Card.Description>
        </Card.Content>
        <Modal
            trigger={<Button>Show Nutrition</Button>}
            header={this.props.ingredient.name}
            image={this.props.ingredient.image}
            content={
              <div style={{ color: 'black', fontSize: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                <Image size='medium' src={this.props.ingredient.image} centered/>
                Servings: {this.props.ingredient.servings} {this.props.ingredient.unit}
                <hr/>
                <p>
                  Calories:&nbsp;
                  {this.props.ingredient.calories}
                  <br/>
                  Fat:&nbsp;
                  {this.props.ingredient.fat} g
                  <br/>
                  Carbs:&nbsp;
                  {this.props.ingredient.carbs} g
                  <br/>
                  Protein:&nbsp;
                  {this.props.ingredient.protein} g
                  <br/>
                  Sodium:&nbsp;
                  {this.props.ingredient.sodium} mg
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
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
IngredientCard.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IngredientCard);
