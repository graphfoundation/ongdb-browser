import React, { Component } from 'react'
import { Resizable } from 'react-resizable'
import { Icon } from 'semantic-ui-react'
import { DetailsPaneComponent } from './DetailsPane'
import OverviewPane from './OverviewPane'
import { VizItem } from './types'
import {
  StyledNodeInspectorContainer,
  OverflowContainer,
  StyledNodeInspectorTopMenuChevron
} from './styled'

interface NodeInspectorPanelProps {
  hoveredItem: VizItem
  selectedItem: VizItem
  stats: any
  graphStyle: any
  onSelectedLabel: any
  onSelectedRelType: any
  selectedLabel: any
  frameHeight: number
  hasTruncatedFields: boolean
}

export type NodeInspectorPanelState = {
  expanded: boolean
  width: number
}
export class NodeInspectorPanel extends Component<
  NodeInspectorPanelProps,
  NodeInspectorPanelState
> {
  state: NodeInspectorPanelState = {
    expanded: true,
    width: 300
  }

  togglePanel = (): void => {
    this.setState(oldState => ({
      expanded: !oldState.expanded
    }))
  }

  render(): JSX.Element {
    const { expanded } = this.state
    const { hoveredItem, selectedItem } = this.props

    const relevantItems = ['node', 'relationship']
    const hoveringNodeOrRelationship =
      hoveredItem && relevantItems.includes(hoveredItem.type)
    const shownEl = hoveringNodeOrRelationship ? hoveredItem : selectedItem

    return (
      <>
        <StyledNodeInspectorTopMenuChevron
          expanded={expanded}
          onClick={this.togglePanel}
        >
          {expanded ? (
            <Icon name="chevron right" fontSize={32} />
          ) : (
            <Icon
              title="Click to expand the Node Properties display"
              name="chevron left"
            />
          )}
        </StyledNodeInspectorTopMenuChevron>

        {expanded && (
          <StyledNodeInspectorContainer
            width={this.state.width}
            height={this.props.frameHeight}
          >
            <Resizable
              width={this.state.width}
              height={300 /*doesn't matter but required prop */}
              resizeHandles={['w']}
              onResize={(_e, { size }) => this.setState({ width: size.width })}
            >
              {/* React-resizeable requires it's first child to not have a height set, 
                  therefore we need this wrapping div */}
              <div>
                <OverflowContainer height={this.props.frameHeight}>
                  {shownEl.type === 'node' ||
                  shownEl.type === 'relationship' ? (
                    <DetailsPaneComponent
                      vizItem={shownEl}
                      graphStyle={this.props.graphStyle}
                      frameHeight={this.props.frameHeight}
                    />
                  ) : (
                    <OverviewPane
                      frameHeight={this.props.frameHeight}
                      graphStyle={this.props.graphStyle}
                      hasTruncatedFields={this.props.hasTruncatedFields}
                      onSelectedLabel={this.props.onSelectedLabel}
                      onSelectedRelType={this.props.onSelectedRelType}
                      selectedLabel={this.props.selectedLabel}
                      stats={this.props.stats}
                      nodeCount={
                        shownEl.type === 'canvas'
                          ? shownEl.item.nodeCount
                          : null
                      }
                      relationshipCount={
                        shownEl.type === 'canvas'
                          ? shownEl.item.relationshipCount
                          : null
                      }
                    />
                  )}
                </OverflowContainer>
              </div>
            </Resizable>
          </StyledNodeInspectorContainer>
        )}
      </>
    )
  }
}
