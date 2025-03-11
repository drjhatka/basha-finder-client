'use client';
import { PersistGate } from "redux-persist/integration/react";
import {persistor} from "@/app/redux/store";

export function PersistProvider({ children }: { children: React.ReactNode }) {
    return <PersistGate persistor={persistor} loading={null} >{children}</PersistGate>;
}

export default PersistProvider;
