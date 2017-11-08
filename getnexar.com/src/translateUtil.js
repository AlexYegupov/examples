// translate util using keys based on module names
import React from 'react'
// import { Component } from 'react'

import { getFileName, canUseDOM } from './util'
import { getUrlParam } from './urlUtil'

const Translate = require('react-i18nify').Translate

// const Localize = require('react-i18nify').Localize;
const I18n = require('react-i18nify').I18n

const Languages = ['en', 'he']

const DefaultLanguage = 'en'

function isLanguage (lang) {
  return Languages.includes(lang)
}

function createComponent(module) {
  function T (params) {
    let fullValue = [
      params.fullValue ? null : getFileName(module),
      params.value
    ].filter(Boolean).join('.')

    let defaultParams = {dangerousHTML: true}
    let fullParams = {...defaultParams, ...params, ...{value: fullValue}}

    //console.log('<T', fullParams)
    let r = <Translate {...fullParams} />

    //if (process.env.NODE_ENV === 'production') {
      return r
    // } else {
    //   return <span title={`T:${fullValue}`}>{r}</span>
    // }
  }

  return T
}

function createFunction(module) {
  function t(value, options={replacements: {}, arrayExpected: false, fullValue: false}) {
    let fullValue = [
      options.fullValue ? null : getFileName(module),
      value
    ].filter(Boolean).join('.')

    let r = I18n.t(fullValue, options.replacements)

    if (options.arrayExpected) {
      return Array.isArray(r) ? r : []
    }

    return r
  }

  return t
}


function _translateTo (lang, key, replacements) {
  let locale = I18n._locale
  try {
    I18n._locale = lang
    return I18n.t(key, replacements)
  } finally {
    I18n._locale = locale
  }
}

I18n.setHandleMissingTranslation((key, replacements) => {
  let language = I18n._locale

  if (process.env.NODE_ENV === 'production') {
    if (language !== DefaultLanguage) {
      // try to find translation to default language
      return _translateTo(DefaultLanguage, key, replacements)
    } else {
      // default translation not found => return empty string
      return ''
    }
  } else {
    console.warn(`Missing ${I18n._locale} "${key}" translation`)
    return `??? ${language}: ${key} ???`
  }
})


function detectLanguage () {
  // 0) on server rendering just use default language
  if (!canUseDOM) return DefaultLanguage

  let urlLanguage = getUrlParam('lang')

  // 1) from url param
  if (urlLanguage && isLanguage(urlLanguage)) {
    localStorage.lang = urlLanguage
    return urlLanguage
  }

  // 2) from localStorage
  if (localStorage.lang && isLanguage(localStorage.lang)) {
    return localStorage.lang
  }

  // 3) default
  localStorage.lang = DefaultLanguage
  return DefaultLanguage
}


function setLanguage(lang=null) {
  I18n.setLocale(lang || detectLanguage())
}


function appendModuleTranslations(module) {
  const moduleName = getFileName(module)
  let data = require(`./../content/${moduleName}.yaml`)

  let translations = {...I18n._translations} //copy
  for (let lang of Languages) {
    translations[lang] = translations[lang] || {}
    translations[lang][moduleName] = data[lang]
  }
  I18n.setTranslations(translations)
  
}



export default {
  createComponent,
  createFunction,
  DefaultLanguage,
  Languages,
  setLanguage,
  //appendTranslations,
  appendModuleTranslations,
  //appendYamlFileTranslations
}
