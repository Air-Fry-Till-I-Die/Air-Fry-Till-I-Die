import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Ingredients } from '../../api/ingredient/Ingredient';
import { Inventory } from '../../api/inventory/Inventory';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  owned: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddInventory extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, owned } = data;
    console.log(name);
    const owner = Meteor.user().username;
    const ing = this.props.ingredient.find(element => element.name === name);
    const { image, servings, unit, calories, fat, carbs, protein, sodium, vegetarian, vegan } = ing;
    console.log(image);
    Inventory.collection.insert({ name, owned, owner, image, servings, unit, calories, fat, carbs, protein, sodium, vegetarian, vegan },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Inventory</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <NumField name='owned' decimal={false}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddInventory.propTypes = {
  ingredient: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptionIngredient = Meteor.subscribe(Ingredients.publicPublicationName);
  return {
    ingredient: Ingredients.collection.find({}).fetch(),
    ready: subscriptionIngredient.ready(),
  };
})(AddInventory);
