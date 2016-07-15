import {connect} from 'react-redux';
import WeightListView from './WeightListView';

export default connect(
  state => ({
    formData: state.get('form')
  })
)(WeightListView);
