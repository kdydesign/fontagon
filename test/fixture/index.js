/**
 * untitle
 *
 * @since: 2020-04-14
 * @author: kdydesign.kim
 */
const webfontsGenerator = require('../../lib/index.js')

webfontsGenerator({
  files: [
    'test/svg/svg-1.svg',
    'test/svg/alarm_on-black-18dp.svg'
  ]
}, (error) => {
  if (error) {
    console.log('Fail!', error)
  } else {
    console.log('Done!')
  }
})
