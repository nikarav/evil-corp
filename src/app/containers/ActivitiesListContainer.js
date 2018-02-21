import { connect } from 'react-redux';
import { fetchPosts, fetchActivitiesSuccess, fetchActivitiesFailure } from '../actions/ActivityShow';
import ActivitiesList from '../components/ActivitiesList';


const mapStateToProps = (state) => {
  return {
    postsList: state.ActivityList.postsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts()).then((response) => {
          if (response.error) {
              dispatch(fetchActivitiesFailure(response.payload.data));
          } else {
              dispatch(fetchActivitiesSuccess(response.payload.data));
          }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);
