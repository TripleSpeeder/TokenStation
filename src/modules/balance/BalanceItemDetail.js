import React from 'react'
import PropTypes from 'prop-types'
import {Table, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Balance from './Balance'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED} from '../address/addressActions'
import AddressDisplay from '../common/AddressDisplay'

const BalanceItemDetail = (props) => {
    const {address, ensName, balance, loading, reloadBalance, url/*, addressType, openTransferModal*/} = props
    /*const external = (addressType !== ADDRESS_TYPE_OWNED)*/

    /*
        transfer button removed until functionality gets implemented...

                <Button icon='external share'
                    size='mini'
                    circular
                    onClick={openTransferModal}
                    disabled={external}
                />
     */

    return (
        <Table.Row>
            <Table.Cell>
            </Table.Cell>
            <Table.Cell>
                <Link to={url}><AddressDisplay address={address} ensName={ensName}/></Link>
            </Table.Cell>
            <Table.Cell><Balance balance={balance}/></Table.Cell>
            <Table.Cell>
                <Button size='mini'
                        circular
                        icon='refresh'
                        loading={loading}
                        onClick={reloadBalance} />
            </Table.Cell>
        </Table.Row>
    )
}

BalanceItemDetail.propTypes = {
    address: PropTypes.string.isRequired,
    addressType: PropTypes.oneOf([ADDRESS_TYPE_OWNED, ADDRESS_TYPE_EXTERNAL]).isRequired,
    ensName: PropTypes.string,
    balance: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    openTransferModal: PropTypes.func.isRequired,
    reloadBalance: PropTypes.func.isRequired,
}

BalanceItemDetail.defaultProps = {
    //myProp: <defaultValue>
}

export default BalanceItemDetail
