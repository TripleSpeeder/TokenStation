import React, {Component} from 'react'
import {connect} from "react-redux"
import {addToken, initialize, changeFilterProps, TOKEN_LIST_STATES, setFilterString} from './tokenActions'
import TokenList from "./TokenList"
import {Divider} from 'semantic-ui-react'
import TokenListFilterContainer from './TokenListFilterContainer'

class TokenListContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.registryAddress = '0x5F0281910Af44bFb5fC7e86A404d0304B0e042F1'
        this.registryABI =  [{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"token","outputs":[{"name":"addr","type":"address"},{"name":"tla","type":"string"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_new","type":"address"}],"name":"setOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_tla","type":"string"},{"name":"_base","type":"uint256"},{"name":"_name","type":"string"}],"name":"register","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"},{"name":"_key","type":"bytes32"}],"name":"meta","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_tla","type":"string"},{"name":"_base","type":"uint256"},{"name":"_name","type":"string"},{"name":"_owner","type":"address"}],"name":"registerAs","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_tla","type":"string"}],"name":"fromTLA","outputs":[{"name":"id","type":"uint256"},{"name":"addr","type":"address"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"drain","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"tokenCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"unregister","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"fromAddress","outputs":[{"name":"id","type":"uint256"},{"name":"tla","type":"string"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_key","type":"bytes32"},{"name":"_value","type":"bytes32"}],"name":"setMeta","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tla","type":"string"},{"indexed":true,"name":"id","type":"uint256"},{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"name","type":"string"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tla","type":"string"},{"indexed":true,"name":"id","type":"uint256"}],"name":"Unregistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"},{"indexed":true,"name":"key","type":"bytes32"},{"indexed":false,"name":"value","type":"bytes32"}],"name":"MetaChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"},{"indexed":true,"name":"current","type":"address"}],"name":"NewOwner","type":"event"}]
    }

    componentDidMount() {
        if ((this.props.listState === TOKEN_LIST_STATES.VIRGIN) && (this.props.web3)) {
            console.log("Initializing tokens from componentDidMount")
            this.props.initialize(this.props.web3, this.registryABI, this.registryAddress)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.web3 && (newProps.web3 !== this.props.web3)) {
            console.log("Initializing tokens from componentWillReceiveProps")
            this.props.initialize(newProps.web3, this.registryABI, this.registryAddress)
        }

        /*
        if (newProps.queryAddress && (newProps.queryAddress !== this.props.queryAddress)) {
            // got a new query address. Clear all existing balances and start updating them.
            this.props.clearBalances()
            this.obtainBalances(newProps.queryAddress)
        }*/
    }

    render() {
        return (
            <div>
                <TokenListFilterContainer onFilterChange={this.props.setFilterString}/>
                <Divider/>
                <TokenList
                    filterIsActive={this.props.filterIsActive}
                    allTokenIds={this.props.allTokenIds}
                    matchedTokenIds={this.props.matchedTokenIds}
                    showEmpty={this.props.showEmpty}
                    progressTotal={this.props.progressTotal}
                    listState={this.props.listState}
                    currentlyLoadingToken={this.props.currentlyLoadingToken}
                />
            </div>
            )
    }
}

// Specifies the default values for props:
TokenListContainer.defaultProps = {
    showEmpty: true
};

const mapStateToProps = state => {
    // obtain last loaded token for progress display
    const lastTokenIdIndex = state.tokens.allIds.length-1
    const lastTokenId = (lastTokenIdIndex >= 0) ? state.tokens.allIds[lastTokenIdIndex] : null
    const lastToken = lastTokenId ? state.tokens.byId[lastTokenId] : null

    const filterIsActive = (state.tokens.listState.filter.length > 0)

    return {
        web3: state.web3Instance.web3,
        queryAddress: state.queryAddress.address,
        allTokenIds: state.tokens.allIds,
        filterIsActive: filterIsActive,
        matchedTokenIds: state.tokens.listState.matchedTokenIds,
        listState: state.tokens.listState.listState,
        progressTotal: state.tokens.listState.total,
        currentlyLoadingToken: lastToken
    }
}

const mapDispatchToProps = dispatch => ({
    addToken: (tokenId, token) => {
        dispatch(addToken(tokenId, token))
    },
    initialize: (web3, registryABI, registryAddress) =>
    {
        dispatch(initialize(web3, registryABI, registryAddress))
    },
    setFilterString: (filter) => {
        dispatch(setFilterString(filter))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TokenListContainer)
