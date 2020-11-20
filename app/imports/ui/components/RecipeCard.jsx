import React from 'react';
import { Card, Image } from 'semantic-ui-react';
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
            <Card.Meta>
              Servings: {this.props.recipe.servings}
              <hr/>
            </Card.Meta>
            <Card.Description>
              Description:&nbsp;
              {this.props.recipe.description}
              <br/>
              Ingredients:&nbsp;
              {this.props.recipe.ingredients}
              <br/>
              Instructions:&nbsp;
              {this.props.recipe.instructions}
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
