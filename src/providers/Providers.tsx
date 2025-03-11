/*
"use client";

import UserProvider from "@/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
*/
'use client'; // 🔴 Read Quote below

import { Provider } from 'react-redux';
import {store} from "@/app/redux/store";


export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
