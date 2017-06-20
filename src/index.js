import React from 'react';
import ReactDOM from 'react-dom'
import Routes from './Routes'
import injectTapEventPlugin from 'react-tap-event-plugin'
import registerServiceWorker from './registerServiceWorker'
import './index.css';

injectTapEventPlugin()
ReactDOM.render(<Routes />,document.getElementById('root'))
registerServiceWorker()
