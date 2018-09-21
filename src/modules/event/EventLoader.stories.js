import React from 'react'
import {storiesOf, action} from '@storybook/react'
import EventLoader from './EventLoader'

export const eventLoaderProps = {
}

export const eventLoaderActions = {
    onLoadMoreResults: action('loadMoreResults'),
}

storiesOf('Modules/EventLoader', module)
    .add('idle with results', () => <EventLoader
        loading={false}
        resultCount={123}
        resultFromBlock= {5999905}
        resultFromBlockDate={"2018-05-25"}
        resultToBlock=   {6001425}
    />)
    .add('idle no results', () => <EventLoader
        loading={false}
        resultCount={0}
        resultFromBlock= {5999905}
        resultFromBlockDate={"2018-05-25"}
        resultToBlock=   {6001425}
    />)
    .add('loading with results', () => <EventLoader
        loading={true}
        loadingFromBlock=   {5999905}
        loadingCurrentBlock={5999995}
        loadingToBlock=     {6000005}
        resultCount={123}
        resultFromBlock= {5999905}
        resultFromBlockDate={"2018-05-25"}
        resultToBlock=   {6001425}
        currentChunk={6}
        maxChunks={10}
    />)
    .add('loading with no results', () => <EventLoader
        loading={true}
        loadingFromBlock=   {5999905}
        loadingCurrentBlock={5999995}
        loadingToBlock=     {6000005}
        resultCount={0}
        resultFromBlock= {5999905}
        resultFromBlockDate={"2018-05-25"}
        resultToBlock=   {6001425}
        currentChunk={6}
        maxChunks={10}
    />)
