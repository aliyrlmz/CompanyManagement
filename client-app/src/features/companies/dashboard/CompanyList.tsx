import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Company } from '../../../app/models/company';
import { useStore } from '../../../app/stores/store';

interface Props {
    companies: Company[];
    deleteCompany: (id: number) => void;
    submitting: boolean;
}

export default function CompanyList({companies, deleteCompany, submitting}: Props) {
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: number){
        setTarget(e.currentTarget.name);
        deleteCompany(id);
    }

    const {companyStore} = useStore();

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
                                <Button onClick={() => companyStore.selectCompany(company.id)} floated='right' content='View' color='blue' />
                                <Button
                                    name={company.id}
                                    loading={submitting && target === company.id.toLocaleString()}
                                    onClick={(e) => handleActivityDelete(e, company.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                                <Label basic content={company.updateDate}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}