// Sidebar imports
import {
  UilHospital,
  UilUserMd,
  UilUserNurse,
  UilUsersAlt
} from "@iconscout/react-unicons";

// Sidebar Data
export const SidebarData = [
  {
    key: 1,
    icon: UilHospital,
    heading: "Dashboard",
    link: "/dashboard",
  },

  {
    key: 3,
    icon: UilUserMd,
    heading: "Manage Doctors",
    link: "/doctor",
  },
  {
    key: 4,
    icon: UilUserNurse,
    heading: "Manage Nurses",
    link: "/nurse",
  },
  {
    key: 5,
    icon: UilUsersAlt,
    heading: "Manage Patients",
    link: "/patient",
  }
];
