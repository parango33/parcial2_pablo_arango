import React, {useEffect, useState} from "react";


function Main(){

    let[espacios,setEspacios] = useState([ ])

    //URl de donde pedir los datos
    let URL ="https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json"
     

    //hook de efecto
    useEffect(()=> {
        fetch(URL).then(res=> res.json()).then(res =>{
            console.log("Fetch response", res)
            setEspacios(res)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
    );

    function showDetail(event){
        //setLocation(event.target.innerHTML.id)
        console.log(event)
    }

    return(
        <div className='container' id="canvas">
        <div className="row" onClick={showDetail} >
           <h1> My spaces</h1>
             <div className="col"  id={espacios[0].id}>
                <div className="card" >
                    <img src="https://thumbs.dreamstime.com/b/house-vector-icon-home-logo-isolated-white-background-house-vector-icon-home-logo-vector-illustration-138343234.jpg" className="card-img-top" alt="..."/>
                    <h3>{espacios[0] && espacios[0].name}</h3>
                    <div className="card-body">
                        <p className="card-text">{ espacios[0] && espacios[0].address}</p>
                    </div>      
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <img src="https://thumbs.dreamstime.com/b/house-vector-icon-home-logo-isolated-white-background-house-vector-icon-home-logo-vector-illustration-138343234.jpg" className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h3>{ espacios[1] && espacios[1].name}</h3>
                        <p className="card-text">{espacios[1] && espacios[1].address}</p>
                    </div>      
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <img src="https://thumbs.dreamstime.com/b/house-vector-icon-home-logo-isolated-white-background-house-vector-icon-home-logo-vector-illustration-138343234.jpg" className="card-img-top" alt="..."/>
                    <h3>{ espacios[2] && espacios[2].name}</h3>
                    <div className="card-body">
                        <p className="card-text">{espacios[2] && espacios[2].address}</p>
                    </div>      
                </div>
            </div>
            <div className="col">
                <div className="card">
                    <img src="https://thumbs.dreamstime.com/b/house-vector-icon-home-logo-isolated-white-background-house-vector-icon-home-logo-vector-illustration-138343234.jpg" className="card-img-top" alt="..."/>
                    <h3>{espacios[3] && espacios[3].name}</h3>
                    <div className="card-body">
                        <p className="card-text">{espacios[3] && espacios[3].address}</p>
                    </div>      
                </div>
            </div>
    
        </div>  
        

       

      </div>
    )
}

export default Main;
