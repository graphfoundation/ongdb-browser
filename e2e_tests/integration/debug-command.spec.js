/*
 * Copyright (c) 2018-2020 "Graph Foundation"
 * Graph Foundation, Inc. [https://graphfoundation.org]
 *
 * This file is part of ONgDB.
 *
 * ONgDB is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/*
 * Copyright (c) 2002-2020 "Neo4j,"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global Cypress, cy, test, expect, before */

describe(':debug command', () => {
  before(function() {
    cy.visit(Cypress.config('url'))
      .title()
      .should('include', 'ONgDB Browser')
    cy.wait(3000)
  })
  it('can `:debug` command when not connected', () => {
    cy.executeCommand(':clear')
    const query = ':debug'
    cy.executeCommand(query)

    let frame = cy.getFrames()

    frame
      .should('have.length', 1)
      .should('contain', 'serverConfig')
      .should('contain', '"proceduresReadable": false')
      .should('contain', '"serverConfigReadable": false')
      .should('contain', '"browser.allow_outgoing_connections": false')
  })
  // Now connect
  it('can connect', () => {
    const password = Cypress.config('password')
    cy.connect('neo4j', password)
  })

  it('can `:debug` command when connected', () => {
    cy.executeCommand(':clear')
    const query = ':debug'
    cy.executeCommand(query)

    let frame = cy.getFrames()

    frame
      .should('have.length', 1)
      .should('contain', 'serverConfig')
      .should('contain', '"proceduresReadable": true')
      .should('contain', '"serverConfigReadable": true')
      .should('contain', '"dbms.security.auth_enabled": true')
  })
})
