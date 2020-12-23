import React from 'react';

export default function Panels4lg({title, stat}) {
  return (
    <div className="mb-3 col-12 col-md-6 col-lg-4">
      <div className="card black dash-card rounded">
        <div className="card-body">
          <div className="card-title">
            <h4 className="h4-responsive lighter-font text-center">{title}</h4>
          </div>
          {stat}
        </div>
      </div>
    </div>
  )
}