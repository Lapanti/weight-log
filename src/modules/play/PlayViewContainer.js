import {connect} from 'react-redux';
import PlayView from './PlayView';

export default connect(
  state => ({
    game: state
  })
)(PlayView);
