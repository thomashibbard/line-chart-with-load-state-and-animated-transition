import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import LineChart from './LineChart'

// First way to import

// Another way to import
// import ClipLoader from 'react-spinners/ClipLoader';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null
    }
  }
  componentDidMount() {
    this.getNewData()
  }

  getNewData = () => {
    this.setState({ loading: true }, () => console.log(this.state))
    axios
      .get('http://localhost:8890/api/data/3')
      .then(({ data }) => {
        this.setState({
          data: data.data,
          loading: false
        })
      })
      .catch(error => {
        console.error('axios error', error)
        this.setState({ data: null, loading: false })
      })
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.getNewData}>update data</button>
        <LineChart data={this.state.data} loading={this.state.loading} />
      </React.Fragment>
    )
  }
}

render(<App />, document.getElementById('root'))
