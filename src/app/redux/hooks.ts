import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Custom hook for useDispatch with proper typing
export const useAppDispatch: () => AppDispatch = useDispatch;

// Custom hook for useSelector with proper typing
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;