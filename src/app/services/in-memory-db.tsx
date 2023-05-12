import { Naami } from "@/models/Naami";
import adminsList from "../../data/admins.json";
import naamiList from "../../data/naamis.json";

const naamiFormKeys = "USER_LIST";
const adminKeys = "ADMIN_LIST";
const admins: any[] = adminsList;
const naamis: Naami[] = (naamiList as Naami[]) || [];
let loginAdmin: any = null;

export const saveNaamiForm = (naamiForm: Naami) => {
  naamis.push(naamiForm);
};

export const getNaamiList = () => {
  return naamis;
};

export const getNaamiFormById = (id: string) => {
  return naamis.find((x) => x.id === id);
};

export const adminLogin = (name?: string) => {
  if (name) {
    loginAdmin = admins.find((x) =>
      x.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  return loginAdmin;
};

export const getNaamiListByLogin = (admin: any) => {
  return naamis.filter((x) => x.naamDaanLocation === admin.location);
};
