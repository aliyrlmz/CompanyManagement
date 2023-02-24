import { createContext, useContext } from "react";
import CompanyStore from "./companyStore";

interface Store {
    companyStore: CompanyStore
}

export const store: Store = {
    companyStore: new CompanyStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}