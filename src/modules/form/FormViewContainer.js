import {connect} from 'react-redux';
import FormView from './FormView';

export default connect(
  state => ({
    weight: state.getIn(['form', 'weight'])
  })
)(FormView);
