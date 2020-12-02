import React from 'react';
import { Card, Image, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RecipeCard extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header style={{ fontsize: 20 }}>
              {this.props.recipe.name}
            </Card.Header>
            <Image src={this.props.recipe.image} wrapped ui={true} />
            <Card.Meta>
              Servings: {this.props.recipe.servings}
              <hr/>
            </Card.Meta>
            <Card.Description>
              Description:&nbsp;
              {this.props.recipe.description}
              <br/>
            </Card.Description>
          </Card.Content>
          {/* <Card.Content extra>
            <Link to={`/edit/${this.props.recipe._id}`}>Edit</Link>
          </Card.Content> */}
          {/* <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <AddNote owner={this.props.recipe.owner} contactId={this.props.recipe._id}/>
          </Card.Content> */}
          <Modal
              trigger={<Button>Show Recipe</Button>}
              header={this.props.recipe.name}
              image={this.props.recipe.image}
              content={
                <div style={{ color: 'black', fontSize: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                  <Image size='medium' src={this.props.recipe.image} centered/>
                  Servings: {this.props.recipe.servings}
                  <hr/>
                  <p>
                    Description:&nbsp;
                    {this.props.recipe.description}
                    <br/>
                    <br/>
                    Ingredients:&nbsp;
                    <br/>
                    {this.props.recipe.ingredients.map((ingr, index) => <div key={index}>{ingr[0]} {ingr[1]}</div>)}
                    <br/>
                    <br/>
                    Instructions:&nbsp;
                    {this.props.recipe.instructions}
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
RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RecipeCard);
