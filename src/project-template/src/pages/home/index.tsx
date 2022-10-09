import React,{memo} from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import {store} from '../../store/index'
import './index.scss'
import img from '../../assets/img/3.jpg'


const Home = () => {
  const homeText = useContextSelector(store,store => store.home)
  console.log(1111);
  const navigate = useNavigate();
  const jump = () => {
    navigate('/detail');
  }
 return (
  <div className='box'>{homeText}<img onClick={jump} src={img} alt="" /></div>
 ) 
}
export default memo(Home)