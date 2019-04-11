import React from 'react'
import { Table } from 'reactstrap'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

type QueryFields =
  | 'id'
  | 'name'
  | 'date'
  | 'region'
  | 'firstEdition'
  | 'editions'
  | 'jerseyColor'

const GET_GRAND_TOURS = gql`
  {
    grandTours(quantity: null) {
      id
      name
      date
      region
      firstEdition
      editions
      jerseyColor
    }
  }
`

export const GrandTours = () => (
  <Query<GrandTourData<QueryFields>> query={GET_GRAND_TOURS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'

      if (error) return `Error! ${error.message}`

      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Region</th>
              <th>First Edition</th>
              <th>Editions</th>
              <th>Jersey Color</th>
            </tr>
          </thead>

          <tbody>
            {data!.grandTours.map((gt, index) => (
              <tr key={index}>
                <th scope="row">{gt.id}</th>
                <td>{gt.name}</td>
                <td>{gt.date}</td>
                <td>{gt.region}</td>
                <td>{gt.firstEdition}</td>
                <td>{gt.editions}</td>
                <td>{gt.jerseyColor}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }}
  </Query>
)
