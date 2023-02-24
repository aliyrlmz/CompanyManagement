import React, { Fragment, useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Company } from '../models/company';
import NavBar from './NavBar';
import CompanyDashboard from '../../features/companies/dashboard/CompanyDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    agent.Companies.list().then(response => {
      let companies: Company[] = [];
      response.forEach(company => {
        company.updateDate = company.updateDate.split('T')[0];
        company.createDate = company.createDate.split('T')[0];
        companies.push(company);
      })
      setCompanies(companies);
      setLoading(false);
    })
  }, [])

  function handleSelectCompany(id: number) {
    setSelectedCompany(companies.find(x => x.id === id));
  }

  function handleCancelSelecCompany() {
    setSelectedCompany(undefined);
  }

  function handleFormOpen(id?: number) {
    id ? handleSelectCompany(id) : handleCancelSelecCompany();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditCompany(company: Company) {
    setSubmitting(true);
    if (company.id) {
      agent.Companies.update(company).then(() => {
        setCompanies([...companies.filter(x => x.id !== company.id), company])
        setSelectedCompany(company);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      agent.Companies.create(company).then(() => {
        setCompanies([...companies, company]);
        setSelectedCompany(company);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: number) {
    setSubmitting(true);
    agent.Companies.delete(id).then(() => {
    setCompanies([...companies.filter(x => x.id !== id)])
    setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content= {'Loading app'}/>

  return (
    <>
      <NavBar openForm ={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <CompanyDashboard
          companies={companies}
          selectedCompany={selectedCompany}
          selectCompany={handleSelectCompany}
          cancelSelectCompany={handleCancelSelecCompany}
          editMode= {editMode}
          openForm= {handleFormOpen}
          closeForm= {handleFormClose}
          createOrEdit= {handleCreateOrEditCompany}
          deleteCompany = {handleDeleteActivity}
          submitting = {submitting}
        />
      </Container>
    </>
  );
}

export default App;
