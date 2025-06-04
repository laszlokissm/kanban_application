import { render } from 'preact';
import './index.less';
import {Main } from './Main/Main';

function App() {
	return <Main/>
}
render(<App />, document.getElementById('app'));