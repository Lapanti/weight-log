/*eslint-disable react/prop-types*/

import React from 'react';
import WeightListViewContainer from './list/WeightListViewContainer';
import ChartViewContainer from './chart/ChartViewContainer';
import FormViewContainer from './form/FormViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const onNavigate = props.onNavigate;
  const key = props.scene.navigationState.key;

  if (key === 'List') {
    return <WeightListViewContainer onNavigate={onNavigate} />;
  }

  if (key === 'Form') {
    return <FormViewContainer onNavigate={onNavigate} />;
  }

  if (key === 'Chart') {
    return <ChartViewContainer onNavigate={onNavigate} />;
  }

  throw new Error('Unknown navigation key: ' + key);
}
