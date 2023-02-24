import React, { Fragment, useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Company } from '../models/company';
import NavBar from './NavBar';
import CompanyDashboard from '../../features/companies/dashboard/CompanyDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {companyStore} = useStore();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    companyStore.loadCompanies();
  }, [companyStore])

  function handleDeleteActivity(id: number) {
    setSubmitting(true);
    agent.Companies.delete(id).then(() => {
    setCompanies([...companies.filter(x => x.id !== id)])
    setSubmitting(false);
    })
  }

  if (companyStore.loadingInitial) return <LoadingComponent content= {'Loading app'}/>

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <CompanyDashboard
          companies={companyStore.companies}
          deleteCompany = {handleDeleteActivity}
          submitting = {submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
