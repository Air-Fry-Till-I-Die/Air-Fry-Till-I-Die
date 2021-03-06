import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>Air Fry Till I Die</Header>
          </Menu.Item>
          <Menu.Item id="navbar-all-recipe" key='all' style={{ marginLeft: '20px' }} as={NavLink} activeClassName="" exact to="/all-recipes">
            <Header inverted as='h2'>All Recipes</Header>
          </Menu.Item>
          <Menu.Item style={{ marginLeft: '20px' }} as={NavLink} activeClassName="" exact to="/vendors">
            <Header inverted as='h2'>Vendors</Header>
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item id='navbar-add-inventory' position='right' as={NavLink} activeClassName="active" exact to="/add-inventory" key='add-inventory'>Add Inventory</Menu.Item>,
                <Menu.Item id='navbar-list-ingredients' as={NavLink} activeClassName="active" exact to="/list-ingredients" key='list-ingredients'>List Ingredients</Menu.Item>,
              <Menu.Item id='navbar-my-inventory' as={NavLink} activeClassName="active" exact to="/inventory" key='inventory'>My Inventory</Menu.Item>,
              ]
          ) : ''}
            {this.props.currentUser === '' ? (
              <Menu.Item position="right">
                <Dropdown id="login-dropdown" text="Login&nbsp;&nbsp;" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            )}
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
