import React, {useEffect, useState} from "react";
import { FormattedMessage } from "react-intl";
import Room from "./room";

function Main(){

    let[espacios,setEspacios] = useState([ ])
    let [rooms,setRooms] = useState([])
    let [selectedEspacioRooms,setRoomEs] = useState([])

    //URl de donde pedir los datos
    let URL ="https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json"
     
    let URLRooms = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json"

    //hook de efecto
    useEffect(()=> {

        //Navegador offline
        if (!navigator.onLine){
            //Nada en localstorage
           
            if(localStorage.getItem("espacios")===null){
                setEspacios([{
                    "name": "NO HAY INTERNET",
                    "address": "NO HAY INTERNET"
                  },{
                    "name": "NO HAY INTERNET",
                    "address": "NO HAY INTERNET"
                  }])

                  setRooms([{
                      "name":"NO HAY INTERNET"
                  }])
            }

            //Algo en localstorage
            else{
                console.log("localstorage:"+ localStorage.getItem("espacios"))
                console.log("localstorage2:"+ localStorage.getItem("rooms"))
                setEspacios(JSON.parse(localStorage.getItem("espacios")))
                setRooms(JSON.parse(localStorage.getItem("rooms")))
                console.log("espacios",typeof(espacios))
            }
        }

        //Navegador Online
        else{
            fetch(URL).then(res=> res.json()).then(res =>{
                console.log("Fetch response", res)
                setEspacios(res)

                //Guardar espacios en local storage
                localStorage.setItem("espacios",JSON.stringify(res))
            })

            fetch(URLRooms).then(datos=> datos.json()).then(datos => {
                console.log("fetch datos",datos)
                setRooms(datos)

                //Guardar rooms en lc
                localStorage.setItem("rooms",JSON.stringify(datos))
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]

       
    );

    function showDetail(event){
        //setLocation(event.target.innerHTML.id)
        console.log(event.target.id)
        let roomsSel=[]
        for(let i=0;i<rooms.length;i++){
            if(rooms[i].homeId === event.target.id){
                roomsSel.push(rooms[i])
            }
        }
        setRoomEs(roomsSel)
        
    }

    return(
        
        <div className='container' id="canvas">
            <div className="row" onClick={showDetail} >
                <h1> <FormattedMessage id='My Spaces'/></h1>
                <div className="col" >
                    <div className="card card-block stretched-link text-decoration-none" id={espacios[0] && espacios[0].id}>
                        <img src="https://thumbs.dreamstime.com/b/house-vector-icon-home-logo-isolated-white-background-house-vector-icon-home-logo-vector-illustration-138343234.jpg" className="card-img-top" alt="..."/>
                        <h3>{espacios[0] && <FormattedMessage id={espacios[0].name}/> }</h3>
                        <div className="card-body">
                            <p className="card-text">{ espacios[0] && espacios[0].address}</p>
                        </div>      
                    </div>
                </div>
                <div className="col">
                    <div className="card card-block stretched-link text-decoration-none"  id={espacios[1] && espacios[1].id}>
                        <img src="https://thumbs.dreamstime.com/b/house-vector-icon-home-logo-isolated-white-background-house-vector-icon-home-logo-vector-illustration-138343234.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <h3>{ espacios[1] && <FormattedMessage id={espacios[1].name}/> }</h3>
                            <p className="card-text">{espacios[1] && espacios[1].address}</p>
                        </div>      
                    </div>
                </div>
                <div className="col">
                    <div className="card card-block stretched-link text-decoration-none"  id={espacios[2] && espacios[2].id}>
                        <img src="https://thumbs.dreamstime.com/b/house-vector-icon-home-logo-isolated-white-background-house-vector-icon-home-logo-vector-illustration-138343234.jpg" className="card-img-top" alt="..."/>
                        <h3>{ espacios[2] && <FormattedMessage id={espacios[2].name}/> }</h3>
                        <div className="card-body">
                            <p className="card-text">{espacios[2] && espacios[2].address}</p>
                        </div>      
                    </div>
                </div>
                <div className="col">
                    <div className="card card-block stretched-link text-decoration-none"  id={espacios[3] && espacios[3].id}>
                        <img src="https://thumbs.dreamstime.com/b/house-vector-icon-home-logo-isolated-white-background-house-vector-icon-home-logo-vector-illustration-138343234.jpg" className="card-img-top" alt="..."/>
                        <h3>{espacios[3] && <FormattedMessage id={espacios[3].name}/> }</h3>
                        <div className="card-body">
                            <p className="card-text">{espacios[3] && espacios[3].address}</p>
                        </div>      
                    </div>
                </div>
            </div> 
            <div className="container" id="grafica">
                <Room roomsEspacio ={selectedEspacioRooms}></Room>
            </div>
        </div>
    )
}

export default Main;
