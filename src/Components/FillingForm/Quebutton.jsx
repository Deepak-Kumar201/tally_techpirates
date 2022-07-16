import React, { useContext } from 'react'
import FillContext from './Context/FillContext'

export default function Quebutton(props) {
  const context = useContext(FillContext)
  return (
    <div className='fillNumber' style={{backgroundColor:context.ans[props.number - 1] != null?"blue":(context.curQue == props.number - 1)?"lightgreen":context.boxColor[props.number - 1]}} onClick={()=>{context.setCurQue(props.number - 1)}}>
        {props.number}
    </div>
  )
}
