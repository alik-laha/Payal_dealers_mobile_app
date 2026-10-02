import { create } from "zustand";

type websiteData = {
    code: string;
    url: string;
    name: string;
}

type permittedWebsite = {
    permittedWebsite: websiteData;
    siteUserName: string;
}

type PermittedWebsiteStore = {
    permittedWebsites: permittedWebsite[],
    setAllPermittedWebsites: (permittedWebsite: permittedWebsite[]) => void;
}

export const usePermittedWebsiteStore = create<PermittedWebsiteStore>((set) => ({
    permittedWebsites: [],
    setAllPermittedWebsites: (permittedWebsites) => set({ permittedWebsites })
}))