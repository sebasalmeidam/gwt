import React, { useContext } from "react";
import InfiniteScroll from 'react-infinite-scroller';

export default function DisplayStudents({ entries, show, maxH }){
  const defMaxHeight = (altura) => {
    if (altura) {
      return maxH
    } else {
      return "180px"
    }
  }

  return (
    <div className="col-12" >
      <div className="my-2 py-2 card black" style={{ maxHeight: defMaxHeight(maxH), display: "block", overflowY: "auto" }}>
        <div className="card-title">
          <h4 className="h4-responsive lighter-font text-center">Some of your Students</h4>
        </div>
        <div className="card-body">
              {
                entries.edges.map((student) => {
                  return (
                    <div className="col-12" key={`${student.node.id}`} >
                      <a href={`https://bio.torre.co/es/${student.node.torreUsername}`} target="_blank" className="list-group-item btn-block main-bg dark-font" >
                        {student.node.name} - Go to Genome
                    </a>
                    </div>
                  )
              })
          }
          {!show && <div>No result, please contact us!</div>}
        </div>
        
      </div>
    </div>
  )
}