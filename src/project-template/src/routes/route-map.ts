import {lazy} from 'react'
import { isNode } from '../../tool';
const Home = lazy(() => import("../pages/home"));
const Detail = lazy(() => import("../pages/detail"));

const routeMap = {
  "/": Home,
  "/home": Home,
  '/detail':Detail
}

export default routeMap;