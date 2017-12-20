import React, {PropTypes} from 'react'
import {Item} from "semantic-ui-react"

import ERC20ContractContainer from "./ERC20ContractContainer"

const ERC20ContractList = (props) => {
    return (
        <Item.Group divided>
            {props.ERC20TokenContracts.map((tokenContract) => <ERC20ContractContainer
                    key={tokenContract.tokenAddress}
                    ERC20Contract={tokenContract}
                    web3={props.web3}
                    address={props.address}
                    showEmpty={props.showEmpty}
                />)
            }
        </Item.Group>
    )
}

ERC20ContractList.propTypes = {
    //myProp: PropTypes.object.isRequired
    web3: PropTypes.object.isRequired,
    address: PropTypes.string,
    showEmpty: PropTypes.bool.isRequired,
}

ERC20ContractList.defaultProps = {
    //myProp: <defaultValue>
}

export default ERC20ContractList
