import React, { useState } from 'react'
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

type QueryFields = 'id' | 'name' | 'country' | 'status'

const GET_RIDERS = gql`
  {
    riders(quantity: null) {
      id
      name
      country
      status
    }
  }
`

const UPDATE_RIDER = gql`
  mutation UpdateRider(
    $id: ID!
    $name: String
    $country: String
    $status: RiderStatusEnum
  ) {
    updateRider(id: $id, name: $name, country: $country, status: $status) {
      id
      name
      country
      status
    }
  }
`

export const Riders = () => {
  const [modalOpen, toggleModal] = useState(false)
  const [rider, setRider] = useState<Rider>({
    id: '',
    name: '',
    country: '',
    status: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedRider = { ...rider, [e.target.name]: e.target.value }

    setRider(updatedRider)
  }

  const handleRider = (gt: Rider) => {
    setRider(gt)
    handleModal()
  }

  const handleModal = () => {
    toggleModal(!modalOpen)
  }

  return (
    <Query<RidersData<QueryFields>> query={GET_RIDERS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'

        if (error) return `Error! ${error.message}`

        return (
          <div>
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
                  <tr key={index} onClick={() => handleRider(gt)}>
                    <th scope="row">{gt.id}</th>
                    <td>{gt.name}</td>
                    <td>{gt.country}</td>
                    <td>{gt.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Modal isOpen={modalOpen} toggle={handleModal}>
              <ModalHeader toggle={handleModal}>Rider</ModalHeader>

              <ModalBody>
                <Form>
                  <Input
                    type="hidden"
                    name="riderId"
                    id="riderId"
                    defaultValue={rider.id}
                  />

                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={rider.name}
                      placeholder="Name"
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="country">Country</Label>
                    <Input
                      type="text"
                      name="country"
                      id="country"
                      defaultValue={rider.country}
                      placeholder="Country"
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="status">Status</Label>

                    <Input
                      type="select"
                      name="status"
                      id="status"
                      defaultValue={rider.status}
                      onChange={handleInputChange}
                    >
                      <option>ACTIVE</option>
                      <option>RETIRED</option>
                    </Input>
                  </FormGroup>
                </Form>
              </ModalBody>

              <Mutation<RidersData<QueryFields>> mutation={UPDATE_RIDER}>
                {updateRider => (
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        updateRider({
                          variables: {
                            id: rider.id,
                            name: rider.name,
                            country: rider.country,
                            status: rider.status,
                          },
                        })

                        handleModal()
                      }}
                    >
                      Save
                    </Button>{' '}
                    <Button color="secondary" onClick={handleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                )}
              </Mutation>
            </Modal>
          </div>
        )
      }}
    </Query>
  )
}
