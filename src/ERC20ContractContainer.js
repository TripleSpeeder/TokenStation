import React, {Component, PropTypes} from 'react'
import TokenDescription from "./TokenDescription"
import erc20ABI from "human-standard-token-abi"
import contract from "truffle-contract"


class ERC20ContractContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            loading: false,
            name: this.props.ERC20Contract.tokenName,
            symbol: this.props.ERC20Contract.tokenSymbol,
            description: 'none',
            website: 'none',
            imageUrl: 'none',
            decimals: this.props.ERC20Contract.tokenDecimals,
            supply: this.props.web3.toBigNumber(0),
            contract: this.props.ERC20Contract.tokenAddress,
            balance: this.props.web3.toBigNumber(0),
        }
        // prepare ERC20 contract abstraction
        this.ERC20Contract = contract({abi: erc20ABI})
        this.ERC20Contract.setProvider(this.props.web3.currentProvider)
        this.ERC20ContractInstance = null

        this.refresh = this.refresh.bind(this)
    }

    async componentDidMount() {
        // get contract instance for token
        console.log("Getting contract instance for " + this.state.name)
        this.setState({loading: true})
        this.ERC20ContractInstance = await this.ERC20Contract.at(this.state.contract)
        this.refresh()
        /*
        this.ERC20Contract.at(this.state.contract)
            .then((instance) => {
                this.ERC20ContractInstance = instance
                return this.ERC20ContractInstance.totalSupply()
            })
            .then(this.getBalance(this.props.address))
            */
    }

    async refresh() {
        this.setState({ loading: true })
        let supply = await this.ERC20ContractInstance.totalSupply()
        this.setState({ supply: supply })
        if (this.props.address) {
            let balance = await this.ERC20ContractInstance.balanceOf(this.props.address)
            this.setState({balance: balance})
        }
        this.setState({ loading: false})
    }

    async getBalance(address) {
        if (address) {
            this.setState({ loading: true })
            let balance = await this.ERC20ContractInstance.balanceOf(address)
            this.setState({balance: balance})
            this.setState({ loading: false })
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.address != this.props.address){
            this.getBalance(nextProps.address)
        }
    }

    render() {
        if (this.props.showEmpty) {
            return <TokenDescription token={this.state}
                                     handleRefresh={this.refresh}/>
        } else {
            if (!this.state.balance.isZero()){
                return <TokenDescription token={this.state}
                                         handleRefresh={this.refresh}
                />
            }
            else
                return null
        }
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
    web3: PropTypes.object.isRequired,
    address: PropTypes.string
}

ERC20ContractContainer.defaultProps = {
    //myProp: <defaultValue>
}

export default ERC20ContractContainer
