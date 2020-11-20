import React from 'react';
import { Grid, Image, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container>
          <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
            <Grid.Row columns={2}>
              <Grid.Column width={4}>
                <Image size='small' circular src="/images/Icon.png"/>
              </Grid.Column>
              <Grid.Column width={8}>
                <h1>Air Fry Till I Die</h1>
                <p>Welcome to all your air frying recipe needs!</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Image src='https://cnet3.cbsistatic.com/img/SP3tuMJzpvZvXooZck3EYFjJVhE=/1200x675/2020/08/25/821f8eb6-b919-4751-8565-d35bf4f8c325/air-fryer.png' fluid />
        </Container>
    );
  }
}

export default Landing;
