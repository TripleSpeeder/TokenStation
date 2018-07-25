import React from 'react'
import {Icon, Menu} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'


const Sidebar = () => {
    return (
        <Menu icon='labeled' fluid inverted vertical pointing size={'large'}>
            <Menu.Item header>TokenStation</Menu.Item>
            <Menu.Item as={NavLink} to='/overview' name='overview'>
                <Icon name='home' />
                Overview
            </Menu.Item>

            <Menu.Item as={NavLink} to='/accounts' name='accounts'>
                <Icon name='users' />
                Manage Accounts
            </Menu.Item>

            <Menu.Item as={NavLink} to='/events' name='events' >
                <Icon name='exchange' />
                View Transfer Events
            </Menu.Item>

            <Menu.Item as={NavLink} to='/tokenContracts' name='tokenContracts'>
                <Icon name='cube' />
                Manage Contracts
            </Menu.Item>
        </Menu>
    )
}

export default Sidebar
