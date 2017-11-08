import React from 'react'
//import { Route } from 'react-router'
import { Link } from 'react-router'
//import PropTypes from 'prop-types'
//const I18n = require('react-i18nify').I18n

import translateUtil from './translateUtil'
let T = translateUtil.createComponent(__filename)
let t = translateUtil.createFunction(__filename)
translateUtil.appendModuleTranslations(__filename)

import Helmet from 'react-helmet'
import { HeaderNav } from './HeaderNav'
import { FooterNav } from './FooterNav'
import { WowEffect } from './WowEffect'
import { CommonHead } from './commonHead'

import { SubscribeResult, subscribeByGoogleScript } from './subscribeUtil'

export class Challenges extends React.Component {
  static defaultForm = {
    'email': '',
  }

  constructor(props) {
    super(props)
    translateUtil.setLanguage()
    this.state = {
      formSubscribeResult: {result: 'undefined', error: null},
      formSubscribeSubmitting: false,
      form: Challenges.defaultForm,
    }

    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormChange(event) {
    this.setState(
      {form: {
        ...this.state.form,
        [event.target.name]: event.target.value}
      })
  }
  
  handleFormSubmit(event) {
    this.setState({formSubscribeSubmitting: true})

    subscribeByGoogleScript(this.state.form.email).then( r => {
      this.setState({formSubscribeSubmitting: false})

      this.setState({formSubscribeResult: r})

      if (r.result === SubscribeResult.success) {
        this.setState({form: Challenges.defaultForm})
      }
    })

    event.preventDefault()
  }
   
  render() {
    let subscribeResult = this.state.formSubscribeResult.result
    let subscribeResultMessage = t(`subscribeUtil.stateMessage.${subscribeResult}`, {fullValue: true})
    let isSubscribed = subscribeResult === SubscribeResult.success
    
    return (
      <div className="wrapper">

        <CommonHead />
        <Helmet>
          <title>{t('title')}</title>
          <meta name="description" content={t('meta-description')} />
          <link rel="stylesheet" type="text/css" href="/css/styles.css" />
        </Helmet>

        <WowEffect />

        <HeaderNav whiteHeader={true} router={this.props.router} />

          <header className="header-challenge" >
            <h1><T value="header" /></h1>
            <span className="subheader"><T value="sub-header" /></span>
          </header>
          <div >
            <div className="challenge-wrap-1" >
              <div className="challenge-text" >
                <p className="description-prog" >
                  <T value="text1" />
                </p>
                <p className="description-prog" >
                  <T value="text2" />
                </p>
              </div>

              {/* temporaryly deactivated*/}
              <div className='want-to-form'>
                <div className='failed-msg'>{ subscribeResultMessage }</div>
                { isSubscribed ?
                  <T value="form-thanks" />
                  :
                  <form onSubmit={this.handleFormSubmit} className="sign-form">
                    { this.state.formSubscribeSubmitting
                      &&
                      <div className="loading-msg"><T fullValue={true} value="App.forms.submitting" /></div>
                    }
                      <label><T value="want-to-know" /></label>
                    <label htmlFor="email">
                      <input name="email" type="email" className="sign-input" value={this.state.form.email} onChange={this.handleFormChange} required />
                      <span className='placeholder'>Email <span>*</span></span>
                    </label>
                    <button className='std-btn'><T value="form-send-button" /></button>
                  </form>
                }
              </div>

              <div className="row-box" >
                <div className="fancy-box" >
                  <Link to="/challenge-1">
                    <div className="box-bg left-img" />
                    <div className="inner" >
                      <h6><T value="challenges.c1.super-header" /></h6>
                      {/* <div className="closed"><T value="closed" /></div> */}
                      <h2><T value="challenges.c1.header" /></h2>
                    <div className="link-text" ><T value="challenge-details" /><span className="arrow"><i className="ion-ios-arrow-right"></i></span></div>
                    </div>
                  </Link>
                </div>
                <div className="fancy-box" >
                  <Link to="/challenge-2">
                    <div className="box-bg right-img" />

                    <div className="inner" >
                      <h6 ><T value="challenges.c2.super-header" /></h6>
                      <h2 ><T value="challenges.c2.header" /></h2>
                      <div className="link-text" ><T value="challenge-details" /><span className="arrow"><i className="ion-ios-arrow-right"></i></span></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        <FooterNav />
      </div>)
  }
}
