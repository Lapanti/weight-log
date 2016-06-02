import {connect} from 'react-redux';
import PlayView from './PlayView';

export default connect(
  state => ({
    gameNumber: state.getIn(['play', 'number']),
    holes: state.getIn(['play', 'holes'])
  })
)(PlayView);
