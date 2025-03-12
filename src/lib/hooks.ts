// Use throughout your app instead of plain `useDispatch` and `useSelector`

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
