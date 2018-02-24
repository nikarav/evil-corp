import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import { addCredits, getCredits } from '../actions/parents'




class ParentWallet extends React.Component {
  componentWillMount() {
    if (this.props.user.authenticated_user){
      this.props.getCredits();
    }
  }

  handleSubmit(values) {
    console.log(values);
    this.props.addCredits(values);
  }

  render() {
      if(this.props.user.authenticated_user) {
        return (
          <Block>
            <h1> Το πορτοφόλι μου </h1>
            <Inline>
              Πόντοι: {this.props.parent.credits}
            </Inline>
            <Inline>
              <Form
                model="Forms.parentProfile"
                onSubmit={(val) => this.handleSubmit(val)}
              >
                    <Control
                      model=".credits"
                      placeholder="credits e.g. 10"
                      required
                      validateOn="blur"
                      // component={FormControl}
                    />

                <Button type="submit">Add credits!</Button>
              </Form>
            </Inline>
          </Block>
        );
        }
        else {
          return(
            <Block>
              You are not logged in as a parent. Please log in as parent
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

export default connect(mapStateToProps, {addCredits, getCredits})(ParentWallet);
// export default ParentWallet;
