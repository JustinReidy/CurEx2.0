import { Component } from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryZoomContainer } from "victory";

class HistoricalGraph extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    let data = formatHistoricData(this.props.data)
    return (
      <div>
        <VictoryChart height={'200'} width={'300'} scale={{x: "time"}} containerComponent={<VictoryZoomContainer />}>
          <VictoryAxis style={{tickLabels: {fontSize: 2}}}/>
          <VictoryAxis dependentAxis style={{tickLabels: {fontSize: 5}}} tickFormat={tick => `$${tick}`}/>
          <VictoryLine interpolation="natural" data={[...data]}/>
        
        </VictoryChart>     
      </div>
    )
  }
}

export default HistoricalGraph


const formatHistoricData = propsData => {

  let data = propsData
  let formattedData = []
  for (const key in data) {
    // let formatted = new HistoricDatapoint(key, Object.values(data[key])[0])    
    let formatted = {x: key, y: Object.values(data[key])[0]}
    formattedData.push(formatted)
  }

  return formattedData
}