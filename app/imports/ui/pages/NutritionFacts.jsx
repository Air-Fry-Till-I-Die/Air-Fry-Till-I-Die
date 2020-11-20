import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class NutritionFacts extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={8}>
            <Image size='large' src="/images/nutrition-facts-label.jpg"/>
          </Grid.Column>

        </Grid>
    );
  }
}

export default NutritionFacts;