import { create as zustandCreate } from "zustand";
import { StateCreator } from "zustand";

const storeResetFns = new Set<() => void>();

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export const create = (<T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = zustandCreate(stateCreator);
    const initialState = store.getInitialState();
    
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    
    return store;
  };
}) as typeof zustandCreate;