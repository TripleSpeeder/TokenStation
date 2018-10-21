import React from 'react'
import PropTypes from 'prop-types'

const Web3Info = (props) => {
    const {name, id, nodeVersion, block} = props
    const gitHub = 'https://github.com/TripleSpeeder/TokenStation'
    const contact = 'michael@m-bauer.org'
    const srcUrl = 'https://github.com/ethereum-lists/tokens'
    return (
        <React.Fragment>
            <p>
                Network: {name} ({id}) | Block: {block ? block.number : '?'} | Node version: {nodeVersion}
            </p>
            <p>
                ERC20 contract data origin: <strong><a href={srcUrl} target='_blank'>{srcUrl}</a></strong>
            </p>
            <p>
                GitHub: <strong><a target='_blank' href={gitHub}>{gitHub}</a></strong> | contact: <strong><a href={'mailto:' + contact}>{contact}</a></strong>
            </p>
        </React.Fragment>
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
