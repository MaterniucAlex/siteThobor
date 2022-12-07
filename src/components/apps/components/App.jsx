import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function App({ titlu, p, img, link, codeQR, data1, data2 }) {
  return (
    <>
      <div className="app">
        <div className="top">
          <img src={img} alt=""   />
          <div className="txt">
            <div className="title">
              <h1>{titlu}</h1>
              <div className="linie"></div>
            </div>
            <div className="text">
              <div className="linie_vert"></div>
              <p>{p}</p>
            </div>
          </div>
        </div>

        <a href={link} className="button">
          Download
        </a>
        {codeQR && <img src={codeQR} className="qr" alt="" />}
      </div>
    </>
  );
}

export default App;
