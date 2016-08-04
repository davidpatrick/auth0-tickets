import React from 'react';

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="logo"><img src="https://cdn.auth0.com/styleguide/latest/lib/logos/img/badge.png" width="30" /></div>
      <div className="footer-grid">
        <div className="column">
          <div className="item">
            <h6>Product</h6>
          </div>
          <div className="item"><a href="https://auth0.com/pricing">Pricing</a></div>
          <div className="item"><a href="https://auth0.com/why-auth0">Why Auth0</a></div>
          <div className="item"><a href="https://auth0.com/how-it-works">How It Works</a></div>
        </div>
        <div className="column">
          <div className="item">
            <h6>Company</h6>
          </div>
          <div className="item"><a href="https://auth0.com/about">About Us</a></div>
          <div className="item"><a href="https://auth0.com/blog">Blog</a></div>
          <div className="item"><a href="https://auth0.com/jobs">Jobs</a></div>
          <div className="item"><a href="https://auth0.com/press">Press</a></div>
        </div>
        <div className="column">
          <div className="item">
            <h6>Security</h6>
          </div>
          <div className="item"><a href="https://auth0.com/availability-trust">Availability &amp; Trust</a></div>
          <div className="item"><a href="https://auth0.com/security">Security</a></div>
          <div className="item"><a href="https://auth0.com/whitehat">White Hat</a></div>
        </div>
        <div className="column">
          <div className="item">
            <h6>Learn</h6>
          </div>
          <div className="item"><a href="https://support.auth0.com">Help &amp; Support</a></div>
          <div className="item"><a href="https://auth0.com/docs">Documentation</a></div>
          <div className="item"><a href="https://auth0.com/opensource">Open Source</a></div>
        </div>
        <div className="column">
          <div className="item">
            <h6>Extend</h6>
          </div>
          <div className="item"><a href="https://auth0.com/lock">Lock</a></div>
          <div className="item"><a href="https://auth0.com/wordpress">WordPress</a></div>
          <div className="item"><a href="https://auth0.com/docs/apiv2">API Explorer</a></div>
        </div>
        <div className="contact">
          <div className="column">
            <div className="item">
              <h6>Contact</h6>
            </div>
            <div className="item item-text">10900 NE 8th Street<br/>Suite 700<br/>Bellevue, WA   98004</div>
          </div>
          <div className="column no-heading">
            <div className="item"><a href="tel:+18882352699">+1 (888) 235-2699</a><a href="tel:+14253126521">+1 (425) 312-6521</a></div>
            <div className="item item-phone-label">Support</div>
            <div className="item"><a href="tel:+14255599554">+1 (425) 559-9554</a></div>
          </div>
        </div>
      </div>
      <div className="colophon">
        <div className="column">
        </div>
        <div className="column">
          <ul className="list-inline text-right">
            <li><a href="https://auth0.com/privacy">Privacy Policy</a></li>
            <li><a href="https://auth0.com/terms">Terms of Service</a></li>
            <li><span>© 2013-2016 Auth0® Inc. All Rights Reserved.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
