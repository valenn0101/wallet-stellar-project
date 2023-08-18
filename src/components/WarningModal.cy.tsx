import React from 'react'
import WarningModal from './WarningModal'

describe('<WarningModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WarningModal />)
  })
})