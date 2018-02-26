import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl , Alert} from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import ParentProfile from 'components/ParentProfile';
import ProviderProfile from 'components/ProviderProfile';
import { addCredits, getCredits, changeCredentialsUser,changeProfileUser, getParentData } from '../actions/parents'
import { changeCredentialsProvider, changeProfileProvider, getProviderData } from '../actions/providers'




class Profile extends React.Component {

  render() {
      if(this.props.user.authenticated_user) {
        return (
          <ParentProfile
            addCredits={this.props.addCredits}
            getCredits={this.props.getCredits}
            credits={this.props.parent.credits}
            changeCredentials={this.props.changeCredentialsUser}
            changeProfile={this.props.changeProfileUser}
            getData={this.props.getParentData}
            profile={this.props.parent.profile}
          />
        );
        }
        else if (this.props.user.authenticated_provider){

          return (
            <div>

              <ProviderProfile
                changeCredentials={this.props.changeCredentialsProvider}
                changeProfile={this.props.changeProfileProvider}
                getData={this.props.getProviderData}
                profile={this.props.provider.profile}
              />
            </div>
          );
        }
        else {
          return(
            <Alert bsStyle="warning">
  <strong>Δεν είστε Συνδεδεμένος ως Χρήστης ή ως Πάροχος!</strong> Παρακαλούμε συνδεθείτε, η κάνετε Εγγραφή!

</Alert>
          );
      }
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    parent: state.parent,
    provider: state.provider,
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps,
  {addCredits, getCredits,
    changeCredentialsUser, changeProfileUser,
    changeCredentialsProvider, changeProfileProvider,
    getParentData, getProviderData})
    (Profile);
