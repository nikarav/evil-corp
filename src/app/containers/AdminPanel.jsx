import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import { isLocked, toogleLock, approveProvider, rejectProvider, forgot, changeEmail, getData} from '../actions/administrator'




class AdminPanel extends React.Component {

  componentWillMount(){
    this.props.getData();
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

  render() {
          return(
            <div>
              <div>
                Username: {this.props.admin.profile.username}
                email:    {this.props.admin.profile.email}
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

        </div>

          );
      }

}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    admin: state.administrator,
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
  })
    (AdminPanel);
