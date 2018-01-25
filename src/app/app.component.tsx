import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { Fly } from './components/motion';
import { List } from './components/transitionMotion';
import * as styles from './app.component.scss';

interface appProps {}
interface appState {
  outletWidth: number,
  outletHeight: number,
}

export class App extends React.Component<appProps, appState> {
  outlet;

  constructor(props) {
    super(props);

    this.state = {
      outletWidth: 0,
      outletHeight: 0,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const { offsetWidth, offsetHeight } = this.outlet;

      this.setState({
        outletWidth: offsetWidth,
        outletHeight: offsetHeight,
      });
    }, 0);
  }

  render() {
    const { outletWidth, outletHeight } = this.state;

    return (
      <BrowserRouter>
        <div className={styles.app}>
          <ul className={styles.menu}>
            <li><Link to='/'>home</Link></li>
            <li><Link to='/motion'>Motion</Link></li>
            <li><Link to='/transition-motion'>TransitionMotion</Link></li>
          </ul>
          <div ref={x => this.outlet = x} className={styles.routerOutlet}>
            <Switch>
              <Route exact path='/' render={() => <div>home</div>} />
              <Route path='/motion' render={() => <Fly width={outletWidth} height={outletHeight}></Fly>} />
              <Route path='/transition-motion' component={List} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
