'use client';
import { persistor } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";


export function PersistProvider({ children }: { children: React.ReactNode }) {
    return <PersistGate persistor={persistor} loading={null} >{children}</PersistGate>;
}

export default PersistProvider;
