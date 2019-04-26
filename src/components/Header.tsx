import React, { useState } from 'react'
import { Input, Popover, PopoverBody, Table } from 'reactstrap'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

type QueryFields = 'id' | 'name' | '__typename'

const GET_ENTITIES_BY_NAME = gql`
  query SearchByName($value: String!) {
    searchByName(text: $value) {
      ...GrandTourResults
      ...RiderResults
    }
  }

  fragment GrandTourResults on GrandTour {
    id
    name
  }

  fragment RiderResults on Rider {
    id
    name
  }
`

interface Props {
  value: string
  isResultsOpen: boolean
}

const SearchResults = ({ value, isResultsOpen }: Props) => {
  if (!value) return null

  return (
    <Query<EntitiesData<QueryFields>>
      query={GET_ENTITIES_BY_NAME}
      variables={{ value }}
    >
      {({ loading, error, data }) => {
        const { searchByName } = data!

        if (!searchByName || !searchByName.length) {
          return null
        }

        return (
          <Popover
            placement="bottom"
            isOpen={isResultsOpen}
            target="search"
            container="search-container"
            hideArrow
          >
            <PopoverBody>
              <Table borderless>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Entity</th>
                  </tr>
                </thead>

                <tbody>
                  {searchByName &&
                    searchByName.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.__typename}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </PopoverBody>
          </Popover>
        )
      }}
    </Query>
  )
}

export const Header = () => {
  const [isResultsOpen, toggleResults] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setSearchValue(value)

    if (value && !isResultsOpen) {
      toggleResults(!isResultsOpen)
    }
  }

  const clouseResults = () => {
    toggleResults(false)
  }

  return (
    <header className="App-header">
      <p>GraphQL Client</p>

      <div
        id="search-container"
        className="search-container"
        onBlur={clouseResults}
      >
        <Input id="search" onChange={handleInput} />

        <SearchResults value={searchValue} isResultsOpen={isResultsOpen} />
      </div>
    </header>
  )
}
