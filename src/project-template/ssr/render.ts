import React, { createElement , Suspense} from 'react';
import {renderToString,renderToPipeableStream} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';  
import storeVar from './project/store';
const {default:Provider} = storeVar.store; 

const render2String = (Comp:React.ComponentType,location) => {
  const loading = createElement('div',{},'loading')
  const AppWhithRouter =  createElement(
    StaticRouter,
    {location},
    createElement(Comp)
  )
  console.log(Provider);
  debugger
  const AppWidthStore = createElement(Provider,{}, AppWhithRouter )
  const domString = renderToString(AppWidthStore);
  return domString;
}
export default render2String