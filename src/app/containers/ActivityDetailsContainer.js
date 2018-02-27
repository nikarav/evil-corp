import React from 'react';
import { Form, Control, Errors, combineForms } from 'react-redux-form';
import { connect } from 'react-redux';
import { Button, FormControl , Alert} from 'react-bootstrap';
import { Block, Inline } from 'jsxstyle';
import Test from '../components/ActivitiesDetails'
import { getParentData } from '../actions/parents';
import { resetActiveActivity, getActivity } from '../actions/ActivityShow';
import { buyTicket, ticketPdf } from '../actions/ticketBuy';

class ActivityDetailsContainer extends React.Component{



  render(){
      const url_parts = window.location.href.split('/');
    return(

        <Test
          buyTicket={this.props.buyTicket}
          activity={this.props.activePost}
          getActivity={this.props.getActivity}
          user={this.props.user}
          activityCur={this.props.activePost}
          param={{id: url_parts[url_parts.length-1]}}
          ticketPdf={this.props.ticketPdf}
          getData={this.props.getParentData}
          profile={this.props.parent.profile}
          pdf={this.props.pdf}
        />
    );

  }
}

function mapStateToProps(state) {
  return {
    parent: state.parent,
    provider: state.provider,
    user: state.user,
    activePost: state.ActivityList.activePost,
    currentAct: state.ActivityList.currentAct,
    pdf: state.ticketPdf.pdf

  };
}

export default connect(mapStateToProps, {getActivity, buyTicket, getParentData, ticketPdf})(ActivityDetailsContainer);
