import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetActiveActivity } from '../actions/ActivityShow';
import {Button } from 'react-bootstrap';
class Test extends React.Component {

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  render() {
    const { post, loading, error } = this.props.activePost;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!post) {
      return <span />
    }

    return (
      <div className="container">
          <img src={post.photo}  height={100} width={100}/>
          <h3>{post.name}</h3>
        <h6>Categories: {post.description}</h6>
      {/* //  <p>{post.content}</p> */}

        <Button bsStyle="danger" type="submit"> Αγορά </Button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    activePost: state.ActivityList.activePost
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
      dispatch(resetActiveActivity());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Test);
