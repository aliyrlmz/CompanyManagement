import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Company } from '../../../app/models/company';
import { useStore } from '../../../app/stores/store';
import CompanyDetails from '../details/CompanyDetails';
import CompanyForm from '../form/CompanyForm';
import CompanyList from './CompanyList';

interface Props {
    companies: Company[];
    deleteCompany: (id: number) => void;
    submitting: boolean;
}

export default observer( function CompanyDashboard({companies, deleteCompany, submitting}: Props) {

    const {companyStore} = useStore();
    const {selectedCompany, editMode} = companyStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <CompanyList companies={companies}
                    deleteCompany={deleteCompany}
                    submitting= {submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCompany && !editMode &&
                <CompanyDetails/>}
                {editMode &&
                <CompanyForm />}
            </Grid.Column>
        </Grid>
    )
})