import * as d3 from 'd3'
import './chart-styles.css'
var loadingCurtain
var line
var svg
var plotLine
var xScale, yScale
var xAxis, yAxis
var parseTime = d3.timeParse('%d-%b-%y')
var displayDateFormat = '%d-%b-20%y'
var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 50
}
var width = 800 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom
function transormData(datum) {
  return {
    date: parseTime(datum.date),
    close: parseInt(datum.close, 10)
  }
}

export default function init(data) {
  // debugger
  data = data[0].map(transormData)

  xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(
      d3.extent(data, function(d) {
        return d.date
      })
    )
    .nice()

  yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain(
      d3.extent(data, function(d) {
        return d.close
      })
    )
    .nice()

  xAxis = d3.axisBottom(xScale).ticks(12)
  yAxis = d3.axisLeft(yScale).ticks(12 * height / width)

  plotLine = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x(function(d) {
      return xScale(d.date)
    })
    .y(function(d) {
      return yScale(d.close)
    })

  svg = d3
    .select('#plot')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  svg
    .append('g')
    .attr('class', 'x axis ')
    .attr('id', 'axis--x')
    .attr(
      'transform',
      'translate(' + margin.left + ',' + (height + margin.top) + ')'
    )
    .call(xAxis.tickFormat(d3.timeFormat(displayDateFormat)))

  svg
    .append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'axis--y')
    .call(yAxis)

  line = svg
    .append('g')
    .append('path')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('class', 'line')
    .datum(data)
    .attr('d', plotLine)
    .style('fill', 'none')
    .style('stroke', 'brown')

  loadingCurtain = svg
    .append('rect')
    .attr('class', 'loading-curtain')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // d3
  //   .select('#plot')
  //   .append('div')
  //   .attr('class', 'loading-curtain')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .attr('style', `height: ${height}px; width: ${width}px`)
  //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
}

function update(newData) {
  newData = newData[0].map(transormData)
  xScale
    .domain(
      d3.extent(newData, function(d) {
        return d.date
      })
    )
    .nice()
  yScale
    .domain(
      d3.extent(newData, function(d) {
        return d.close
      })
    )
    .nice()

  xAxis = d3.axisBottom(xScale)
  yAxis = d3.axisLeft(yScale)
  /*  const eases = [
    'easeElastic',
    'easeBounce',
    'easeLinear',
    'easeSin',
    'easeQuad',
    'easeCubic',
    'easePoly',
    'easeCircle',
    'easeExp',
    'easeBack'
  ]*/

  svg
    .select('.x')
    .transition()
    .duration(750)

    // .ease(easement)
    .call(xAxis.tickFormat(d3.timeFormat(displayDateFormat)))
  svg
    .select('.y')
    .transition()
    .duration(750)

    // .ease(easement)
    .call(yAxis)
  // loadingCurtain.classed('active', true)

  // .style('stroke', color)
  line.datum(newData).attr('d', plotLine)

  var totalLength = line.node().getTotalLength()

  line
    .attr('stroke-dasharray', totalLength + ' ' + totalLength)
    .attr('stroke-dashoffset', totalLength)
    .transition()
    .duration(1000)
    .ease(d3.easeSin)
    .attr('stroke-dashoffset', 0)
}

function dataFetchBegin() {
  d3.select('.loading-curtain').classed('active', true)
}

function dataFetchEnd() {
  d3.select('.loading-curtain').classed('active', false)
}

export { update, dataFetchBegin, dataFetchEnd }
