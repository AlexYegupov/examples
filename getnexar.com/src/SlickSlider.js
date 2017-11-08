import React from 'react'
import { canUseDOM } from './util'
import { loadjs, loadcss } from './domutil'

export class SlickSlider extends React.Component {

  static defaultOptions = {
    dots: true,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
      },

    ]
  }

  constructor (props) {
    super(props)
    this.options = {...SlickSlider.defaultOptions, ...props.options}
  }

  initSlick() {
    Promise.resolve(
    ).then( () => loadjs('/js/jquery.min.js')
    ).then( () => Promise.all([
      loadjs('/js/slick.min.js'),
      //loadcss('/css/slider.css'), (already took by webpack)
    ])
    ).then( () => {
      window.jQuery('.slickSlider').slick(this.options)
    })
  }


  componentDidMount () {
    if (canUseDOM) this.initSlick()
  }

  render () {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

