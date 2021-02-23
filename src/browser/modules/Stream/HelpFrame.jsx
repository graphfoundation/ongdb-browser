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
import React, { useEffect, useState } from 'react'
import Docs from '../Docs/Docs'
import docs from '../../documentation'
import Directives from 'browser-components/Directives'
import FrameTemplate from '../Frame/FrameTemplate'
import FrameAside from '../Frame/FrameAside'
import { transformCommandToHelpTopic } from 'services/commandUtils'
import { DynamicTopics } from '../../documentation/templates/DynamicTopics'
import { CarouselButton } from 'browser-components/buttons/index'
import {
  StackNextIcon,
  StackPreviousIcon
} from 'browser-components/icons/Icons'

const HelpFrame = ({ frame, stack = [] }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const currentFrame = stack[currentFrameIndex]

  // When we get a new frame, go to it
  useEffect(() => {
    setCurrentFrameIndex(0)
  }, [stack.length])

  const { aside, main } = generateContent(currentFrame)

  const prevBtn =
    currentFrameIndex === stack.length - 1 ? null : (
      <CarouselButton
        className="previous-slide rounded"
        data-testid="prev-in-stack-button"
        onClick={() => setCurrentFrameIndex(currentFrameIndex + 1)}
      >
        <StackPreviousIcon />
      </CarouselButton>
    )

  const nextBtn =
    currentFrameIndex === 0 ? null : (
      <CarouselButton
        className="next-slide rounded"
        data-testid="next-in-stack-button"
        onClick={() => setCurrentFrameIndex(currentFrameIndex - 1)}
      >
        <StackNextIcon />
      </CarouselButton>
    )

  const contents =
    stack.length > 1 ? (
      <React.Fragment>
        {prevBtn}
        {main}
        {nextBtn}
      </React.Fragment>
    ) : (
      main
    )
  return (
    <FrameTemplate
      className="helpFrame has-stack"
      header={currentFrame}
      aside={aside}
      contents={contents}
    />
  )
}

function generateContent(frame) {
  const { help, cypher, bolt } = docs
  const chapters = {
    ...help.chapters,
    ...cypher.chapters,
    ...bolt.chapters
  }

  let main = 'Help topic not specified'
  let aside

  if (frame.result) {
    main = <Docs withDirectives originFrameId={frame.id} html={frame.result} />
  } else {
    const helpTopic = transformCommandToHelpTopic(frame.cmd)
    if (helpTopic !== '') {
      const chapter = chapters[helpTopic] || chapters.unfound
      const { title, subtitle } = chapter
      let { content } = chapter

      // The commands topic is a special case that uses dynamic data
      const dynamic = [
        'bolt',
        'commands',
        'play',
        'guides',
        'help',
        'cypher',
        'geequel'
      ]
      if (dynamic.includes(helpTopic)) {
        content = <DynamicTopics docs={docs} {...chapter} />
      }

      aside = title ? <FrameAside title={title} subtitle={subtitle} /> : null
      main = <Docs withDirectives originFrameId={frame.id} content={content} />
    }
  }
  return { aside, main }
}

export default HelpFrame
