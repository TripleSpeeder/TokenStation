import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from "@storybook/addon-actions"
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
        onLoadMore={eventLoaderActions.onLoadMoreResults}
        canLoadMore={true}
        currentChunk={10}
        maxChunks={100}
        loadingCurrentBlock={65000}
        loadingFromBlock={64950}
        loadingToBlock={65050}
    />)
    .add('idle load more disabled', () => <EventLoader
        loading={false}
        resultCount={123}
        resultFromBlock= {5999905}
        resultFromBlockDate={"2018-05-25"}
        resultToBlock=   {6001425}
        onLoadMore={eventLoaderActions.onLoadMoreResults}
        canLoadMore={false}
        currentChunk={10}
        maxChunks={100}
        loadingCurrentBlock={65000}
        loadingFromBlock={64950}
        loadingToBlock={65050}
    />)
    .add('idle no results', () => <EventLoader
        loading={false}
        resultCount={0}
        resultFromBlock= {5999905}
        resultFromBlockDate={"2018-05-25"}
        resultToBlock=   {6001425}
        onLoadMore={eventLoaderActions.onLoadMoreResults}
        canLoadMore={true}
        currentChunk={10}
        maxChunks={100}
        loadingCurrentBlock={65000}
        loadingFromBlock={64950}
        loadingToBlock={65050}
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
        onLoadMore={eventLoaderActions.onLoadMoreResults}
        canLoadMore={false}
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
        onLoadMore={eventLoaderActions.onLoadMoreResults}
        canLoadMore={false}
    />)
