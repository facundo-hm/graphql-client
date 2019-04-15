import React from 'react'
import { Table } from 'reactstrap'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

type QueryFields = 'year' | 'toursEditions'

const GET_EDITIONS = gql`
  {
    editions(quantity: null) {
      year
      toursEditions {
        grandTour {
          name
        }
        winner {
          name
        }
      }
    }
  }
`

export const TourEditions = () => (
  <Query<EditionsData<QueryFields>> query={GET_EDITIONS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'

      if (error) return `Error! ${error.message}`

      return (
        <Table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Tour</th>
              <th>Rider</th>
            </tr>
          </thead>

          <tbody>
            {data!.editions
              .filter(edition => edition.year === 2015)
              .reduce(
                (prev, edition, eIndex) => {
                  const toursEditions = edition.toursEditions.map(
                    (tourEdition, tIndex) => (
                      <tr key={eIndex + tIndex}>
                        <th scope="row">{edition.year}</th>
                        <td>{tourEdition.grandTour.name}</td>
                        <td>{tourEdition.winner.name}</td>
                      </tr>
                    ),
                  )

                  return prev.concat(toursEditions)
                },
                [] as JSX.Element[],
              )}
          </tbody>
        </Table>
      )
    }}
  </Query>
)
