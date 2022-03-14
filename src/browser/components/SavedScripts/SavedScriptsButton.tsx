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
import React, { ReactEventHandler } from 'react'
import SVGInline from 'react-svg-inline'

import { StyledSavedScriptsButton } from './styled'
import { DownloadIcon, TrashIcon } from 'browser-components/icons/Icons'
import newFolderIcon from 'icons/folder-add.svg'
import hollow_run_icon from 'icons/hollow-run-icon.svg'

type OnClickProp = { onClick: ReactEventHandler }

const ExportButton = ({ onClick }: OnClickProp): JSX.Element => (
  <StyledSavedScriptsButton
    title="Export"
    data-testid={'savedScriptsButton-Export'}
    onClick={onClick}
  >
    <DownloadIcon />
  </StyledSavedScriptsButton>
)

const RunButton = ({ onClick }: OnClickProp): JSX.Element => (
  <StyledSavedScriptsButton
    title="Run"
    data-testid={'savedScriptsButton-Run'}
    onClick={onClick}
  >
    <SVGInline
      cleanup={['title']}
      svg={hollow_run_icon}
      accessibilityLabel={'Run'}
      width="20px"
      className="centeredSvgIcon"
    />
  </StyledSavedScriptsButton>
)
const NewFolderButton = ({ onClick }: OnClickProp): JSX.Element => (
  <StyledSavedScriptsButton
    title="New folder"
    data-testid={'savedScriptsButton-New folder'}
    onClick={onClick}
  >
    <SVGInline
      cleanup={['title']}
      svg={newFolderIcon}
      accessibilityLabel={'New folder'}
      width="15px"
      className="centeredSvgIcon"
    />
  </StyledSavedScriptsButton>
)

const RemoveButton = ({ onClick }: OnClickProp): JSX.Element =>
  DeleteButton({ onClick, title: 'Remove' })

const RedRemoveButton = ({ onClick }: OnClickProp): JSX.Element =>
  DeleteButton({ onClick, title: 'Remove', color: '#ff6769' })

type DeleteButtonProps = {
  onClick: ReactEventHandler
  title: string
  color?: string
}
function DeleteButton({
  onClick,
  title,
  color
}: DeleteButtonProps): JSX.Element {
  return (
    <StyledSavedScriptsButton
      title={title}
      data-testid={`savedScriptsButton-${title}`}
      onClick={onClick}
      color={color}
    >
      <TrashIcon fontSize={'14px'} />
    </StyledSavedScriptsButton>
  )
}

export {
  ExportButton,
  RunButton,
  NewFolderButton,
  RemoveButton,
  RedRemoveButton
}