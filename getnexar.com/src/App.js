// For IE 11
//require("babel-polyfill");
import "babel-polyfill";

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createApp } from '@phenomic/preset-react-app/lib/client';

import '../static_local/css/all.css'

import PageError from './PageError'
import Head from 'react-helmet';
import Support from './Support'
import { Home } from './Home'
import { HomeHebrew } from './HomeHebrew'
import { Challenges } from './Challenges'
import { Challenge1 } from './Challenge1'
import { Challenge2 } from './Challenge2/Challenge2'
import { Challenge2Terms } from './Challenge2/Challenge2Terms'
import { Challenge2Upload } from './Challenge2/Challenge2Upload'
import { Challenge2UploadTo } from './Challenge2/Challenge2UploadTo'
import { Company } from './Company'
import { Careers } from './Careers'
import { Citystream } from './Citystream'
import { Fleets } from './Fleets'
import { Nevada } from './Nevada'
import { ContactUs } from './ContactUs'
import { Solutions } from './Solutions'
import { Tos } from './Tos'
import { Insurance } from './Insurance'
import { Team } from './Team'
import { PressKit } from './PressKit'
import { Automotive } from './Automotive'
import { ProfessionalDriverProgram } from './ProfessionalDriverProgram'

import translateUtil from './translateUtil'
let T = translateUtil.createComponent(__filename)
let t = translateUtil.createFunction(__filename)
translateUtil.appendModuleTranslations(__filename)

// append common forms.yaml translations
//translateUtil.appendYamlFileTranslations('forms')

const Html = props => {
  const helmet = Head.renderStatic();
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {/* <link href="https://adsfdfas.com" rel="stylesheet" /> */}

        {/* IE11 polyfill for: remove */}
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>

        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}

        {/* Facebook Pixel Code */}
        <script dangerouslySetInnerHTML={{__html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '118718988478521', {
em: '${t('facebook-pixel-email')}'
});
fbq('track', 'PageView');
        `}} />
        <noscript dangerouslySetInnerHTML={{__html: `
          <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=118718988478521&ev=PageView&noscript=1" />
        `}} />

        {/* Google analytics code */}
        <script dangerouslySetInnerHTML={{__html: ` (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); ga('create', '${t('google-analytics-code')}', 'auto');   ga('send', 'pageview');
        `}} />

      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {/* w <div>something</div> */}
        {/* phenomic html output */}
        {props.body}
        {/* phenomic current state, as json */}
        {/* required so sync static/client rendering */}
        {props.state}
        {/* phenomic entry script */}
        {props.script}

        {/* LNKD Pixel */}
        <script type='text/javascript' dangerouslySetInnerHTML={{__html: ` _linkedin_data_partner_id = "59216";
        `}} />
        <script type='text/javascript' dangerouslySetInnerHTML={{__html: `(function(){var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})();
        `}} />
        <noscript dangerouslySetInnerHTML={{__html: `
          <img height="1" width="1" style="display:none;" alt="" src="https://dc.ads.linkedin.com/collect/?pid=59216&fmt=gif" />
        `}} />
      </body>
    </html>
  );
};

// quick (hasklink scroll solution for /company#contactForm)
// by https://stackoverflow.com/a/40280486/1948511
function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 2000);
  } else {
    // quick fixing non-scrolling after <Link-ing without auto-scrolling to top
    // https://stackoverflow.com/a/36906825/1948511
    if (window) window.scrollTo(0, 0)
  }
}

const routes = () => (
    <div>
        <Router history={browserHistory} onUpdate={hashLinkScroll}>
            <Route path='/' component={Home}/>
            <Route path='/challenges' component={Challenges}/>
            <Route path='/challenge-1' component={Challenge1}/>
            <Route path='/challenge-2' component={Challenge2}/>
            <Route path='/challenge-2/terms-of-use' component={Challenge2Terms}/>
            <Route path='/challenge-2/upload' component={Challenge2Upload}/>
            <Route path='/challenge-2/upload-your-results' component={Challenge2UploadTo}/>
            <Route path='/company' component={Company}/>
            <Route path='/contact-us' component={ContactUs}/>
            <Route path='/careers' component={Careers}/>
            <Route path='/smart-city' component={Citystream}/>
            <Route path='/support' component={Support}/>
            <Route path='/fleets' component={Fleets}/>
            <Route path='/nevada' component={Nevada}/>
            <Route path='/solutions' component={Solutions}/>
            <Route path='/terms' component={Tos}/>
            {/* nw <Redirect from='/terms-of-use' to='/terms' /> */}
            <Route path='/insurance' component={Insurance}/>
            <Route path='/team' component={Team}/>
            <Route path='/presskit' component={PressKit}/>
            <Route path='/automotive' component={Automotive}/>

            <Route path='/professional-drivers-program' component={ProfessionalDriverProgram}/>

            <Route path='/professional-drivers-program-hebrew' component={ProfessionalDriverProgram} lang='he'/>

            <Route path='*' component={PageError} /* nw status={404} */ />
        </Router>

    </div>
)


// NOTE: <Route render=... > - nw (probably with phenomic)
// using Route custom attrs: https://github.com/ReactTraining/react-router/issues/1017#issuecomment-112628106)

export default createApp(routes, Html)

