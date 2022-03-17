import React, { useState } from 'react'
import { Range,getTrackBackground } from 'react-range';
import { useDispatch } from 'react-redux';
import { filterData } from '../redux/actions';

function RangeSlider({maxValue,type,updatingCriteria,filteringCriteria,reset,setReset}) {
    const [value, setValue] = useState([0])
    const dispatch = useDispatch()
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      margin: "2em"
    }}
  >
    <Range
      values={reset ? [0]: value}
      step={type==="value" ? 1 : 10}
      min={0}
      max={maxValue}
      onChange={(values)=>{
        setReset(false)
        setValue([Number(values[0])])}}
      onFinalChange={(values) => {
          
           if(type==="value"){
               updatingCriteria(values[0]) 
               dispatch(filterData(values[0],filteringCriteria.bySymbolSize,filteringCriteria.byProtocol))
           } else {
               updatingCriteria(values[0])
               dispatch(filterData(filteringCriteria.byValue,values[0],filteringCriteria.byProtocol))
           }            

        }}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%"
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: reset ? [0]: value,
                colors: ["#548BF4", "#ccc"],
                min: 0,
                max: maxValue
              }),
              alignSelf: "center"
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "42px",
            width: "42px",
            borderRadius: "4px",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 6px #AAA"
          }}
        >
          <div
            style={{
              height: "16px",
              width: "5px",
              backgroundColor: isDragged ? "#548BF4" : "#CCC"
            }}
          />
        </div>
      )}
    />
    <output className="text-sm font-medium text-gray-500" style={{ marginTop: "30px" }} id="output">
      {reset ? [0]: value[0].toFixed(1)}
    </output>
  </div>
  )
}

export default RangeSlider