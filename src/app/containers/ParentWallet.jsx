import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import { addCredits, getCredits } from '../actions/parents'




class ParentWallet extends React.Component {
  componentWillMount() {
    this.props.getCredits();
  }

  render() {



    return (
      <Inline>
        Το πορτοφόλι μου
        Πόντοι: {this.props.parent.credits}

        {/* <FormControl>

        </FormControl>
        <Button></Button> */}
      </Inline>
    );
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    parent: state.parent
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.

export default connect(mapStateToProps, {addCredits, getCredits})(ParentWallet);
// export default ParentWallet;
