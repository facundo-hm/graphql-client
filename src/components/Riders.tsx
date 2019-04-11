import React from 'react'
import { Table } from 'reactstrap'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

type QueryFields = 'id' | 'name' | 'country' | 'status'

const GET_GRAND_TOURS = gql`
  {
    riders(quantity: null) {
      id
      name
      country
      status
    }
  }
`

export const Riders = () => (
  <Query<RidersData<QueryFields>> query={GET_GRAND_TOURS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'

      if (error) return `Error! ${error.message}`

      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data!.riders.map((gt, index) => (
              <tr key={index}>
                <th scope="row">{gt.id}</th>
                <td>{gt.name}</td>
                <td>{gt.country}</td>
                <td>{gt.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }}
  </Query>
)
