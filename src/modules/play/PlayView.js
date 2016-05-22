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
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  addHit(hittype) {
    this.props.dispatch.addHit(hittype);
  },

  endGame() {
    this.props.dispatch.endGame();
  },

  endHole() {
    this.props.dispatch.endHole();
  },

  render() {

    function addHits(acc, curr, idx) {
      return acc + idx + ': ' + curr + ' ';
    }

    return (
      <View style={styles.container}>

        <Text style={styles.play}>
          {'Game: ' + this.props.state.game + ', hole: ' + this.props.state.holes.size}
        </Text>

        <TouchableOpacity onPress={this.addHit(PlayState.HITTYPES.TEE)}>
          <Text style={styles.linkButton}>
            Tee
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.addHit(PlayState.HITTYPES.ROUGH)}>
          <Text style={styles.linkButton}>
            Rough
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.addHit(PlayState.HITTYPES.FAIRWAY)}>
          <Text style={styles.linkButton}>
            Fairway
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.addHit(PlayState.HITTYPES.BUNKER)}>
          <Text style={styles.linkButton}>
            Bunker
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.addHit(PlayState.HITTYPES.GREEN)}>
          <Text style={styles.linkButton}>
            Green
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.addHit(PlayState.HITTYPES.PENALTY)}>
          <Text style={styles.linkButton}>
            Penalty
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.endHole} accessible={true}>
          <Text style={styles.linkButton}>
            {'End hole'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.endGame} accessible={true}>
          <Text style={styles.linkButton}>
            {'End game'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.play}>
          {this.props.state.holes.reduce(addHits, '')}
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
