import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl , Alert} from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import ActivitiesDetails from '../component/ActivitiesDetails'

class ActivityDetailsContainer extends React.Component{
  render(){
    return();
  }
}
function mapStateToProps(state) {
  return {
    parent: state.parent,
    provider: state.provider,
    user: state.user
  };
}

export default (mapStateToProps,{})(ActivityDetailsContainer);
