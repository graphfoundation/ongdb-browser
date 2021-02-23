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
import React from 'react'
import { connect } from 'react-redux'
import { version } from 'project-root/package.json'
import Render from 'browser-components/Render'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerSubHeader,
  DrawerSection,
  DrawerSectionBody,
  DrawerFooter
} from 'browser-components/drawer'
import { getVersion, getEdition } from 'shared/modules/dbMeta/dbMetaDuck'

const About = ({ serverVersion, serverEdition }) => (
  <Drawer id="db-about">
    <DrawerHeader>About ONgDB</DrawerHeader>
    <DrawerBody>
      <DrawerSection>
        <DrawerSubHeader>
          Made by{' '}
          <a target="_blank" href="https://graphfoundation.org/">
            Graph Foundation, Inc.
          </a>
        </DrawerSubHeader>
      </DrawerSection>
      <DrawerSection>
        <DrawerSectionBody>
          Copyright &#169; 2018-2020 Graph Foundation, Inc.
        </DrawerSectionBody>
        <DrawerSectionBody>
          Copyright &#169; 2002-2020 Neo4j Sweden AB
        </DrawerSectionBody>
      </DrawerSection>
      <DrawerSection>
        <DrawerSubHeader>You are running</DrawerSubHeader>
        <DrawerSectionBody>
          <p>
            ONgDB Browser version:{' '}
            <a
              href={`https://github.com/graphfoundation/ongdb-browser/releases/tag/${version}`}
              target="_blank"
            >
              {version}
            </a>
          </p>
          <Render if={serverVersion && serverEdition}>
            <p>
              ONgDB Server version:{' '}
              <a target="_blank" href={asChangeLogUrl(serverVersion)}>
                {serverVersion}
              </a>{' '}
              ({serverEdition})
            </p>
          </Render>
          <p>
            <a
              href="https://github.com/graphfoundation/ongdb-browser/wiki/changelog"
              target="_blank"
            >
              ONgDB Browser Changelog
            </a>
          </p>
        </DrawerSectionBody>
      </DrawerSection>
      <DrawerSection>
        <DrawerSubHeader>License</DrawerSubHeader>
        <DrawerSectionBody>
          <a target="_blank" href="http://www.gnu.org/licenses/gpl.html">
            GPLv3
          </a>{' '}
          or{' '}
          <a target="_blank" href="http://www.gnu.org/licenses/agpl-3.0.html">
            AGPL
          </a>{' '}
        </DrawerSectionBody>
      </DrawerSection>
      <DrawerSection>
        <DrawerSubHeader>Participate</DrawerSubHeader>
        <DrawerSectionBody>
          Ask questions at{' '}
          <a
            target="_blank"
            href="http://stackoverflow.com/questions/tagged/ongdb"
          >
            Stack Overflow
          </a>
          <br />
          Contribute code to{' '}
          <a target="_blank" href="http://github.com/graphfoundation">
            Graph Foundation
          </a>{' '}
          or{' '}
          <a
            target="_blank"
            href="http://github.com/graphfoundation/ongdb-browser"
          >
            ONgDB Browser
          </a>
          <br />
        </DrawerSectionBody>
      </DrawerSection>
      <DrawerSection>
        <DrawerSubHeader>Thanks</DrawerSubHeader>
        <DrawerSectionBody>
          ONgDB wouldn't be possible without a fantastic community. Thanks for
          all the feedback, discussions and contributions.
        </DrawerSectionBody>
      </DrawerSection>
    </DrawerBody>
    <DrawerFooter>Made with &#9829; worldwide.</DrawerFooter>
  </Drawer>
)

const asChangeLogUrl = serverVersion => {
  if (!serverVersion) {
    return undefined
  }
  const tokenisedServerVersion = serverVersion && serverVersion.split('.')
  const releaseTag = tokenisedServerVersion.join('')
  const urlServerVersion =
    serverVersion && tokenisedServerVersion.splice(0, 2).join('.')
  return `https://github.com/graphfoundation/ongdb/wiki/ONgDB-${urlServerVersion}-changelog#${releaseTag}`
}

const mapStateToProps = state => {
  return {
    serverVersion: getVersion(state),
    serverEdition: getEdition(state)
  }
}

export default connect(mapStateToProps)(About)
