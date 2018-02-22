import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActivities } from '../actions/ActivityShow';

class ActivitiesList extends React.Component {
  componentWillMount() {
      this.props.getActivities();
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <li className="list-group-item" key={post.name}>
          <h3 className="list-group-item-heading">{post.name}</h3>
          <h3 className="list-group-item-heading">{post.description}</h3>
        </li>
      );
    });
  }

  render() {
    const { posts, loading, error } = this.props.postsList;

    if (loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>;
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>;
    }

    return (
      <div className="container">
        <h1>Activities</h1>
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

export default connect(mapStateToProps, getActivities())(ActivitiesList);

