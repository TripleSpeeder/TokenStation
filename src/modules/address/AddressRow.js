import React from 'react'
import PropTypes from 'prop-types'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED} from './addressActions'
import {Button, Icon, Popup, Table} from 'semantic-ui-react'
import AddressDisplay from '../common/AddressDisplay'

const AddressRow = (props) => {

    const {address, addressType, ensName} = props

    let iconName, popupContent, removeButton
    if (addressType === ADDRESS_TYPE_OWNED) {
        iconName = 'unlock'
        popupContent = 'This is one of your addresses'
        removeButton = null
    } else {
        iconName = 'eye'
        popupContent = 'This is a watch-only address'
        removeButton = <Button size='tiny' onClick={this.handleRemove} icon='delete'/>
    }

    const icon = <Popup trigger={<Icon size='large' name={iconName}/>}
                        content={popupContent}
    />

    /*
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
    }*/
    return (
        <Table.Row>
            <Table.Cell textAlign={'left'} collapsing>
                {icon}
            </Table.Cell>
            <Table.Cell textAlign={'left'}>
                <AddressDisplay address={address} ensName={ensName}/>
            </Table.Cell>
            <Table.Cell textAlign={'right'} collapsing>
                {removeButton}
            </Table.Cell>
        </Table.Row>
    )
}

AddressRow.propTypes = {
    address: PropTypes.string.isRequired,
    ensName: PropTypes.string,
    addressType: PropTypes.oneOf([ADDRESS_TYPE_OWNED, ADDRESS_TYPE_EXTERNAL]).isRequired,
}

AddressRow.defaultProps = {
    //myProp: <defaultValue>
}

export default AddressRow
