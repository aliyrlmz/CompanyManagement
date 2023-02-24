import React from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function CompanyDetails() {

    const {companyStore} = useStore();
    const {selectedCompany: company, openForm, cancelSelectedCompany} = companyStore;

    if(!company) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${company.status}.jpg`} />
            <Card.Content>
                <Card.Header>{company.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{company.createDate}</span>
                </Card.Meta>
                <Card.Description>
                    {company.email}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button onClick={() => openForm(company.id)}  basic color ='blue' content='Edit' />
                    <Button onClick={cancelSelectedCompany} basic color ='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}