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
import React from 'react'
import { connect } from 'react-redux'
import semver from 'semver'
import { getVersion } from 'shared/modules/dbMeta/dbMetaDuck'
import DocumentItems from './DocumentItems'
import { Drawer, DrawerBody, DrawerHeader } from 'browser-components/drawer'

export const formatDocVersion = v => {
  if (!semver.valid(v)) {
    return 'current'
  }
  if (semver.prerelease(v)) {
    return `${semver.major(v)}.${semver.minor(v)}-preview`
  }
  return `${semver.major(v)}.${semver.minor(v)}` || 'current'
}
export const shouldLinkToNewRefs = v => {
  if (!semver.valid(v)) return false
  return semver.gte(v, '3.5.0-alpha01')
}

const intro = [
  { name: 'Getting started', command: ':play intro', type: 'play' },
  { name: 'Basic graph concepts', command: ':play concepts', type: 'play' },
  { name: 'Writing Geequel queries', command: ':play geequel', type: 'play' }
]
const help = [
  { name: 'Help', command: ':help help', type: 'help' },
  { name: 'Geequel syntax', command: ':help geequel', type: 'help' },
  { name: 'Available commands', command: ':help commands', type: 'help' },
  { name: 'Keyboard shortcuts', command: ':help keys', type: 'help' }
]

const getReferences = (version, v) => {
  const newRefs = [
    {
      name: 'Getting Started',
      command: `https://graphfoundation.org/docs/getting-started/${v}`,
      type: 'link'
    },
    {
      name: 'Geequel Introduction',
      command: ` https://graphfoundation.org/docs/geequel-manual/${v}/introduction/ `,
      type: 'link'
    }
  ]
  const oldRefs = [
    {
      name: 'Getting Started',
      command: `https://graphfoundation.org/docs/developer-manual/${v}/get-started/`,
      type: 'link'
    },
    {
      name: 'Developer Manual',
      command: `https://graphfoundation.org/docs/developer-manual/${v}/`,
      type: 'link'
    },
    {
      name: 'Geequel Introduction',
      command: `https://graphfoundation.org/docs/developer-manual/${v}/geequel/`,
      type: 'link'
    }
  ]
  const commonRefs = [
    {
      name: 'Operations Manual',
      command: `https://graphfoundation.org/docs/operations-manual/${v}/`,
      type: 'link'
    },
    // Drivers manual needs to wait for the page to be published
    // {
    //   name: 'Drivers Manual',
    //   command: `https://graphfoundation.org/docs/driver-manual/current/`,
    //   type: 'link'
    // },
    {
      name: 'Geequel Refcard',
      command: `https://graphfoundation.org/docs/geequel-refcard/${v}/`,
      type: 'link'
    },
    {
      name: 'GraphGists',
      command: 'https://graphfoundation.org/graphgists/',
      type: 'link'
    },
    {
      name: 'Developer Site',
      command: 'https://www.neo4j.com/developer/',
      type: 'link'
    },
    {
      name: 'Knowledge Base',
      command: 'https://graphfoundation.org/developer/kb/',
      type: 'link'
    },
    {
      name: 'ONgDB Browser Developer Pages',
      command: 'https://graphfoundation.org/developer/neo4j-browser/',
      type: 'link'
    }
  ]
  return [].concat(shouldLinkToNewRefs(version) ? newRefs : oldRefs, commonRefs)
}

const getStaticItems = (version, urlVersion) => {
  return {
    help,
    intro,
    reference: getReferences(version, urlVersion)
  }
}

const Documents = ({ version, urlVersion }) => {
  const items = getStaticItems(version, urlVersion)
  return (
    <Drawer id="db-documents">
      <DrawerHeader>Documents</DrawerHeader>
      <DrawerBody>
        <DocumentItems header="Introduction" items={items.intro} />
        <DocumentItems header="Help" items={items.help} />
      </DrawerBody>
    </Drawer>
  )
}

const mapStateToProps = state => {
  const version = getVersion(state)
  return {
    version,
    urlVersion: formatDocVersion(version)
  }
}

export default connect(mapStateToProps)(Documents)
