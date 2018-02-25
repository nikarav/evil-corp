import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import ParentProfile from 'components/ParentProfile';
import { addCredits, getCredits, changeCredentialsUser } from '../actions/parents'




class Profile extends React.Component {
  // componentWillMount() {
  //   if (this.props.user.authenticated_user){
  //     this.props.getCredits();
  //   }
  // }

  render() {
      if(this.props.user.authenticated_user) {
        return (
          <ParentProfile
            addCredits={this.props.addCredits}
            getCredits={this.props.getCredits}
            credits={this.props.parent.credits}
            changeCredentials={this.props.changeCredentialsUser}
          />
        );
        }
        else if (this.props.user.authenticated_provider){
          // return <Provider
          return ;
        }
        else {
          return(
            <Block>
              You are not logged in as a parent or provider. Please log in or sign  up.
            </Block>
          );
      }
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    parent: state.parent,
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps, {addCredits, getCredits, changeCredentialsUser})(Profile);
// export default ParentWallet;
