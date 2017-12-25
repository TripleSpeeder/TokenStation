import React from 'react'
import PropTypes from 'prop-types'

const Web3Info = (props) => {
    return (
        <div>
            Network: {props.name} ({props.id}) | Block: {props.block.number} ({props.block.timestamp})
            | Web3 API version: {props.apiVersion} | Node version: {props.nodeVersion}
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
