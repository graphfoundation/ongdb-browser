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

import { Component } from 'react'
import { connect } from 'react-redux'
import { canUseDOM } from 'services/utils'
import { updateData } from 'shared/modules/udc/udcDuck'

export class Intercom extends Component<any> {
  componentDidMount() {
    const {
      appID,
      updateData,
      children, // eslint-disable-line
      ...otherProps
    } = this.props

    // Disabling for privacy concerns.  ONgDB does not want to sent out any information like neo4j does.
    if (true) {
      return
    }
    // Enbd disabling UDC / Intercom.
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return null
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateData: (data: any) => dispatch(updateData(data))
  }
}
export default connect<any, any, any, any>(null, mapDispatchToProps)(Intercom)
