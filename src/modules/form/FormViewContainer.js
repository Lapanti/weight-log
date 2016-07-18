import {connect} from 'react-redux';
import FormView from './FormView';

export default connect(
  state => ({
    valid: state.getIn(['form', 'valid']),
    weight: state.getIn(['form', 'weight']),
    date: state.getIn(['form', 'date']),
    history: state.get('weight')
  })
)(FormView);
