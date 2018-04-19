import React, { Component } from 'react';
import './App.css';
import {Scatter} from 'react-chartjs-2'

class App extends Component {
  constructor(){
    super();
    this.state={data:[],options:[],dopingInfo:""};
  }

  componentDidMount(){
    let url= 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
      let backgroundColor=res.map(each=>each.Doping===""?"#66b032":'red')
      let dataLabel=res.map(each=>each.Name+" ("+each.Nationality+")");
      let dopingInfo=res.map(each=>each.Doping===""?"Clean Record":each.Doping)
      let dataArray=res.map(each=>{
        let spot={x:'',y:''};
        spot.x=each.Seconds;
        spot.y=each.Place;
        return spot
      });
      let data={
        labels:dataLabel,
        datasets:[{
          data:dataArray,
          pointBackgroundColor:backgroundColor,
        }]
      };
      
      let options = {
        tooltips:{
          callbacks:{
            title:function(tooltipItems,data){
              return data.labels[tooltipItems[0].index]
            },
            label:function(item,data){console.log(data)
              return "Doping info: "+dopingInfo[item.index]+", Ranking: "+data.datasets[0].data[item.index].y
            }
          }
        },
        legend:{
          display:false,
        },
        title:{
          display:true,
          fontColor:'#340D09',
          text:"Doping in Professional Bicycle Racing"
        },
        scales:{
          xAxes:[{
            gridLines:{
              drawOnChartArea: false,
              color:'#A70F01'
            },
            scaleLabel:{
                display:true,
                labelString:"Peformance (seconds)",
                fontColor:'#340D09',
            },
            ticks:{
              fontColor:'#A70F01'
            }
          }],
          yAxes:
          [
            {
              scaleLabel:{
                display:true,
                labelString:"Ranking",
                fontColor:"#340D09"
              },
              ticks:{
                fontColor:'#A70F01'
              },
              gridLines:{
                drawOnChartArea: false,
                color:'#A70F01'
              }
            }
          ]
        }
      };
      
      this.setState({data,options})
    })
  }
  render() {
    return (
      <div className="App" style={{backgroundColor:"#FCEFEE",margin:"40px auto",width:'60%'}}>
        <Scatter data={this.state.data} options={this.state.options}/>
        <p>
          Sources:
          <br/>https://en.wikipedia.org/wiki/Alpe_d%27Huez
          <br/>http://www.fillarifoorumi.fi/forum/showthread.php?38129-Ammattilaispy%F6r%E4ilij%F6iden-nousutietoja-%28aika-km-h-VAM-W-W-kg-etc-%29&p=2041608#post2041608
          <br/>https://alex-cycle.blogspot.com/2015/07/alpe-dhuez-tdf-fastest-ascent-times.html
          <br/>http://www.dopeology.org/ 
        </p>
      </div>
    );
  }
}

export default App;
