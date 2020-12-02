import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, BoolField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '../../api/recipe/Recipe';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  image: String,
  servings: Number,
  unit: String,
  calories: Number,
  fat: Number,
  carbs: Number,
  protein: Number,
  sodium: Number,
  vegetarian: Boolean,
  vegan: Boolean,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddIngredient extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, image, servings, unit, calories, fat, carbs, protein, sodium, vegetarian, vegan } = data;
    Recipes.collection.insert({ name, image, servings, unit, calories, fat, carbs, protein, sodium, vegetarian, vegan },
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
            <Header as="h2" textAlign="center">Add Recipe</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <TextField name='image'/>
                <NumField name='servings' decimal={false}/>
                <SelectField name='unit' showInlineError={true} placeholder={'Select unit of measurement'} />
                <NumField name='calories' decimal={false}/>
                <NumField name='fat' decimal={false}/>
                <NumField name='carbohydrates' decimal={false}/>
                <NumField name='protein' decimal={false}/>
                <NumField name='sodium' decimal={false}/>
                <BoolField name='vegetarian'/>
                <BoolField name='vegan'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddIngredient;
