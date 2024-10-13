export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "Dashboards",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
      },
    ],
  },
  {
    heading: "Features",
    children: [
      {
        name: "Api Credentails",
        icon: "solar:password-minimalistic-outline",
        id: uniqueId(),
        url: "/ui/form",
      },
    ],
  },
  {
    heading: "Trade & Logs",
    children: [
      {
        name: "Orders",
        icon: "solar:bedside-table-3-linear",
        id: uniqueId(),
        url: "/ui/table",
      },
      {
        name: "Trade Logs",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/ui/typography",
      },
    ],
  },
  // {
  //   heading: "Auth",
  //   children: [
  //     {
  //       name: "Login",
  //       icon: "solar:login-2-linear",
  //       id: uniqueId(),
  //       url: "/auth/login",
  //     },
  //     {
  //       name: "Register",
  //       icon: "solar:shield-user-outline",
  //       id: uniqueId(),
  //       url: "/auth/register",
  //     },
  //   ],
  // },
];

export default SidebarContent;
