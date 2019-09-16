/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useRef, useEffect, useState } from "react";
import SmartLink from "../SmartLink";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Nav.module.scss";

export const NavItem = ({ isFlyout, to, isActive, children }) => {
  return (
    <li className={cx({ [styles.flyout]: isFlyout })} key={to}>
      <SmartLink className={cx({ [styles.active]: isActive })} to={to}>
        {children}
      </SmartLink>
    </li>
  );
};

const Nav = ({ flyoutId, activeIndex, ...props }) => {
  const [flyouts, setFlyouts] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const isMobile = props.screenWidth < 768;
  const hasFlyout = flyouts.length > 0;
  const ref = useRef(null);

  const handleMenu = () => {
    if (isMobile) {
      setMenuIsOpen(!menuIsOpen);
    } else if (hasFlyout) {
      setMenuIsOpen(!menuIsOpen);
    } else {
      return false;
    }
  };

  useEffect(() => {
    // Reset the flyouts when window size changes. Prefixing this var with underscore to avoid naming conflict with flyouts held in state.
    const _flyouts = [];

    if (!isMobile) {
      let itemsWidth = 50; //accounting for the trigger also
      for (let [i, item] of ref.current.querySelectorAll("li").entries()) {
        itemsWidth = itemsWidth + item.getBoundingClientRect().width;
        if (itemsWidth > ref.current.getBoundingClientRect().width) {
          _flyouts.push(i);
        }
      }
      setFlyouts(_flyouts);
    }
  }, [flyouts.length, isMobile, props.children, props.screenWidth]);

  const renderChildren = () => {
    return props.children.map((item, ind) => (
      <NavItem
        key={item.props.to}
        {...item.props}
        isActive={activeIndex === ind}
        isFlyout={flyouts.includes(ind)}
      />
    ));
  };

  const renderFlyout = () => {
    return props.children
      .filter((item, ind) => flyouts.includes(ind))
      .map(item => <NavItem key={item.props.to} {...item.props} />);
  };

  return (
    <nav
      className={cx(
        [styles.root],
        props.className,
        isMobile ? [styles.mobile] : "",
        hasFlyout ? [styles.hasFlyout] : ""
      )}
    >
      {isMobile && (
        <div className={styles.mobileHeader} onClick={handleMenu} role="button">
          {props.children[activeIndex].props.children}
        </div>
      )}
      {(isMobile || hasFlyout) && (
        <button
          aria-controls={flyoutId}
          aria-expanded={menuIsOpen}
          aria-label={(menuIsOpen ? "Close" : "Open") + " Payments Menu"}
          className={styles.trigger}
          onClick={handleMenu}
          type="button"
        >
          <span aria-hidden="true" className={styles.triggerDot} />
        </button>
      )}
      <ul
        className={menuIsOpen ? "" : styles.mobileHide}
        id={flyoutId}
        ref={ref}
      >
        {renderChildren()}
      </ul>

      {!isMobile && menuIsOpen && hasFlyout && (
        <ul className={cx(styles.flyoutMenu, styles.flyoutOpen)} id={flyoutId}>
          {renderFlyout()}
        </ul>
      )}
    </nav>
  );
};

Nav.propTypes = {
  /** Active Menu item index */
  activeIndex: PropTypes.number,

  /** Menu Items */
  children: PropTypes.node.isRequired,

  /** Class to apply */
  className: PropTypes.string,

  /** Unique identifier to be used for button/content pairing with aria-controls/id */
  flyoutId: PropTypes.string,

  /** Screen width in pixels */
  screenWidth: PropTypes.number.isRequired
};

NavItem.propTypes = {
  /** Menu Item text */
  children: PropTypes.string.isRequired,

  /** Is Menu Item active */
  isActive: PropTypes.bool,

  /** Does Menu Item appear in flyout for tablet and desktop, calculated on window resize */
  isFlyout: PropTypes.bool,

  /** Link URL */
  to: PropTypes.string
};

export default Nav;
