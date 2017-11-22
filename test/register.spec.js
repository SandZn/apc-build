
const register = require('../')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
chai.use(require('sinon-chai'))
const gulp = require('gulp')

describe('Register gulp tasks', () => {
  beforeEach(() => {
    gulp.reset()
  })

  it('Throw if no gulp instance passed', () => {
    try {
      register(null, {})
      expect(0).to.equal(1)
    } catch (e) {
      expect(e.message).to.equal('Gulp instance not passed')
    }
  })

  it('Throw if invalid gulp instance passed', () => {
    try {
      register({}, {})
      expect(0).to.equal(1)
    } catch (e) {
      expect(e.message).to.equal('Gulp instance not passed')
    }
  })

  it('Throw if no config passed', () => {
    try {
      register(gulp)
      expect(0).to.equal(1)
    } catch (e) {
      expect(e.message).to.equal('Config object not passed')
    }
  })

  it('Throw if invalid config passed', () => {
    try {
      register(gulp, 'config')
      expect(0).to.equal(1)
    } catch (e) {
      expect(e.message).to.equal('Config object not passed')
    }
  })

  it('Empty config does not register any tasks', () => {
    register(gulp, {})
    expect(Object.keys(gulp.tasks).length).to.equal(0)
  })

  it('Register lint-sass task', () => {
    register(gulp, {
      scssSrc: 'test/input/**/*.scss'
    })
    expect(Object.keys(gulp.tasks).length).to.equal(1)
    expect(gulp.tasks['lint-sass']).to.be.an('object')
    expect(gulp.tasks['lint-sass'].fn).to.be.a('function')
  })

  it('Register build-sass task', () => {
    register(gulp, {
      scssSrc: 'test/input/**/*.scss',
      cssDest: 'test/output/css'
    })
    expect(Object.keys(gulp.tasks).length).to.equal(2)
    expect(gulp.tasks['build-sass']).to.be.an('object')
    expect(gulp.tasks['build-sass'].fn).to.be.a('function')
  })

  it('Register lint-node task', () => {
    register(gulp, {
      nodeSrc: 'test/input/**/*.spec.js'
    })
    expect(Object.keys(gulp.tasks).length).to.equal(1)
    expect(gulp.tasks['lint-node']).to.be.an('object')
    expect(gulp.tasks['lint-node'].fn).to.be.a('function')
  })

  it('Register lint-pug task', () => {
    register(gulp, {
      pugSrc: 'test/input/**/*.pug'
    })
    expect(Object.keys(gulp.tasks).length).to.equal(1)
    expect(gulp.tasks['lint-pug']).to.be.an('object')
    expect(gulp.tasks['lint-pug'].fn).to.be.a('function')
  })

  it('Register lint-js task', () => {
    register(gulp, {
      jsSrc: 'test/input/**/*.spec.js'
    })
    expect(Object.keys(gulp.tasks).length).to.equal(1)
    expect(gulp.tasks['lint-js']).to.be.an('object')
    expect(gulp.tasks['lint-js'].fn).to.be.a('function')
  })

  it('Register build-js task', () => {
    register(gulp, {
      jsEntry: 'test/input/**/*.spec.js',
      jsDest: 'test/output/js'
    })
    expect(Object.keys(gulp.tasks).length).to.equal(1)
    expect(gulp.tasks['build-js']).to.be.an('object')
    expect(gulp.tasks['build-js'].fn).to.be.a('function')
  })

  it('Register build-img task', () => {
    register(gulp, {
      imgSrc: 'test/input/**/*',
      imgDest: 'test/output/img'
    })
    expect(Object.keys(gulp.tasks).length).to.equal(1)
    expect(gulp.tasks['build-img']).to.be.an('object')
    expect(gulp.tasks['build-img'].fn).to.be.a('function')
  })
})

describe('Register gulp watchers', () => {
  beforeEach(() => {
    gulp.reset()
  })

  it('Register returns a function', () => {
    const registerWatchers = register(gulp, {})
    expect(registerWatchers).to.be.a('function')
  })

  it('Throw if no gulp instance passed', () => {
    const registerWatchers = register(gulp, {})
    try {
      registerWatchers()
      expect(0).to.equal(1)
    } catch (e) {
      expect(e.message).to.equal('Gulp instance not passed')
    }
  })

  it('Registers watcher for lint-sass', () => {
    const registerWatchers = register(gulp, {
      scssSrc: 'test/input/**/*.scss'
    })
    expect(registerWatchers).to.be.a('function')

    const watchStub = sinon.stub(gulp, 'watch').returns(true)

    registerWatchers(gulp)

    expect(watchStub).to.be.calledWith('test/input/**/*.scss', ['lint-sass'])

    watchStub.restore()
  })

  it('Registers watchers for lint-sass and build-sass', () => {
    const registerWatchers = register(gulp, {
      scssSrc: 'test/input/**/*.scss',
      cssDest: 'test/output/css'
    })
    expect(registerWatchers).to.be.a('function')

    const watchStub = sinon.stub(gulp, 'watch').returns(true)

    registerWatchers(gulp)

    expect(watchStub).to.be.calledWith('test/input/**/*.scss', ['lint-sass'])
    expect(watchStub).to.be.calledWith('test/input/**/*.scss', ['build-sass'])

    watchStub.restore()
  })
})