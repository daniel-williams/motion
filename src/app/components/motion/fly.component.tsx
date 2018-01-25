import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Motion, spring, presets } from 'react-motion';

import * as styles from './fly.component.scss';


const objWidth = 50;
const objHeight = 50;
const maxDistance = 200;
const moveSpring = { stiffness: 225, damping: 9 };
const directionSpring = { stiffness: 1000, damping: 80 };
const duration = 130;

interface flyProps {
  width?: PropTypes.number,
  height?: PropTypes.number,
}
interface flyState {
  width: number,
  height: number,
  left: number,
  top: number,
  direction: number,
  interval: any,
}

export class Fly extends React.Component<flyProps, flyState> {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0,
      left: 50,
      top: 50,
      direction: 0,
      interval: null
    };
  }

  componentWillMount() {
    const interval = setInterval(this.randomPosition, duration);

    this.setState({
      interval,
    });
  }

  componentWillUnmount() {
    const { interval } = this.state;

    clearInterval(interval);
  }

  randomPosition = () => {
    const { height, width } = this.props;
    const { left, top } = this.state;

    const maxLeft = Math.min(width - objWidth, left + maxDistance);
    const minLeft = Math.max(0, left - maxDistance);
    const maxTop = Math.min(height - objHeight, top + maxDistance);
    const minTop = Math.max(0, top - maxDistance);

    const nextLeft = Math.max(minLeft, Math.min(maxLeft, left + this.rand()));
    const nextTop = Math.max(minTop, Math.min(maxTop, top + this.rand()));

    const leftDelta = left - nextLeft;
    const topDelta = top - nextTop;
    const direction = Math.atan2(topDelta, leftDelta) * 180 / Math.PI;

    this.setState({
      left: nextLeft,
      top: nextTop,
      direction
    });
  }


  render() {
    const { direction, left, top } = this.state;

    const elStyle = {
      direction: spring(direction, directionSpring),
      left: spring(left, moveSpring),
      top: spring(top, moveSpring),
    };


    return (
      <Motion style={elStyle}>
        {({direction, left, top}) =>
          <div className={styles.fly} style={{left:`${left}px`, top:`${top}px`, transform:`rotate(${direction - 90}deg)`}}>
            <img src='/assets/images/fly.png' />
          </div>
        }
      </Motion>
    );
  }

  private rand() {
    return Math.floor(Math.random() * maxDistance) * (Math.floor(Math.random() * 2) ? 1 : -1);
  }
}
