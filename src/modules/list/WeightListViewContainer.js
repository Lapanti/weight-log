import {connect} from 'react-redux';
import WeightListView from './WeightListView';

export default connect(
  state => ({
    history: state.get('weight')
  })
)(WeightListView);
