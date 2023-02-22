import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';

function App() {
  const [compaines, setCompanies] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/api/companies")
    .then(response => {
      setCompanies(response.data);
    })
  }, [])

  return (
    <div>
        <Header as='h2' icon ='users' content='Companies'/>
        <List>
          {compaines.map((company: any) => (
            <List.Item key ={company.id}>
              {company.name}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
