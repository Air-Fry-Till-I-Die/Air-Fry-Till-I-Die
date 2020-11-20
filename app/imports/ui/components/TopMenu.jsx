import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Container, Grid } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class TopMenu extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu fluid widths={5} style={menuStyle} attached="top" borderless>
        {/* <Grid container centered columns={2}>
          <Grid.Column> */}
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header as='h2'>Recipes</Header>
          </Menu.Item>
          {/* </Grid.Column>
          <Grid.Column> */}
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header as='h2'>Vendors</Header>
          </Menu.Item>
          {/* </Grid.Column>
        </Grid> */}
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
TopMenu.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const TopMenuContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(TopMenu);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(TopMenuContainer);
