import React, { Component } from 'react'
import { Link } from 'react-router'

// import PropTypes from 'prop-types'

import Helmet from 'react-helmet'
import { HeaderNav } from './HeaderNav'
import { FooterNav } from './FooterNav'
import { WowEffect } from './WowEffect'
import { CommonHead } from './commonHead'
import { LoadWaiter } from './LoadWaiter'
import { canUseDOM } from './util'
import { SlickSlider } from './SlickSlider'

import translateUtil from './translateUtil'
let T = translateUtil.createComponent(__filename)
let t = translateUtil.createFunction(__filename)
translateUtil.appendModuleTranslations(__filename)


export class Home extends Component {
  constructor(props) {
    super(props)
    translateUtil.setLanguage()
    this.state = {
      sliderIndex: 0
    }
    this.sliderImages = t('slider-items')
  }

  addTestimonialsScript() {
    const script = document.createElement('script')
    script.setAttribute('data-company', 'getnexar')
    script.setAttribute('data-number', '3')
    script.setAttribute('data-length-limit', '80')
    script.setAttribute('data-height', '280px')
    script.setAttribute('data-invert-colors', 'false')
    script.setAttribute('data-color', '#fcac44')
    script.src = '/js/testimonials_hacked.js'
    document.head.appendChild(script)
  }

  componentDidMount() {
    this.addTestimonialsScript()
  }

  render () {
    let wideScreen = (!canUseDOM) || window.innerWidth > 1000
    const sliderOptions = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      slidesToShow: 1,
      dots: true,
      pauseOnFocus: false,
      nextArrow: '#nextArrow',
      prevArrow: '#prevArrow',
      customPaging: (slick, index) =>
        `<a data-role="none" data-slick-index="${index}">${this.sliderImages[index].subCaption}</a>`,
      dotsClass: 'nav-banner',
      speed:1500,
      responsive: [
        {
          breakpoint: 525,
          settings: {
            vertical: false,
            autoplay: false
          }
        }
      ]
    }
    return (
      <div className='wrapper' style={{visibility: this.state.loaded ? 'visible' : 'hidden'}}>
        <LoadWaiter onLoad={() => { this.setState({loaded: true}) }} />
        <CommonHead />
        <Helmet>
          <title>{t('title')}</title>
          <meta name='description' content={t('meta-description')} />
          <link rel='stylesheet' type='text/css' href="/css/styles.css" />

          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
        </Helmet>

        <WowEffect />

        <HeaderNav router={this.props.router} />

        <div className='content'>
            <div>
                <SlickSlider className="slickSlider slider" options={sliderOptions}>
                    {this.sliderImages.map( (item, i) =>
                        <div className="slide" style={{backgroundImage: `url(${item.url})`}} key={i}>
                            <h1><span>{item.caption}</span></h1>
                        </div>
                    )}
                </SlickSlider>

                <a type="button" id="prevArrow" className="prev-arrow-holder"><i className="prev-arrow"></i></a>

                <a type="button" id="nextArrow" className="next-arrow-holder"><i className="next-arrow"></i></a>
            </div>


          <div className='report-box'>
            <div className='container'>
              <div className="report-box-container">
                <img src='/images/home/reports.jpg' className='wow fadeInLeft' alt='bitmap_2'/>
                <div className='right-text mb-hide'>
                  <div className='wow fadeInUp'>
                    <h3><T value='report.title' /></h3>
                    <p><T value='report.content' /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='managing-holder'>
            <div className='container'>
              <div className='inner'>
                <div className='clearfix managing-left'>
                  <span className='title-lg wow fadeInUp'><T value='managing' /></span>
                  <Link to='/fleets' className='try-bt std-btn wow fadeInUp'><T value='try-it-for-free' /></Link>
                </div>
                <img src='/images/bitmap_3.png' className='managing-cam wow fadeInRight' alt='bitmap_3' />
                <img src='/images/bitmap_4.png' className='managing-iphone wow fadeInUp' alt='bitmap_4' />
              </div>
            </div>
          </div>

          <div className='sign-up'>
            <div className='container'>
              <span className='title-box-lg wow fadeInUp'>
                { wideScreen ? <T value='signup.title' /> : <T value='signup.title-mobile' /> }
              </span>
              <span className='title-sub wow fadeInUp'><T value='signup.text' /></span>
              <Link to='/professional-drivers-program' className='more'><T value='signup.readMore' /></Link>
              <span className='info'><T value='signup.text-note' /></span>
            </div>
          </div>

          <div className='info-blocks'>
            <div className='container info-list'>
              <div className='info-box wow fadeInDown'>
                <div className='inner'>
                  <div className='info-img'>
                    <img src='/images/ai.png' alt='ai.png' />
                  </div>
                  <div className='info-content'>
                    <span className='info-title'><T value='info-box-1.title' /></span>
                    <span className='info-text'><T value='info-box-1.text' /></span>
                  </div>
                </div>
              </div>
              <div className='info-box wow fadeInDown'>
                <div className='inner'>
                  <div className='info-img'>
                    <img src='/images/v-2-v.png' alt />
                  </div>
                  <div className='info-content'>
                    <span className='info-title'><T value='info-box-2.title' /></span>
                    <span className='info-text'><T value='info-box-2.text' /></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='info-box info-box-left info-download'>
              <div className='container'>
                <div className='info-left-img'>
                  <img src='/images/iPhone.png' className='info-l-img info-img wow fadeInLeft' alt='iPhone' />
                </div>
                <div className='info-content wow fadeInUp'>
                  <span className='info-title'><T value='info-box-3.title' /></span>
                  <span className='info-text'><T value='info-box-3.text' /></span>
                  <div className='download-buttons'>
                    <a href={t('info-box-3.appstore-link')} target='_blank' className='dl-appstore'>&nbsp;</a>
                    <a href={t('info-box-3.googleplay-link')} target='_blank' className='dl-googleplay'>&nbsp;</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='business-holder'>
            <div className='container'>
              <span className='title-box-lg white-text wow fadeInUp'><T value='business.title' /></span>
              <div className='business-content'>
                <div className='business-box'>
                  <span className='business-title wow fadeInUp' data-wow-delay='0.2s'><T value='business.fleets.title' /></span>
                  <span className='business-text wow fadeInUp' data-wow-delay='0.2s'><T value='business.fleets.text' /></span>
                  {/* style change */}
                  <Link to='/fleets' className='std-btn business-more wow fadeInUp' data-wow-delay='0.2s'><T value='business.fleets.more' /></Link>
                </div>
                <div className='business-box'>
                  <span className='business-title wow fadeInUp' data-wow-delay='0.3s'><T value='business.cities.title' /></span>
                  <span className='business-text wow fadeInUp' data-wow-delay='0.3s'><T value='business.cities.text' /></span>
                  {/* style change */}
                  <Link to='/smart-city' className='std-btn business-more wow fadeInUp' data-wow-delay='0.3s'><T value='business.cities.more' /></Link>
                </div>
                <div className='business-box'>
                  <span className='business-title wow fadeInUp' data-wow-delay='0.4s'><T value='business.insurance.title' /></span>
                  <span className='business-text wow fadeInUp' data-wow-delay='0.4s'><T value='business.insurance.text' /></span>
                  {/* style change */}
                  <Link to='/insurance' className='std-btn business-more wow fadeInUp' data-wow-delay='0.4s'><T value='business.insurance.more' /></Link>
                </div>
              </div>
            </div>
          </div>

          {/* AskNicely widget */}
          <div id='an_testimonials' />

          <div className='store'>
            <div className='container'>
              <div className='item-store'>
                <div className='img'><img src='/images/bitmap.png' alt /></div>
                <div className='holder'>
                  <span className='name'><T value='store.item.name' /></span>
                  <div className='price-box'>
                    <span className='title-price'>{t('store.item.starts-from')}</span>
                    <strong><i>$</i> {t('store.item.price')} <span>.00</span></strong>
                  </div>
                  <p><T value='store.item.description' /></p>
                  <a href='https://shop.getnexar.com/' className='button' target='_blank'><T value='store.item.buy-button' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterNav />
      </div>)
  }
}
