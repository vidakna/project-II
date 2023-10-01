import React from "react";

const Color = ({colors , slectedColor}) => {
  return (
    <>
      <ul className="colors ps-0">
          {colors && colors.map((color)=>{
              return(
                  <>
                  <li style={{backgroundColor:color.title}}></li>
                      <input value={color.title} type="radio" name="input" onChange={slectedColor}/>
                  </>
              )
          })}
      </ul>
    </>
  );
};

export default Color;
