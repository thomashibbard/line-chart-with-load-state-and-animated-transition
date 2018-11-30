const faker = require('faker')
const moment = require('moment')

const format = 'DD-MMM-YY'

const generateMockData = howMany => {
  const staticOStart = moment(faker.date.recent(90))
  const staticDuration = faker.random.number({ min: 20, max: 150 })
  const ostart = moment(staticOStart)
  const result = []

  function makeDatum(staticOStart) {
    return new Array(staticDuration).fill().reduce((result, current, index) => {
      return result.concat({
        date: staticOStart.add(1, 'days').format(format),
        close: faker.random.number({
          min: 0,
          max: faker.random.number({ min: 900, max: 1500 })
        })
      })
    }, [])
  }

  for (i = 0; i < howMany; i++) {
    const datum = makeDatum(staticOStart.clone())
    console.log({
      length: datum.length,
      head: datum[0],
      tail: datum[datum.length - 1]
    })
    result.unshift(datum)
  }

  return result
}

module.exports = {
  generateMockData
}
