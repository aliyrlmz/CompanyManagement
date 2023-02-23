import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Company } from '../../../app/models/company';

interface Props {
    companies: Company[];
    selectCompany: (id: number) => void;
    deleteCompany: (id: number) => void;
}

export default function CompanyList({companies, selectCompany, deleteCompany}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {companies.map(company => (
                    <Item key={company.id}>
                        <Item.Content>
                            <Item.Header as='a'>{company.name}</Item.Header>
                            <Item.Meta>{company.createDate}</Item.Meta>
                            <Item.Description>
                                <div>{company.username}</div>
                                <div>{company.email}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectCompany(company.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteCompany(company.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={company.updateDate}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}