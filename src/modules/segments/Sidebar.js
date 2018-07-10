import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Menu} from 'semantic-ui-react'


const Sidebar = (props) => {
    const {activeItem, clickItem} = props

    const handleItemClick = (e, { name }) => clickItem(name)

    return (
        <Menu icon='labeled' fluid inverted vertical pointing size={'large'}>
            <Menu.Item header>TokenStation</Menu.Item>
            <Menu.Item name='overview' active={activeItem === 'overview'} onClick={handleItemClick}>
                <Icon name='home' />
                Overview
            </Menu.Item>

            <Menu.Item name='accounts' active={activeItem === 'accounts'} onClick={handleItemClick}>
                <Icon name='users' />
                Manage Accounts
            </Menu.Item>

            <Menu.Item name='events' active={activeItem === 'events'} onClick={handleItemClick}>
                <Icon name='exchange' />
                View Transfer Events
            </Menu.Item>

            <Menu.Item name='tokenContracts' active={activeItem === 'tokenContracts'} onClick={handleItemClick}>
                <Icon name='cube' />
                Manage Contracts
            </Menu.Item>
        </Menu>
    )
}

Sidebar.propTypes = {
    activeItem: PropTypes.string.isRequired,
    clickItem: PropTypes.func.isRequired
}

export default Sidebar
