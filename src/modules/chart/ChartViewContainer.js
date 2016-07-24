import {connect} from 'react-redux';
import ChartView from './ChartView';

export default connect(
  state => ({
    history: state.get('weight')
  }))(ChartView);
