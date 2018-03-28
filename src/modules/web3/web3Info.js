import React from 'react'
import PropTypes from 'prop-types'

const Web3Info = (props) => {
    const {name, id, apiVersion, nodeVersion, block} = props
    return (
        <div>
            Network: {name} ({id}) | Block: {block ? block.number : '?'} ({block ? block.timestamp : '?'})
            | Web3 API version: {apiVersion} | Node version: {nodeVersion}
        </div>
    )

}

Web3Info.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    block: PropTypes.shape({
            number: PropTypes.number,
            timestamp: PropTypes.number
        }),
    apiVersion: PropTypes.string,
    nodeVersion: PropTypes.string,
}

export default Web3Info
