import React from 'react'
import PropTypes from 'prop-types'
import { WindowScroll } from './WindowScroll'
import { Link } from 'react-router';
import xml2js from 'xml2js'

import { canUseDOM } from './util'

import translateUtil from './translateUtil'
let T = translateUtil.createComponent(__filename)
let t = translateUtil.createFunction(__filename)
translateUtil.appendModuleTranslations(__filename)

export class HeaderNav extends React.Component {

  static propTypes = {
    //scrollTop: PropTypes.function,
    //location: PropTypes.string.isRequired
    whiteHeader: PropTypes.bool,
    router: PropTypes.object,  //react-router
  }


  static defaultProps = {
    whiteHeader: false
  }

  constructor(props) {
    super(props);
      this.blog;
      this.state = {
      scrollTop: 0,
      mobileMenuVisible: false,
      openedSubMenu: null,
      isActive: false
    }
  }



  toggleMenu() {
    let mobileMenuVisible = !this.state.mobileMenuVisible

    this.setState({
      mobileMenuVisible: mobileMenuVisible,
      openedSubMenu: mobileMenuVisible ? this.state.openedSubMenu : null
    })
  }

  toggleOpenedSubMenu(openedSubMenu) {
    this.setState({
      openedSubMenu: (this.state.openedSubMenu === openedSubMenu ? null : openedSubMenu)
    })
  }

  componentDidMount(){
    this.hackParentClass()
  }

  hackParentClass() {
    //TODO rewrite react-way (in render we have all info)
    if (canUseDOM) {
      let activeEl = document.body.querySelector('.active')
      if (activeEl) {
        let dl = activeEl.closest('.drop-level');
        if (dl) {
          dl.className += ' active'
        }
      }
    }
  }

  render() {
    let {scrollTop} = this.state
    let {whiteHeader} = this.props

    let headerClasses = [
      scrollTop > 100 ? 'active': '',
      'header',
      whiteHeader ? 'white' : ''
    ].filter(Boolean).join(' ')

    const useMobileMenu = canUseDOM && window.innerWidth <= 1000

    function activeIf(activeIfLocation) {
      if (canUseDOM && window.location.pathname === activeIfLocation) {
        return 'active'
      } else {
        return ''
      }
    }
    let menuClass = (menuUrl) => [
      (canUseDOM && window.location.pathname === menuUrl) ? 'active' : '',
      (this.state.openedSubMenu === menuUrl) ? 'drop' : ''
    ].join(' ')

    let subMenuClass = (menuUrl) => [
            'inner-nav',
            (this.state.openedSubMenu === menuUrl) ? 'drop' : ''
        ].join(' ')

     let parentClass = () => [
         this.state.isActive ? 'active' : '' ].join(' ')

    let goTo = (url) => {
      if (url.startsWith('http')) {
        window.location = url
      } else {
        this.props.router.push(url) // navigate via react-router to internal urls
      }
    }

    let subMenuMarker = (menuUrl) => {
      if (!useMobileMenu) return ''

      return <i onClick={() => this.toggleOpenedSubMenu(menuUrl)}></i>
    }

    return (
      <header className={headerClasses} id="header">
        <WindowScroll onScroll={(scrollTop) => this.setState({scrollTop})} />

        <div className="header-top clearfix">
          <div className="container">
            <Link to="/" className="logo">
              <img data-wait   src="/images/logo-nexar.svg" className="black-logo" alt="Nexar's logo - Free AI dash cam app" />
            </Link>
            <a className={`show-menu ${this.state.mobileMenuVisible ? 'open' : ''}`} onClick={this.toggleMenu.bind(this)}>
              <span></span>
              <span></span>
              <span></span>
            </a>
            <div className={`header-nav ${this.state.mobileMenuVisible ? 'open' : ''}`}>
              <ul className="nav">
                <li className={activeIf('/')} >
                  <Link to="/"><T value="menu.home" /></Link></li>
                <li className={`${menuClass('/company')} drop-level ${parentClass()}`} >
                  <a href="javascript:void(0)">
                    <span onClick={() => goTo('/company')}>
                      <T value="menu.company"  />
                    </span>
                    {subMenuMarker('/company')}
                  </a>
                  <ul className={subMenuClass('/company')} >
                    <li className={activeIf('/team')}>
                      <Link to="/team"><T value="menu.team" /></Link></li>
                    <li className={activeIf('/careers')}>
                      <Link to="/careers"><T value="menu.careers" /></Link></li>
                    <li className={activeIf('/blog')}>
                      <a href="https://blog.getnexar.com/" target="_blank"><T value="menu.nexarBlog" /></a></li>
                    <li className={activeIf('/challenges')}>
                      <Link to="/challenges"><T value="menu.deepChallenge" /></Link></li>
                    <li className={activeIf('/presskit')}>
                      <Link to="/presskit" target='_blank'><T value="menu.pressKit" /></Link></li>
                    <li className={activeIf('/terms')}><Link to="/terms"><T value="menu.terms-of-use" /></Link></li>
                  </ul>
                </li>
                <li className={`${menuClass('/solutions')} drop-level ${parentClass()}`}>
                  <a href="javascript:void(0)">
                    <span onClick={() => goTo('/solutions')}>
                      <T value="menu.solutions" />
                    </span>
                    {subMenuMarker('/solutions')}
                  </a>
                  <ul className={subMenuClass('/solutions')}>
                    <li className={activeIf('/fleets')}>
                      <Link to="/fleets"><T value="menu.fleets" /></Link></li>
                    <li className={activeIf('/smart-city')}>
                      <Link to="/smart-city"><T value="menu.city" /></Link></li>
                    <li className={activeIf('/insurance')}>
                      <Link to="/insurance"><T value="menu.insurance" /></Link></li>
                    <li className={activeIf('/automotive')}>
                      <Link to="/automotive"><T value="menu.automotive" /></Link></li>
                  </ul>
                </li>
                <li className={activeIf('/support')}>
                  <a href="https://intercom.help/nexar" target='_blank'><T value="menu.support" /></a></li>

                <li className={activeIf('/contact-us')}>
                  <a href="/contact-us" className="contact-link"><T value="menu.contact-us" /></a></li>

                <li className={activeIf('/login')}>
                  <a href="https://www.getnexar.com/dashboard" target="_blank"><T value="menu.login" /></a></li>

                <li className={activeIf('/store')}>
                  <a href="https://shop.getnexar.com/" target="_blank"><T value="menu.store" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
