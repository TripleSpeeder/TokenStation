import { configure } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';

const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
