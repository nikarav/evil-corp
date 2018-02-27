import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl , Alert  } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import { getParentData } from '../actions/parents';
import { ticketPdf } from '../actions/ticketBuy';
import parentReservations from '../components/parentReservations';

class parentReservationsContainer extends React.Component{
  render(){
    if(this.props.user.authenticated_user){
      return(
      <parentReservations
        getData={this.props.getParentData}
        profile={this.props.parent.profile}
        ticketPdf={this.props.ticketPdf}
      />
      );
    }
    else {
      return(
        <Alert bsStyle="warning">
    <strong>Δεν είστε Συνδεδεμένος ως Χρήστης!</strong> Παρακαλούμε συνδεθείτε, η κάνετε Εγγραφή!
    </Alert>
      );
    }

  }
  }

  function mapStateToProps(state) {
    return {
      parent: state.parent,
      user: state.user
    };
  }

export default connect(mapStateToProps, { getParentData , ticketPdf })(parentReservationsContainer);
