import React,{memo, useContext} from 'react';
import { useContextSelector } from 'use-context-selector';
import { store } from '../../store';
import cn from './index.module.scss'
console.log(1111,cn)
const Detail = () => {
  const detailText = useContextSelector(store, store => store.detail)
 return (
  <div className={cn['bg']}>{detailText}</div>
 ) 
}
export default memo(Detail)