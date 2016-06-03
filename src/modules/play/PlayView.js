import * as PlayState from './PlayState';
import React from 'react';
import {
  PropTypes,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

const PlayView = React.createClass({
  propTypes: {
    gameNumber: PropTypes.number.isRequired,
    holes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  render() {

    function addHits(acc, curr, idx) {
      return acc + idx + ': ' + curr + ' ';
    }

    return (
      <View style={styles.container}>

        <Text style={styles.play}>
          {'Game: ' + this.props.gameNumber + ', hole: ' + this.props.holes.size}
        </Text>

        <TouchableOpacity onPress={() => this.props.dispatch(PlayState.addHit((PlayState.HITTYPES.TEE)))}>
          <Text style={styles.linkButton}>
            Tee
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.dispatch(PlayState.addHit((PlayState.HITTYPES.ROUGH)))}>
          <Text style={styles.linkButton}>
            Rough
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.dispatch(PlayState.addHit((PlayState.HITTYPES.FAIRWAY)))}>
          <Text style={styles.linkButton}>
            Fairway
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.dispatch(PlayState.addHit((PlayState.HITTYPES.BUNKER)))}>
          <Text style={styles.linkButton}>
            Bunker
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.dispatch(PlayState.addHit((PlayState.HITTYPES.GREEN)))}>
          <Text style={styles.linkButton}>
            Green
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.dispatch(PlayState.addHit((PlayState.HITTYPES.PENALTY)))}>
          <Text style={styles.linkButton}>
            Penalty
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.dispatch(PlayState.endHole())} accessible={true}>
          <Text style={styles.linkButton}>
            {'End hole'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.dispatch(PlayState.endGame())} accessible={true}>
          <Text style={styles.linkButton}>
            {'End game'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.play}>
          {this.props.holes.reduce(addHits, '')}
        </Text>

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  play: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default PlayView;
