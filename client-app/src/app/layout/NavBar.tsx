import React, { useState } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {

    const {companyStore} = useStore();

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt="logo" style={{marginRight: '10px'}}/>
                    Companies
                </Menu.Item>
                <Menu.Item name ='Companies' />
                <Menu.Item>
                    <Button onClick={() => companyStore.openForm()} positive content ='Create Company' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}