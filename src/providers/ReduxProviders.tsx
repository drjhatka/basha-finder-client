'use client';
import { Provider } from 'react-redux';
import {persistor, store} from "@/app/redux/store";
import { PersistGate } from "redux-persist/integration/react";


export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>;
}

export default ReduxProvider;
