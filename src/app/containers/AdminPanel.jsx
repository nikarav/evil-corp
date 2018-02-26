import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import { isLocked, toogleLock, approveProvider, rejectProvider, forgot, changeEmail, getData, providersForApproval} from '../actions/administrator'




class AdminPanel extends React.Component {

  componentWillMount(){
    this.props.getData();
    this.props.providersForApproval();
  }


  handleButton1(){
    this.props.isLocked({username: this.props.Forms.adminPanel.username});
  }
  handleButton2() {
    this.props.toogleLock({username: this.props.Forms.adminPanel.username});
  }

  handleButton3() {
    this.props.approveProvider({username: this.props.Forms.adminPanel.username});
  }

  handleButton4() {
    this.props.rejectProvider({username: this.props.Forms.adminPanel.username});
  }

  handleButton5() {
    this.props.forgot({username: this.props.Forms.adminPanel.username});
  }
  changeEmail(val){
    this.props.changeEmail({email: this.props.Forms.adminPanel.email});
  }

  onProviderClick(provider){
    console.log("provider selected");
    console.log(provider.username);
  }

  renderProviders(providers) {
    return !providers?
    <div><h3> Δεν υπάρχουν πάροχοι για έγκριση </h3></div>
    :
    providers.map((provider, index) => {
      return (
          <li key={index}>

            {/* <Link  onClick={(e) => this.onProviderClick(provider)}> */}
              <h2>  {provider.username} </h2>
              {/* <h2> item </h2> */}
          </li>
          );
          }
        )
      }
  render() {



          return(
            <div>
              <div>
                Username: {this.props.administrator.profile.username}
                email:    {this.props.administrator.profile.email}
              </div>

            <Form
              model="Forms.adminPanel"
            >
            <div className="field">
                <label> Username </label>
                <Control.text
                  model=".username"
                  placeholder="username"
                  required
                  validateOn="blur"
                  component={FormControl}
                />
            </div>
          </Form>

          <Button bsStyle="danger" onClick={() => this.handleButton1()}> isLocked  </Button>
          <Button bsStyle="danger" onClick={() => this.handleButton2()}> toggleLock  </Button>
          <Button bsStyle="danger" onClick={() => this.handleButton3()}> approveProvider </Button>
          <Button bsStyle="danger" onClick={() => this.handleButton4()}> rejectProvider </Button>
          <Button bsStyle="danger" onClick={() => this.handleButton5()}> forgot </Button>

          <Form
            model="Forms.adminPanel"
            onSubmit={(val) => this.changeEmail(val)}
          >
          <div className="field">
              <label> Email </label>
              <Control.text
                model=".email"
                placeholder="email"
                required
                validateOn="blur"
                component={FormControl}
              />
          </div>
          <Button bsStyle="danger" onClick={() => this.changeEmail()}> Αλλαγή email admin </Button>
        </Form>

        <ul>
          {this.renderProviders(this.props.administrator.profile.providers)}
        </ul>
        </div>

          );
      }

}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    administrator: state.administrator,
    Forms: state.Forms,
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps,
  {
    isLocked,
    toogleLock,
    approveProvider,
    rejectProvider,
    forgot,
    changeEmail,
    getData,
    providersForApproval,
  })
    (AdminPanel);
