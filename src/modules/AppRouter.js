/*eslint-disable react/prop-types*/

import React from 'react';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import FormViewContainer from './form/FormViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
export default function AppRouter(props) {
  const onNavigate = props.onNavigate;
  const key = props.scene.navigationState.key;

  if (key === 'Counter') {
    return <CounterViewContainer onNavigate={onNavigate} />;
  }

  if (key === 'Form') {
    return <FormViewContainer onNavigate={onNavigate} />;
  }

  if (key.indexOf('Color') === 0) {
    const index = props.scenes.indexOf(props.scene);
    return (
      <ColorViewContainer
        index={index}
      />
    );
  }

  throw new Error('Unknown navigation key: ' + key);
}
