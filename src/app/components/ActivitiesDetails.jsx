import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetActiveActivity } from '../actions/ActivityShow';
import { Form, Control, Errors } from 'react-redux-form';
import { Button, Block, FormControl, Alert } from 'react-bootstrap';
import Navigation from '../containers/Navigation';

class Test extends React.Component {
  componentWillMount() {
      this.props.getActivity(this.props.param);
      this.props.getData();
    //  console.log(this.props);
    }
  handleSubmit(val, id){
    this.props.buyTicket({numberOfTickets: val.numberOfTickets, activityId: id});
    // this.props.ticketPdf({ticketId: this.props.profile.tickets[this.props.profile.tickets.length -1]});
  }

  render() {
    const { post, loading, error } = this.props.activity;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!post) {
      return <span />
    }
     var buy_button = null;
    if (this.props.user.authenticated_user){
        buy_button = ( <Button bsStyle="danger" type="submit"> Αγορά Εισιτηρίου</Button>);
    } else {
      buy_button = (<h3> Δεν είστε Συνδεδεμένος. Παρακαλω συνδεθείτε ως γονεάς ώστε για να μπορείτε να αγοράσετε εισητήριο.</h3>);
    }

    return (
      <div>
      <Navigation />
      <div className="container">
          <img src={post.photo}  height={100} width={100}/>
          <h3>{post.name}</h3>
          <h3>{console.log(post._id)}</h3>
            <h3>{console.log(this.props.activityCur.name)}</h3>
        <h6>Categories: {post.description}</h6>
      {/* //  <p>{post.content}</p> */}
      <Form
        model="Forms.ticketbuy"
        onSubmit={(val) => this.handleSubmit(val, post._id)}
      >
        <div className="field" >
            <label> Ποσότητα </label>
          <Control
            type="number"
            model=".numberOfTickets"
            placeholder="1"
            required
            min={1}
            validateOn="blur"
            component={FormControl}
          />
          <Errors
            className="errors"
            model=".number"
            show="touched"
            messages={{
              valueMissing: 'Ticket is required',
              typeMismatch: 'Must be a number',
              rangeUnderflow: 'Number of tickets should be at least 1',
            }}
          />
        </div>
        {buy_button}
        </Form>
      </div>
      </div>
    );
  }
}

export default Test;
