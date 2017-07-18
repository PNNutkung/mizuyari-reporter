import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { dbRef } from '../../config/firebase'

export default class WateringLogsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: {}
    }
    this.getWateringLogs = this.getWateringLogs.bind(this)
  }

  componentWillMount () {
    this.getWateringLogs()
  }

  getWateringLogs () {
    dbRef.child('checkins')
    .orderByChild('date')
    .limitToLast(10)
    .on('value', snapshot => {
      snapshot.val() == null
      ? this.setState({
        logs: { default: { date: 'No record.', name: 'No record.', period: 'No record'} }
      })
      : this.setState({
        logs: snapshot.val()
      })
    })
  }

  render () {
    let showingLogs = []
    Object.entries(this.state.logs).forEach(([key, value]) => {
        showingLogs.push(
          <tr key={value.date}>
            <td>{
              typeof(value.date) !== 'number'
              ? value.date
              : (new Date(value.date)).toDateString()
            }</td>
            <td>
              {value.period}
            </td>
            <td>{value.name}</td>
          </tr>
        )
      })
    return (
      <div id='watering-logs-page'>
        <Table responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Period</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            { 
              showingLogs.length > 0
              ? showingLogs
              : (<tr>
                  <th>Loading...</th>
                  <th>Loading...</th>
                </tr>) 
            }
          </tbody>
        </Table>
      </div>
    )
  }
}
