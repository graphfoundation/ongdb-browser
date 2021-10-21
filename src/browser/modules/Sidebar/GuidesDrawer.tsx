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

import React, { useRef } from 'react'
import { connect } from 'react-redux'

import {
  getGuide,
  startGuide,
  Guide,
  isDefaultGuide,
  gotoSlide
} from 'shared/modules/guides/guidesDuck'
import { GlobalState } from 'shared/globalState'
import GuideCarousel from '../GuideCarousel/GuideCarousel'
import { BackIcon } from '../../components/icons/Icons'
import {
  StyledGuidesDrawer,
  GuideTitle,
  BackIconContainer,
  StyledGuidesDrawerHeader,
  StyledDrawerSeparator
} from './styled'

type GuidesDrawerProps = {
  guide: Guide
  backToAllGuides: () => void
  gotoSlide: (slideIndex: number) => void
}

function GuidesDrawer({
  guide,
  backToAllGuides,
  gotoSlide
}: GuidesDrawerProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <StyledGuidesDrawer
      id="guide-drawer"
      data-testid="guideDrawer"
      ref={scrollRef}
    >
      <StyledGuidesDrawerHeader onClick={backToAllGuides}>
        {!isDefaultGuide(guide) && (
          <BackIconContainer data-testid="guidesBackButton">
            <BackIcon width={16} />
          </BackIconContainer>
        )}
        Neo4j Browser Guides{' '}
      </StyledGuidesDrawerHeader>
      <StyledDrawerSeparator />
      {!isDefaultGuide(guide) && (
        <GuideTitle title={guide.title}>{guide.title}</GuideTitle>
      )}
      <GuideCarousel
        slides={guide.slides}
        currentSlideIndex={guide.currentSlide}
        gotoSlide={gotoSlide}
        scrollToTop={() =>
          scrollRef.current?.scrollIntoView({ block: 'start' })
        }
      />
    </StyledGuidesDrawer>
  )
}

const mapStateToProps = (state: GlobalState) => ({ guide: getGuide(state) })
const mapDispatchToProps = (dispatch: any) => ({
  backToAllGuides: () => dispatch(startGuide()),
  gotoSlide: (slideIndex: number) => dispatch(gotoSlide(slideIndex))
})
const ConnectedGuidesDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GuidesDrawer)

export default ConnectedGuidesDrawer
