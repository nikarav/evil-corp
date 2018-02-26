import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import { resetParent } from '../actions/reset';


class ResetParent extends React.Component {

  resetPass(value){
    const url_parts = window.location.href.split('/');
    this.props.resetParent({password: value.password, token: url_parts[url_parts.length-1]});
  }

  render() {
        return (
          <Form
            model="Forms.resetParent"
            onSubmit={(val) => this.resetPass(val)}
          >
                <div className="field">
                    <label> Put new password here </label>
                    <Control.text
                      model=".password"
                      placeholder="new password"
                      required
                      validateOn="blur"
                      component={FormControl}
                    />
                    <Button bsStyle="danger" type="submit"> Reset password  </Button>
              </div>
        </Form>
        );
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {

  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps,
  {resetParent})
    (ResetParent);
