import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Company } from '../models/company';
import NavBar from './NavBar';
import CompanyDashboard from '../../features/companies/dashboard/CompanyDashboard';

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Company[]>("http://localhost:5000/api/companies")
    .then(response => {
      setCompanies(response.data);
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
    company.id
    ? setCompanies([...companies.filter(x => x.id !== company.id), company])
    : setCompanies([...companies, company])
    setEditMode(false);
    setSelectedCompany(company);
  }

  function handleDeleteActivity(id: number) {
    setCompanies([...companies.filter(x => x.id !== id)])
  }

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
        />
      </Container>
    </>
  );
}

export default App;
