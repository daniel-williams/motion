import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import * as styles from './fly.component.scss';

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
      left: 30,
      top: 30,
      direction: 0,
      interval: null
    };
  }

  componentWillMount() {
    const interval = setInterval(this.randomPosition, 300);

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
    const nextLeft = Math.floor(Math.random() * (width - 100)) + 50;
    const nextTop = Math.floor(Math.random() * (height - 100)) + 50;
    const leftDelta = nextLeft - left;
    const topDelta = nextTop - top;
    const direction = Math.atan2(topDelta, leftDelta) * 180 / Math.PI;

    console.log('wtf: ', width, height);

    this.setState({
      left: nextLeft,
      top: nextTop,
      direction
    });
  }


  render() {
    const { direction, left, top } = this.state;
    const moveSpring = { stiffness: 100, damping: 8 };
    const elStyle = {
      direction,
      left: spring(left, moveSpring),
      top: spring(top, moveSpring),
    };


    return (
      <Motion style={elStyle}>
        {({direction, left, top}) =>
          <div className={styles.fly} style={{left:`${left}px`, top:`${top}px`, transform:`rotate(${direction - 270}deg)`}}>
            <img src='/assets/images/fly.png' />
          </div>
        }
      </Motion>
    );
  }
}
