import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    ADDRESS_BALANCES_STATES,
    ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED, removeAddress,
    resumeGetBalances
} from './addressActions'
import {Button, List, Icon, Progress} from 'semantic-ui-react'
import {BALANCE_STATES} from '../balance/balanceActions'


class Address extends PureComponent {

    constructor(props, context) {
        super(props, context)
        this.state = {
            loadingStarted: false
        }
    }

    componentDidMount() {
        this.checkResumeLoading(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.checkResumeLoading(newProps)
        // update local state if loading has finished
        if ((this.props.balancesState === ADDRESS_BALANCES_STATES.LOADING) &&
            (newProps.balancesState === ADDRESS_BALANCES_STATES.INITIALIZED)) {
            this.setState({
                loadingStarted: false
            })
            console.log("Finished loading address balance for " + this.props.address)
        }
    }

    checkResumeLoading(props) {
        // in case address balance was in loading state while hydrating, continue loading
        if ((props.web3) &&
            (props.balancesState === ADDRESS_BALANCES_STATES.LOADING) &&
            (!this.state.loadingStarted)) {
            this.setState({
                loadingStarted: true
            })
            console.log("Continue loading balances for " + props.address)
            props.resumeGetBalances(props.addressId, props.progressCurrent)
        }
    }

    handleRemove = () => {
        this.props.removeAddress(this.props.addressId)
    }

    render() {
        let removeButton = null
        if (this.props.canRemove) {
            removeButton = <List.Content floated='right'>
                <Button size='tiny' onClick={this.handleRemove} icon='delete'/>
            </List.Content>
        }
        let listProgress = null
        if (this.props.progressCurrent < this.props.progressTotal) {
            listProgress = <List.Description>
                <Progress size='small'
                          value={this.props.progressCurrent}
                          total={this.props.progressTotal}
                          progress='ratio'
                          precision={1}
                />
            </List.Description>
        }
        return (
            <List.Item>
                {removeButton}
                <List.Content>
                    <List.Header>
                        <Icon name={this.props.iconName}/> {this.props.address}
                    </List.Header>
                    {listProgress}
                </List.Content>
            </List.Item>
        )
    }
}

Address.propTypes = {
    addressId: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    removeAddress: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    canRemove: PropTypes.bool.isRequired,
    progressTotal: PropTypes.number.isRequired,
    progressCurrent: PropTypes.number.isRequired
}

Address.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
    const addressEntry = state.addresses.byId[ownProps.addressId]
    const progressTotal = state.tokens.listState.total
    // count all balance entries that include addressId
    const matchedBalanceEntries = Object.values(state.balance.byId).filter(entry => {
        return ((entry.addressId === ownProps.addressId) &&
            (entry.balanceState === BALANCE_STATES.INITIALIZED))
    })
    const progressCurrent = matchedBalanceEntries.length

    return {
        web3: state.web3Instance.web3,
        address: addressEntry.address,
        balancesState: addressEntry.balancesState,
        iconName: addressEntry.type === ADDRESS_TYPE_OWNED ? 'unlock' : 'lock',
        canRemove: addressEntry.type === ADDRESS_TYPE_EXTERNAL,
        progressTotal,
        progressCurrent
    }
}

const mapDispatchToProps = dispatch => ({
    removeAddress: (addressId) => {
        dispatch(removeAddress(addressId))
    },
    resumeGetBalances: (addressId, startIndex) => {
        dispatch(resumeGetBalances(addressId, startIndex))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Address)
