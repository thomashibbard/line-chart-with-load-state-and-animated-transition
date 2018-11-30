import React from 'react'
import { isEqual, isNull } from 'lodash'
import classNames from 'classnames'

import { BeatLoader } from 'react-spinners'

import chartInit, { update as chartUpdate } from './shared-chart-fn'

class LineChart extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      return
    }

    if (isNull(this.props.data) && !isNull(nextProps.data)) {
      chartInit(nextProps.data)
    } else {
      chartUpdate(nextProps.data)
    }
  }
  render() {
    return (
      <div>
        <div id="plot" className={classNames({ loading: this.props.loading })}>
          <BeatLoader
            className="loader"
            sizeUnit={'px'}
            size={15}
            color={'black'}
            loading={this.props.loading}
          />
        </div>
      </div>
    )
  }
}

export default LineChart
