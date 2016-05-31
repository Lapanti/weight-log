import {connect} from 'react-redux';
import PlayView from './PlayView';

export default connect(
  state => ({
    gameNumber: state.getIn(['game', 'number']),
    holes: state.getIn(['game', 'holes'])
  })
)(PlayView);
