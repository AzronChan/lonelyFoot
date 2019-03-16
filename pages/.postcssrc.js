// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    'autoprefixer': {
	    browsers: ['Android >= 4.0', 'iOS >= 7']
	  },
	  //750 屏中， rootValue = 100时, 12px = 0.12rem，由于vant默认设计就是12px，想在750中表现大一点，故设计为37.5,750屏中12px为0.32rem
	  'postcss-pxtorem': {
	    rootValue: 50,
	    propList: ['*']
	  }
  }
}
