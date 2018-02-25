import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import { parentSendMessage, providerSendMessage, userSendMessage } from '../actions/contact'




class AdminPanel extends React.Component {
  handleOnSubmit(val){
    if(this.props.user.authenticated_user) {
      return this.props.parentSendMessage(val);
    } else if (this.props.user.authenticated_provider){
      return this.props.providerSendMessage(val);
    }else{
      return this.props.userSendMessage(val);
    }
  }

  render() {
          return(
            <Form
              model="Forms.contact"
              onSubmit={(val) => this.handleOnSubmit(val)}
            >
            <div className="field">
                <label> subject </label>
                <Control.text
                  model=".subject"
                  placeholder="username"
                  required
                  validateOn="blur"
                  component={FormControl}
                />

                <label> Message </label>
                <Control.text
                  model=".message"
                  component={FormControl}
                 />

                 <Button type="submit">Υποβολή φόρμας!</Button>

            </div>
          </Form>
          );
      }

}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps,
  {parentSendMessage,
    providerSendMessage,
    userSendMessage
  })
    (AdminPanel);
