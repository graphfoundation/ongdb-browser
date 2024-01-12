/*
 * Copyright (c) "Neo4j"
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
import React, { Dispatch, useEffect } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import semver from 'semver'

import {
  CannyFeedbackIcon,
  CannyNotificationsIcon
} from 'browser-components/icons/LegacyIcons'

import DocumentItems from './DocumentItems'
import { formatDocVersion } from './docsUtils'
import {
  StyledFeedbackButton,
  StyledFullSizeDrawerBody,
  StyledHeaderContainer
} from './styled'
import { Drawer, DrawerHeader } from 'browser-components/drawer/drawer-styled'
import { CANNY_FEATURE_REQUEST_URL, cannyOptions } from 'browser-services/canny'
import { GlobalState } from 'shared/globalState'
import { getRawVersion } from 'shared/modules/dbMeta/dbMetaDuck'
import {
  TRACK_CANNY_CHANGELOG,
  TRACK_CANNY_FEATURE_REQUEST
} from 'shared/modules/sidebar/sidebarDuck'

export const shouldLinkToNewRefs = (v: string): boolean => {
  if (!semver.valid(v)) return true
  return semver.gte(v, '3.5.0-alpha01')
}

const getReferences = (version: string, v: string) => {
  const newRefs = [
    {
      name: 'ONgDB Browser Manual',
      url: 'https://docs.graphfoundation.org/browser-manual/current/'
    },
    {
      name: 'Geequel Introduction',
      url: ` https://docs.graphfoundation.org/geequel-manual/${v}/introduction/ `
    }
  ]
  const oldRefs = [
    {
      name: 'Developer Manual',
      url: `https://docs.graphfoundation.org/developer-manual/${v}/`
    },
    {
      name: 'Geequel Introduction',
      url: `https://docs.graphfoundation.org/developer-manual/${v}/cypher/`
    }
  ]

  const docs = [
    {
      name: 'Getting Started with ONgDB',
      url: 'https://docs.graphfoundation.org/getting-started/'
    },
    ...(shouldLinkToNewRefs(version) ? newRefs : oldRefs),
    {
      name: 'Geequel Refcard',
      url: `https://docs.graphfoundation.org/geequel-refcard/${v}/`
    }
  ]

  const graphAcademy = [
    {
      name: 'ONgDB Fundamentals',
      url: 'https://graphacademy.neo4j.com/courses/neo4j-fundamentals/'
    },
    {
      name: 'Cypher Fundamentals',
      url: 'https://graphacademy.neo4j.com/courses/cypher-fundamentals/'
    },
    {
      name: 'Graph Data Modeling Fundamentals',
      url: 'https://graphacademy.neo4j.com/courses/modeling-fundamentals/'
    },
    {
      name: 'Importing CSV Data',
      url: 'https://graphacademy.neo4j.com/courses/importing-cypher/'
    },
    {
      name: 'Full Course Catalog',
      url: 'https://graphacademy.neo4j.com/categories/'
    }
  ]

  const other = [
    {
      name: 'Operations Manual',
      url: `https://docs.graphfoundation.org/operations-manual/${v}/`
    },
    {
      name: 'Developer Site',
      url: 'https://www.neo4j.com/developer/'
    },
    {
      name: 'Knowledge Base',
      url: 'https://neo4j.com/developer/kb/'
    }
  ]
  return { docs, other, graphAcademy }
}
const useful = [
  { name: 'Help by topic', command: ':help' },
  { name: 'Cypher help', command: ':help cypher' },
  { name: 'Available commands', command: ':help commands' },
  { name: 'Keybindings', command: ':help keys' },
  { name: 'Command history', command: ':history' },
  { name: 'Show schema', command: 'CALL db.schema.visualization()' },
  { name: 'System info', command: ':sysinfo' }
]

type DocumentsProps = {
  version: string
  urlVersion: string
  trackCannyChangelog: () => void
  trackCannyFeatureRequest: () => void
}

const Documents = (props: DocumentsProps) => {
  useEffect(() => {
    window.Canny && window.Canny('initChangelog', cannyOptions)

    return () => {
      window.Canny && window.Canny('closeChangelog')
    }
  }, [])

  const { docs, other, graphAcademy } = getReferences(
    props.version,
    props.urlVersion
  )
  return (
    <Drawer id="db-documents">
      <StyledHeaderContainer>
        <DrawerHeader>Help &amp; Learn</DrawerHeader>
        {window.Canny && (
          <a
            data-canny-changelog
            data-testid="documentDrawerCanny"
            onClick={props.trackCannyChangelog}
          >
            <CannyNotificationsIcon />
          </a>
        )}
      </StyledHeaderContainer>
      <StyledFeedbackButton
        onClick={() => {
          props.trackCannyFeatureRequest()
          window.open(CANNY_FEATURE_REQUEST_URL, '_blank')
        }}
      >
        <CannyFeedbackIcon />
        &nbsp; Send Feedback
      </StyledFeedbackButton>
      <StyledFullSizeDrawerBody>
        <DocumentItems header="Useful commands" items={useful} />
        <DocumentItems header="Documentation links" items={docs} />
        <DocumentItems
          header="Free training from GraphAcademy"
          items={graphAcademy}
        />
        <DocumentItems header="Other Resources" items={other} />
      </StyledFullSizeDrawerBody>
    </Drawer>
  )
}

const mapStateToProps = (state: GlobalState) => {
  const version = getRawVersion(state) || 'current'
  return {
    version,
    urlVersion: formatDocVersion(version)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  trackCannyChangelog: () => {
    dispatch({ type: TRACK_CANNY_CHANGELOG })
  },
  trackCannyFeatureRequest: () => {
    dispatch({ type: TRACK_CANNY_FEATURE_REQUEST })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Documents)
