import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Device from "./device";
var d3 = require("d3");
const Room = (props) => {

    console.log('props:',props.roomsEspacio)
    let [selectedRoom,setRoom] = useState({})
    let [roomsSpace, setRooms] =useState(props.roomsEspacio)


    function handleRoom(event){
        console.log(event.target)

        for (let i=0;i<props.roomsEspacio.length;i++){
            if(event.target.id===props.roomsEspacio[i].name){
                setRoom(props.roomsEspacio[i])
            }
        }
    
    }


    //GRAFICA
    //Dimensiones
    let width =450
    let height =500
    let margin = 40

    //Radio
    let radio = Math.min(width,height)/2 -margin

    
    //transforma datos a version llave-valor
    function trans(data){
        let l =[]

        for(let i =0; i<data.length;i++){
            let o ={"name":"","value":0}
            o.name=data[i].name
            o.value=data[i].powerUsage.value
            l.push(o)
        }
        return l
    }

    function crearGrafico(datos){
        console.log('len',datos.length)
        if(datos.length > 0){
            let svg = d3.select("#grafica")
        .append("svg")
            .attr("width",width)
            .attr("height",height)
        .append("g")
            .attr("transform","translate("+width/2 + "," + height/2 + ")")
        
        //tooltip para info sobre cuarto y power usage
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 1)
            .attr("position","absolute")
            .attr("size","large")
           

        //escala colores
        let color = d3.scaleOrdinal()
            .domain(datos)
            .range(d3.schemeSet2)

        //
        let torta = d3.pie().value(function(d) {return d.value }) 

        let datos_full = torta(datos)  
        console.log(datos_full)

        let arcGen = d3.arc()
            .innerRadius(0)
            .outerRadius(radio)
        
        svg
            .selectAll('slices')
            .data(datos_full)
            .enter()
            .append('path')
                .attr('d',arcGen)
                .attr('fill',function(d){return(color(d.data.value))})
                .attr("stroke","black")
                .on("mouseover", function (event,d){ d3.select(this)
                    .transition()
                    .duration('50')
                    .attr('opacity', '.50');

                    div.transition()
                        .duration(50)
                        .style("opacity",1);

                    console.log(d)
                    div.html([d.data.name,d.value+"Kw"])
                        .style("left", d3.pointer(event,this.parentElement.parentElement.parentElement.parentElement.parentElement)[0]+"px")
                        .style("top", d3.pointer(event,this.parentElement.parentElement.parentElement.parentElement.parentElement)[1]+"px")
                        //d3.pointer(event)[0]
                })
                .on("mouseout", function (d) {d3.select(this)
                    .transition()
                    .duration('50')
                    .attr('opacity', '1');

                    div.transition()
                    .duration(50)
                    .style("opacity",0);
                })
               
        
            svg
                .selectAll('mySlices')
                .data(datos_full)
                .enter()
                .append('text')
                .attr("transform", function(d) { return "translate(" + arcGen.centroid(d) + ")";  })
                .style("text-anchor", "middle")
                .style("font-size", 17)
   
                      

        
        }
        else{
            return
        }
        
    }


    useEffect(()=>{
        d3.select("svg").remove();
        crearGrafico(trans(props.roomsEspacio)) 
    })
   

       



    
    return (
        <div className="row">
            <h2><FormattedMessage id='My Rooms'/></h2>
            {props.roomsEspacio.map((e, i) => (
                <div className="col-sm-3" key={i} onClick={handleRoom} >
                    <div className="card card-block stretched-link text-decoration-none" styles="width: 10px;" id={props.roomsEspacio[i].name}>
                        <h3><FormattedMessage id={props.roomsEspacio[i].name}/></h3>
                        <img src="https://i.pinimg.com/originals/7c/2a/6f/7c2a6f8c7fa2f3f6ce6d82287a392573.jpg" className="card-img-top" alt="..."/>
                    </div>
                </div>
            ))}
        <Device roomSel ={selectedRoom}/>
         
        </div>
        

    );
  };
  
  export default Room;