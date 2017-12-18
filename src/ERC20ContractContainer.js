import React, {Component, PropTypes} from 'react'
import TokenDescription from "./TokenDescription"
import erc20ABI from "human-standard-token-abi"
import contract from "truffle-contract"


class ERC20ContractContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            loading: true,
            name: this.props.ERC20Contract.tokenName,
            symbol: this.props.ERC20Contract.tokenSymbol,
            description: 'none',
            website: 'none',
            imageUrl: 'none',
            decimals: this.props.ERC20Contract.tokenDecimals,
            supply: 'none',
            contract: this.props.ERC20Contract.tokenAddress,
        }
        // prepare ERC20 contract abstraction
        this.ERC20Contract = contract({abi: erc20ABI})
        this.ERC20Contract.setProvider(this.props.web3.currentProvider)
    }

    componentDidMount() {
        // get contract instance for token
        console.log("Getting contract instance for " + this.state.name)
        let erc20Instance
        this.ERC20Contract.at(this.state.contract)
            .then((instance) => {
                erc20Instance = instance
                return erc20Instance.totalSupply()
            })
            .then((supply) => {
                if (supply) {
                    console.log("Got supply: " + supply)
                } else {
                    console.log("Empty supply :-(")
                }
                this.setState({ supply: supply })
            })
    }


    render() {
        return <TokenDescription token={this.state}/>
        /*
        const {tokenName} = this.props.ERC20Contract
        return (
            <div>
                Token: {tokenName}
            </div>
        )
         */
    }
}

ERC20ContractContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
    ERC20Contract: PropTypes.object.isRequired,
    web3: PropTypes.object.isRequired
}

ERC20ContractContainer.defaultProps = {
    //myProp: <defaultValue>
}

export default ERC20ContractContainer
