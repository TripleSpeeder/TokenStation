import React from 'react'
import { configure, addDecorator } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';
import {Container} from 'semantic-ui-react'

const req = require.context('../src', true, /.stories.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
    <Container>
        {story()}
    </Container>
));

configure(loadStories, module);
