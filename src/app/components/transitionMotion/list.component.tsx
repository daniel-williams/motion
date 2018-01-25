import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TransitionMotion, spring, presets } from 'react-motion';

import * as styles from './list.component.scss';


interface Item {
  key: string,
  style?: any,
  data?: any,
}
interface ListProps {}
interface ListState {
  items: Item[],
  value: string,
}

const opacitySpring = { stiffness: 300, damping: 26 };
const transitionSpring = { stiffness: 200, damping: 10 };

export class List extends React.Component<ListProps, ListState> {
  newItem;

  constructor(props) {
    super(props);

    this.state = {
      items: [
        { key: '1', data: {text: 'coffee'} },
        { key: '2', data: {text: 'code'} },
        { key: '3', data: {text: 'game'} },
      ],
      value: '',
    };
  }

  getDefaultStyles = () => {
    return this.state.items.map(item => ({...item, style: {
      maxHeight: 0,
      opacity: 1,
      translateX: -100
    }}));
  }

  getStyles = () => {
    return this.state.items.map(item => {
      return {
        ...item,
        style: {
          maxHeight: spring(100, presets.gentle),
          opacity: spring(1, presets.gentle),
          translateX: spring(0, presets.stiff),
        }
      }
    });
  }

  willEnter() {
    return {
      maxHeight: 0,
      opacity: 0,
      translateX: -100,
    };
  };

  willLeave() {
    return {
      maxHeight: spring(0, presets.gentle),
      opacity: spring(0, presets.gentle),
      translateX: spring(100, presets.gentle),
    };
  };

  render() {
    const { items, value } = this.state;

    return (
      <div className={styles.listWrap}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              ref={x => this.newItem = x}
              value={value}
              className={styles.newItem}
              onChange={this.handleChange}
              placeholder='todo?'
              autoFocus />
          </form>
        </div>
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}>
          {motions =>
            <ul className={styles.itemList}>
              {motions.map(x =>
                <li key={x.key} style={{opacity: x.style.opacity, maxHeight: `${x.style.maxHeight}px`, transform: `translateX(${x.style.translateX}%)`}} onClick={() => this.handleDelete(x.key)}>{x.data.text}</li>
              )}
            </ul>
          }
        </TransitionMotion>
      </div>
    );
  }

  handleDelete = (key) => {
    const item = this.state.items.find(x => x.key === key);
    console.log('delete: ', key, item);

    this.setState({
      items: this.state.items.filter(x => x.key !== key)
    })
  }

  handleChange = (e) => {
    e.preventDefault();

    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(!this.state.value) { return; }

    const {items, value} = this.state;
    const keys = items.map(x => Number(x.key));
    const newItem = {key: (Math.max(0, ...keys) + 1).toString(), data: {text: value}};

    this.setState({
      value: '',
      items: [newItem].concat(items as any[])
    });
  };
}
