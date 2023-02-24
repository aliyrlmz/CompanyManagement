import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Company } from "../models/company"

export default class CompanyStore {
    companies: Company[] = [];
    selectedCompany?: Company | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }


    loadCompanies = async () => {
        this.setLoadingInitial(true);
        try {
            const companies = await agent.Companies.list();
                companies.forEach(company => {
                    company.createDate = company.createDate.split('T')[0];
                    this.companies.push(company);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
                this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectCompany = (id : number) => {
        this.selectedCompany = this.companies.find(a => a.id === id);
    }

    cancelSelectedCompany = () => {
        this.selectedCompany = undefined;
    }

    openForm = (id?: number) => {
        id ? this.selectCompany(id) : this.cancelSelectedCompany();
        this.editMode = true;
    }

    closeForm = () =>{
        this.editMode = false;
    }

    createCompany = async (company: Company) => {
        this.loading = true;
        try {
            await agent.Companies.create(company);
            runInAction(() => {
                //
                this.companies.push(company);
                this.selectedCompany = company;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction (() => {
                this.loading = false;
            })
        }

    }

    updateCompany = async (company: Company) => {
        this.loading = true;
        try {
            await agent.Companies.update(company);
            runInAction (() => {
                this.companies = [...this.companies.filter(a => a.id !== company.id), company];
                this.selectedCompany = company;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction (() => {
                this.loading = false;
            })
        }
    }
}