import React, {Component} from 'react'
import contract from 'truffle-contract'
import erc20ABI from 'human-standard-token-abi'

import {connect} from "react-redux"
import {addToken} from "./actions"
import TokenList from "./TokenList"

class TokenListContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        // prepare ERC20 contract abstraction
        this.ERC20Contract = contract({abi: erc20ABI})
        this.ERC20Contract.setProvider(this.props.web3.currentProvider)

        // prepare token registry abstraction
        this.registryAddress = '0x5F0281910Af44bFb5fC7e86A404d0304B0e042F1'
        const registriyAbi = [{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"token","outputs":[{"name":"addr","type":"address"},{"name":"tla","type":"string"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_new","type":"address"}],"name":"setOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_tla","type":"string"},{"name":"_base","type":"uint256"},{"name":"_name","type":"string"}],"name":"register","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"},{"name":"_key","type":"bytes32"}],"name":"meta","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_tla","type":"string"},{"name":"_base","type":"uint256"},{"name":"_name","type":"string"},{"name":"_owner","type":"address"}],"name":"registerAs","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_tla","type":"string"}],"name":"fromTLA","outputs":[{"name":"id","type":"uint256"},{"name":"addr","type":"address"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"drain","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"tokenCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"unregister","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"fromAddress","outputs":[{"name":"id","type":"uint256"},{"name":"tla","type":"string"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_key","type":"bytes32"},{"name":"_value","type":"bytes32"}],"name":"setMeta","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tla","type":"string"},{"indexed":true,"name":"id","type":"uint256"},{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"name","type":"string"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tla","type":"string"},{"indexed":true,"name":"id","type":"uint256"}],"name":"Unregistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"},{"indexed":true,"name":"key","type":"bytes32"},{"indexed":false,"name":"value","type":"bytes32"}],"name":"MetaChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"},{"indexed":true,"name":"current","type":"address"}],"name":"NewOwner","type":"event"}]
        this.tokenRegistry = contract({abi: registriyAbi})
        this.tokenRegistry.setProvider(this.props.web3.currentProvider)

        // start obtaining list of all tokens
        this.obtainERCTokens()
    }

    obtainERCTokens() {
        let theTokenRegistry
        this.tokenRegistry.at(this.registryAddress)
            .then((instance) => {
                theTokenRegistry = instance
                return theTokenRegistry.tokenCount()
            })
            .then((count) => {
                console.log("Tokencount: " + count)
                // for testing
                const limit=6
                if (count > limit) count = limit
                //
                for (let id=0; id < count; id++) {
                    theTokenRegistry.token(id).then((parityToken)=>{
                        const address = parityToken[0]
                        if (address!=='0x0000000000000000000000000000000000000000') {
                            console.log("Got token " + id + ": " + parityToken[3] + " at " + parityToken[0])
                            this.props.addToken(id, this.mapParityToken(id, parityToken))
                        }
                    })
                }
            })
    }

    mapParityToken(id, parityToken) {
        return {
            id: id,
            address: parityToken[0],
            symbol: parityToken[1],
            decimals: parityToken[2],
            name: parityToken[3],
            description: 'none',
            website: 'none',
            imageUrl: 'none',
            supply: this.props.web3.toBigNumber(0),
        }
    }

    render() {
        return <TokenList
            tokenIds={this.props.tokenIds}
            showEmpty={this.props.showEmpty}
        />
    }
}

const mapStateToProps = state => ({
    web3: state.web3Instance.web3,
    address: state.queryAddress.address,
    tokenIds: state.tokens.allIds
})

const mapDispatchToProps = dispatch => ({
    addToken: (tokenId, token) => {
        dispatch(addToken(tokenId, token))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TokenListContainer)
