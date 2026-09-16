import React from 'react';
import { Sun, Moon, Menu, ChevronDown, Search, MapPin, Globe, Download, FileSpreadsheet } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function Header({ 
  theme, 
  toggleTheme, 
  onMenuClick,
  searchQuery,
  setSearchQuery,
  constituencyId,
  setConstituencyId,
  language,
  setLanguage
}) {
  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.RAJA_SANSI;

  return (
    <header className="app-header no-print">
      <div className="header-container">
        {/* Left: Hamburger, Constituency Switcher & Crumb */}
        <div className="header-left">
          <button 
            className="btn-icon header-hamburger" 
            onClick={onMenuClick}
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="header-section-label">
            <span className="section-title-text">{t('dashboard', language)}</span>
            <span className="header-separator">/</span>
            
            {/* Constituency Switcher Dropdown */}
            <div className="constituency-switcher-wrap" title={t('select_constituency', language)}>
              <MapPin size={14} className="constituency-pin-icon" />
              <select 
                className="constituency-select" 
                value={constituencyId} 
                onChange={(e) => setConstituencyId(e.target.value)}
                aria-label="Switch Constituency"
              >
                <option value="RAJA_SANSI">
                  {language === 'pa' ? '12 - ਰਾਜਾ ਸਾਂਸੀ (222 ਬੂਥ)' : '12 - Raja Sansi (222 Booths)'}
                </option>
                <option value="QADIAN">
                  {language === 'pa' ? '18 - ਕਾਦੀਆਂ (223 ਬੂਥ)' : '18 - Qadian (223 Booths)'}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="header-center-search">
          <div className="header-search-box">
            <Search size={15} className="header-search-icon" />
            <input 
              type="text" 
              className="header-search-input"
              placeholder={language === 'pa' ? 'ਬੂਥ, ਪਿੰਡ ਜਾਂ ਨੰਬਰ ਖੋਜੋ...' : 'Search booths, villages, numbers...'}
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search booths or villages"
            />
          </div>
        </div>

        {/* Right: Language, Excel Download, Theme & Profile */}
        <div className="header-right">
          {/* Language Switcher Pill (EN / ਪੰਜਾਬੀ) */}
          <div className="language-toggle-pill" title="Toggle English / ਪੰਜਾਬੀ">
            <Globe size={14} className="lang-globe-icon" />
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span className="lang-sep">|</span>
            <button 
              className={`lang-btn ${language === 'pa' ? 'active' : ''}`}
              onClick={() => setLanguage('pa')}
            >
              ਪੰਜਾਬੀ
            </button>
          </div>

          {/* Quick Master Excel Download */}
          <a
            href={currentConst.excelFile}
            download={currentConst.excelName}
            className="btn-header-download"
            title={language === 'pa' ? 'ਮਾਸਟਰ ਐਕਸਲ ਸ਼ੀਟ ਡਾਊਨਲੋਡ ਕਰੋ (.xlsx)' : 'Download Master Excel Sheet (.xlsx)'}
          >
            <FileSpreadsheet size={15} />
            <span className="hide-mobile">Excel</span>
          </a>

          {/* Theme Toggle */}
          <button 
            className="btn-icon" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Dsidein User Profile Dropdown */}
          <div className="dsidein-user-profile" title="Dsidein Command Center User">
            <div className="user-avatar-circle">
              <img 
                src="./dsidein_logo_transparent.png" 
                alt="Dsidein" 
                className="user-avatar-img" 
              />
            </div>
            <span className="user-profile-name">Dsidein</span>
          </div>
        </div>
      </div>
    </header>
  );
}
