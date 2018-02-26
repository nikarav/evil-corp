import Test from '../components/ActivityList';
import { resetActiveActivity } from '../actions/ActivityShow';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return {
    activePost: globalState.posts.activePost,
    postId: ownProps.id
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


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
