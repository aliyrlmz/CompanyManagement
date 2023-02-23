import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Company } from '../../../app/models/company';
import CompanyDetails from '../details/CompanyDetails';
import CompanyForm from '../form/CompanyForm';
import CompanyList from './CompanyList';

interface Props {
    companies: Company[];
    selectedCompany: Company | undefined;
    selectCompany: (id: number) => void;
    cancelSelectCompany: () => void;
    editMode: boolean;
    openForm: (id: number) => void;
    closeForm: () => void;
    createOrEdit: (company: Company) => void;
    deleteCompany: (id: number) => void;
}

export default function CompanyDashboard({companies, selectedCompany, deleteCompany,
        selectCompany, cancelSelectCompany, editMode, openForm, closeForm, createOrEdit}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <CompanyList companies={companies}
                    selectCompany={selectCompany}
                    deleteCompany={deleteCompany}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCompany && !editMode &&
                <CompanyDetails
                    company={selectedCompany}
                    cancelSelectCompany= {cancelSelectCompany}
                    openForm={openForm}
                />}
                {editMode &&
                    <CompanyForm
                    closeForm= {closeForm} company= {selectedCompany} createOrEdit= {createOrEdit}/>}
            </Grid.Column>
        </Grid>
    )
}