import * as React from 'react';
import { render } from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

render(React.createElement(App, {}), document.getElementById('root'));

serviceWorker.unregister();
