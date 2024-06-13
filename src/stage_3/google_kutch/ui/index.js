
import { AppComponents } from './components/App.components.js';

const rootElement = document.getElementById('root')


rootElement.innerHTML = '';

const appComponent = AppComponents();

rootElement.append(appComponent.element)


