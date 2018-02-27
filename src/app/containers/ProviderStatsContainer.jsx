import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl , Alert  } from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import ProviderStatistics from '../components/ProviderStatistics';
import { getProviderActivitiesData } from '../actions/providers';

class ProviderStatsContainer extends React.Component{

render(){
  if(this.props.user.authenticated_provider){
    return(
    <ProviderStatistics
      getActs={this.props.getProviderActivitiesData}
      activities={this.props.provider.activities.actList}
    />
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

function mapStateToProps(state) {
  return {
    provider: state.provider,
    user: state.user
  };
}

export default connect(mapStateToProps,{getProviderActivitiesData})(ProviderStatsContainer);
