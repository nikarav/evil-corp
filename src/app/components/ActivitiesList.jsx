import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { getActivities, updateCurrentActivity } from '../actions/ActivityShow';

class ActivitiesList extends React.Component {
  componentWillMount() {
      this.props.getActivities();
      //console.log(this.props);
    }
  handleClick(post){
    console.log("handleClick");
    console.log(post._id);
    console.log(post.photo);
  //  console.log(e);
     this.props.updateCurrentActivity(post);
  }
  handleClickMap(posts){
    console.log("handleClick");
    console.log(post._id);
    console.log(post.photo);
  //  console.log(e);
     this.props.updateCurrentActivity(post);
  }

  renderPosts(posts) {
    console.log("renderPost");
    console.log(posts);
    return !posts?      // inline if so it doesn't crash if the posts array is empty
            <h1> No available Activities</h1>
            :       // Modify (null) so it render a message example "no available activity"
            posts.map((post) => {

              return (
                <li className="list-group-item" key={post._id}>
                  <img src={post.photo}  height={100} width={100}/>
                  <h3 >{post.name}</h3>
                  <h3 >{post.description}</h3>
                  <h4>{post.price} </h4>
                  <h5> Ηλικία από {post.min_age} έως {post.max_age}</h5>
                    <Link id={post._id} style={{color:'black'}} to={"act/" + post._id}
                    onClick={(e) => this.handleClick(post)}>
                    <h2> Περισσότερα </h2>
                  </Link>
                </li>
              );
            });
  }

  render() {
    const { posts, loading, error } = this.props.postsList;
    console.log(this.props.postsList);
    console.log(posts);

    if (loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>;
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>;
    }
    return (
      <div className="container">
        <h1>Activities</h1>
        <Link  style={{color:'black'}} to="/map"
      //  onClick={(e) => this.handleClickMap(posts)}
      >
        <h2> Χάρτης Αποτελεσμάτων </h2>
      </Link>
        <ul className="list-group">
           {this.renderPosts(posts)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        postsList: state.ActivityList.postsList
    };
};

export default connect(mapStateToProps, {getActivities, updateCurrentActivity})(ActivitiesList);
