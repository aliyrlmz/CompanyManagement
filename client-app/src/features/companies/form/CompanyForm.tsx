import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Company } from '../../../app/models/company';

interface Props {
    company: Company | undefined;
    closeForm: () => void;
    createOrEdit: (company: Company) => void;
    submitting: boolean;
}

export default function CompanyForm({company: selectedCompany, closeForm, createOrEdit, submitting}: Props){

    const initialState = selectedCompany ?? {
        id: Number(''),
        username: '',
        name: '',
        email: '',
        password: '',
        passwordSalt: '',
        status: Number(''),
        createDate: '',
        updateDate: ''
    }

    const [company, setCompany] = useState(initialState);

    function handleSubmit() {
        createOrEdit(company);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setCompany({...company, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete= 'off'>
                <Form.Input placeholder='Name' value= {company.name} name= 'name' onChange={handleInputChange}/>
                <Form.Input placeholder='Username' value= {company.username} name= 'username' onChange={handleInputChange}/>
                <Form.Input placeholder='Email' value= {company.email} name= 'email' onChange={handleInputChange}/>
                <Form.Input placeholder='Password' name= 'password' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type ='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type ='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}