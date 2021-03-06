import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, BoolField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '../../api/recipe/Recipe';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  servings: Number,
  description: String,
  image: String,
  ingredient: String,
  instructions: String,
  publicAccess: Boolean,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, servings, description, image, ingredient, instructions, publicAccess } = data;
    const owner = Meteor.user().username;
    const ingredients = ingredient.split(',');
    Recipes.collection.insert({ name, owner, servings, description, image, ingredients, instructions, publicAccess },
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
        <Grid id='add-recipe-page' container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Recipe</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField id='form-name' name='name'/>
                <NumField id='form-servings' name='servings' decimal={false}/>
                <TextField id='form-description' name='description'/>
                <TextField id='form-image' name='image'/>
                <TextField id='form-ingredient' name='ingredient' label='Ingredients'/>
                <TextField id='form-instructions' name='instructions'/>
                <BoolField id='form-publicAccess' name='publicAccess'/>
                <SubmitField id='form-add-recipe' value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddRecipe;
