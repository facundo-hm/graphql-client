import React, { useState } from 'react'
import { Table, Input, FormGroup, Label, Col } from 'reactstrap'
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

export const TourEditions = () => {
  const [year, setYear] = useState(2015)

  const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(e.target.value))
  }

  return (
    <Query<EditionsData<QueryFields>> query={GET_EDITIONS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'

        if (error) return `Error! ${error.message}`

        const { editions } = data!

        return (
          <div>
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>
                Select Year
              </Label>

              <Col sm={5}>
                <Input type="select" onChange={changeYear}>
                  {editions.map((edition, i) => (
                    <option key={i}>{edition.year}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>

            <Table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Tour</th>
                  <th>Rider</th>
                </tr>
              </thead>

              <tbody>
                {editions
                  .filter(edition => edition.year === year)
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
          </div>
        )
      }}
    </Query>
  )
}
