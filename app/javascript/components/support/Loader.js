import React from 'react'

export default function Loader({ size }) {

  return (
    <div style={{ height: size, background: "rgba(0,0,0,0.8)" }} className="text-center">
      <div style={{ color: "white", position: 'relative', top: '40%' }} >
        <i className="fa fa-spinner fa-pulse fa-2x fa-fw" style={{ margin: "auto" }}></i> <br />
        <span className="">Cargando...</span>
      </div>

    </div>
  )
}