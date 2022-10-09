import React, { createElement } from 'react'
import type {FC} from 'react'
import { createContext, useContextSelector } from 'use-context-selector';
const initailState = {
  home: 'nihao home',
  detail: 'nihao detail'
};
export const store = createContext(initailState);
type Props = {
  children?: React.ReactNode
};
const Provider:FC<Props> = (props) => {
  return createElement(store.Provider,{value:initailState}, props.children)
  // return <store.Provider value={initailState}>
  //   {props.children}
  // </store.Provider>
}
export default Provider;