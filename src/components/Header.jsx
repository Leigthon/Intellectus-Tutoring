import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const MAIN_SITE_URL = "https://leigthon.github.io/Intellectus-Platform/#/";
const FUNDING_URL = "https://leigthon.github.io/Intellectus-Platform/#/funding";
const MARKETPLACE_URL = "https://leigthon.github.io/Intellectus-Platform/#/marketplace";

const platformNavLinks = [
  { name: "Intellectus Main", href: MAIN_SITE_URL },
  { name: "Funding", href: FUNDING_URL },
  { name: "Marketplace", href: MARKETPLACE_URL },
];

/**
 * Header supports per-route configuration for logo and hover color.
 * Update `headerConfig` with path keys and { logo, hoverTextClass, underlineClass, mobileMenu, ... }.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dockHovered, setDockHovered] = useState(false);
  const location = useLocation();

  /** Tutoring-site-only links — secondary bar (desktop) + mobile menu. */
  const tutoringNavLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Subjects", path: "/subjects" },
    { name: "Tutors", path: "/tutors" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "Resources", path: "/resources" },
  ];

  const headerConfig = {
    "/": {
      logo: "profile images/logo.jpg",
      title: "Intellectus",
      subtitle: "TUTORING",
      hoverTextClass: "hover:text-[#1ac8db]",
      hoverBgClass: "hover:bg-[#1ac8db]/10",
      underlineClass: "bg-[#1ac8db]",
      mobileMenu: {
        panel:
          "border-t border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
        linkIdle: "text-slate-700 hover:bg-slate-100/90",
        linkActive: "text-[#1ac8db] bg-[#1ac8db]/12 font-semibold border-l-[3px] border-[#1ac8db]",
        platformLink: "text-slate-600 hover:bg-slate-100/80",
        sectionLabel: "px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400",
        burgerRing: "hover:bg-slate-100 text-slate-700",
      },
    },
  };

  const getMatchingKey = (configMap, pathname) => {
    if (configMap[pathname]) return pathname;

    const keys = Object.keys(configMap).filter((k) => k !== "/");
    let bestMatch = null;
    let bestLen = -1;

    for (const key of keys) {
      if (key.endsWith("*")) {
        const prefix = key.slice(0, -1);
        if (pathname.startsWith(prefix) && prefix.length > bestLen) {
          bestMatch = key;
          bestLen = prefix.length;
        }
      } else if (pathname === key || pathname.startsWith(`${key}/`)) {
        if (key.length > bestLen) {
          bestMatch = key;
          bestLen = key.length;
        }
      }
    }

    if (bestMatch) return bestMatch;
    if (configMap["/"]) return "/";
    return Object.keys(configMap)[0] || null;
  };

  let effectivePath = location.pathname || "/";
  try {
    const hash = window?.location?.hash || "";
    if ((effectivePath === "/" || effectivePath === "") && hash.startsWith("#/")) {
      effectivePath = hash.slice(1);
    }
  } catch {
    /* no window */
  }

  try {
    const browserPath = window?.location?.pathname || "";
    if ((effectivePath === "/" || effectivePath === "") && browserPath && browserPath !== "/") {
      effectivePath = browserPath;
    }
  } catch {
    /* no window */
  }

  const normalize = (p) => {
    if (!p) return "/";
    let s = String(p);
    if (s.startsWith("#")) s = s.slice(1);
    const qIdx = s.indexOf("?");
    if (qIdx !== -1) s = s.slice(0, qIdx);
    const hashIdx = s.indexOf("#");
    if (hashIdx !== -1) s = s.slice(0, hashIdx);
    if (!s.startsWith("/")) s = `/${s}`;
    if (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1);
    return s;
  };

  const normalizedEffectivePath = normalize(effectivePath);
  const matchedKey = getMatchingKey(headerConfig, normalizedEffectivePath);
  const config = matchedKey ? headerConfig[matchedKey] : headerConfig["/"];
  const mobileMenu = config.mobileMenu || headerConfig["/"].mobileMenu;

  let subtitleColor;
  if (config.color) {
    const c = String(config.color).trim();
    if (c.startsWith("#")) {
      subtitleColor = c;
    } else {
      const m = c.match(/#([0-9a-fA-F]{3,8})/);
      if (m) subtitleColor = `#${m[1]}`;
    }
  }

  const subtitleClass = config.subtitleClass || "";

  const isExternal = (path) =>
    typeof path === "string" && (path.startsWith("http") || path.startsWith("//"));

  const isActive = (path) => {
    if (!path || isExternal(path)) return false;
    return (
      normalizedEffectivePath === path ||
      normalizedEffectivePath.startsWith(`${path}/`)
    );
  };

  const scrollToTopOfPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const mainNavLinkClass = (active) =>
    `text-sm font-medium transition-colors relative whitespace-nowrap ${
      active
        ? `text-gray-900 ${config.hoverTextClass}`
        : `text-gray-700 ${config.hoverTextClass}`
    }`;

  const mainNavItemClass = (active) =>
    `block rounded-xl px-4 py-3 text-[15px] transition-colors ${
      active ? mobileMenu.linkActive : mobileMenu.linkIdle
    }`;

  /** Same text style as primary row (matches Intellectus platform nav). */
  const dockLinkClass = (active) => mainNavLinkClass(active);

  /** Underline sits on the bottom edge of the link (secondary bar). */
  const DockUnderline = ({ active }) =>
    active ? (
      <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${config.underlineClass}`} />
    ) : null;

  /** Underline aligned with full header row like the platform example. */
  const PrimaryUnderline = ({ active }) =>
    active ? (
      <span
        className={`absolute -bottom-[21px] left-0 right-0 h-0.5 ${config.underlineClass}`}
      />
    ) : null;

  const showSecondaryDock = dockHovered;

  return (
    <div
      className="sticky top-0 z-50 w-full"
      onMouseEnter={() => setDockHovered(true)}
      onMouseLeave={() => setDockHovered(false)}
    >
      <header className="border-b border-gray-200/90 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2 min-w-0">
            <button
              type="button"
              onClick={scrollToTopOfPage}
              className="group flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg border-0 bg-transparent p-0 text-left sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              aria-label="Scroll to top of this page"
            >
              <img
                src={config.logo}
                alt=""
                className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-12 sm:w-auto"
              />
              <div className="min-w-0 flex flex-col leading-tight">
                <span className="chunkfive-font flex items-center gap-1 truncate text-base text-gray-600 sm:gap-2 sm:text-[20px]">
                  <span className="truncate">
                    {config.title || "Intellectus"}
                    <span className="chunkfive-font shrink-0 text-[5px] text-gray-500">©</span>
                  </span>
                </span>
                <span
                  className={`header-text truncate text-[8px] font-normal sm:text-[9px] ${subtitleClass}`}
                  style={subtitleColor ? { color: subtitleColor } : undefined}
                >
                  {config.subtitle || ""}
                </span>
              </div>
            </button>

            {/* Desktop (md+): platform links + Tutoring — Book Session only in the hover dock */}
            <nav className="hidden min-w-0 shrink flex-wrap items-center justify-end gap-x-3 gap-y-1 md:flex lg:gap-x-4">
              {platformNavLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mainNavLinkClass(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link to="/" className={mainNavLinkClass(isActive("/"))}>
                Tutoring
                <PrimaryUnderline active={isActive("/")} />
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${mobileMenu.burgerRing}`}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary dock: tutoring links + prominent animated Book Session CTA */}
        <div
          className={`hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:block ${
            showSecondaryDock
              ? "max-h-[22rem] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="border-t border-gray-200 bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
              <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Tutoring on this site
              </p>
              <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7 lg:gap-x-8">
                {tutoringNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`${dockLinkClass(isActive(link.path))} pb-1`}
                  >
                    {link.name}
                    <DockUnderline active={isActive(link.path)} />
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex justify-center border-t border-dashed border-slate-200/90 pt-4">
                <Link
                  to="/contact"
                  className={`book-session-cta relative inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#1ed4e8] to-[#1ac8db] px-6 py-2.5 text-sm font-semibold text-white shadow-md ring-2 ring-[#1ac8db]/30 transition hover:from-[#2bd8eb] hover:to-[#17b8d2] hover:ring-[#1ac8db]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ac8db] active:scale-[0.98] motion-reduce:transform-none ${
                    isActive("/contact") ? "ring-[#2c3e73]/25" : ""
                  }`}
                >
                  Book a session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — in flow below header so it pushes content instead of covering it */}
      {isMenuOpen && (
        <div
          className={`md:hidden overflow-y-auto overscroll-contain border-b border-slate-200/80 max-h-[min(65vh,calc(100dvh-8rem))] ${mobileMenu.panel}`}
        >
          <nav className="px-3 py-3 sm:px-4">
            <p className={mobileMenu.sectionLabel}>Intellectus platform</p>
            <div className="space-y-1">
              {platformNavLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-[15px] transition-colors ${mobileMenu.platformLink}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <p className={`${mobileMenu.sectionLabel} mt-4`}>This tutoring site</p>
            <div className="space-y-1">
              {tutoringNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={mainNavItemClass(isActive(link.path))}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-5 border-t border-dashed border-slate-200/90 px-2 pt-5">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block">
                <span className="book-session-cta flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#1ed4e8] to-[#1ac8db] px-4 py-3.5 text-base font-semibold text-white shadow-md ring-2 ring-[#1ac8db]/30 transition hover:from-[#2bd8eb] hover:to-[#17b8d2] active:scale-[0.99] motion-reduce:transform-none">
                  Book a session
                </span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
