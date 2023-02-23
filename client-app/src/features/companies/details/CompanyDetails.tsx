import React from 'react';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react';
import { Company } from '../../../app/models/company';

interface Props {
    company: Company;
    cancelSelectCompany: () => void;
    openForm: (id: number) => void;
}

export default function CompanyDetails({ company, cancelSelectCompany, openForm}: Props) {
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
                    <Button onClick={cancelSelectCompany} basic color ='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}