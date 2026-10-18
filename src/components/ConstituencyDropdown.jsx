import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check, Search } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function ConstituencyDropdown({ constituencyId, setConstituencyId, language }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.RAJA_SANSI;
  const constList = Object.values(CONSTITUENCIES);

  const filteredList = constList.filter(c => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      c.code.includes(q) ||
      c.name_en.toLowerCase().includes(q) ||
      c.name_pa.includes(q) ||
      c.district_en.toLowerCase().includes(q) ||
      c.district_pa.includes(q)
    );
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  return (
    <div className="constituency-dropdown-wrap" ref={dropdownRef}>
      <button
        type="button"
        className={`constituency-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={t('select_constituency', language)}
      >
        <span className="constituency-pin-pill">
          <MapPin size={13} />
        </span>
        <span className="constituency-name-label">
          {language === 'pa' ? currentConst.name_pa : currentConst.name_en}
        </span>
        <span className="constituency-booth-pill">
          {currentConst.total_booths} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
        </span>
        <ChevronDown size={14} className={`constituency-chevron ${isOpen ? 'rotate' : ''}`} />
      </button>

      {isOpen && (
        <div className="constituency-dropdown-menu" role="listbox">
          <div className="constituency-menu-header">
            <span>{language === 'pa' ? 'ਵਿਧਾਨ ਸਭਾ ਹਲਕਾ ਚੁਣੋ' : 'SELECT ASSEMBLY CONSTITUENCY'}</span>
            <span className="const-total-count" style={{ marginLeft: '6px', opacity: 0.7 }}>({constList.length})</span>
          </div>

          {/* Quick search input */}
          <div className="constituency-search-row">
            <Search size={13} className="constituency-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={language === 'pa' ? 'ਹਲਕਾ ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਲੱਭੋ...' : 'Search constituency / PC...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="constituency-search-input"
            />
          </div>

          <div className="constituency-items-scroll">
            {filteredList.map((c) => {
              const isSelected = c.id === constituencyId;
              return (
                <div
                  key={c.id}
                  className={`constituency-menu-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setConstituencyId(c.id);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="constituency-item-left">
                    <div className="constituency-code-badge">#{c.code}</div>
                    <div className="constituency-item-info">
                      <div className="constituency-item-title">
                        {language === 'pa' ? c.name_pa : c.name_en}
                      </div>
                      <div className="constituency-item-sub">
                        {language === 'pa' ? c.district_pa : c.district_en}
                      </div>
                    </div>
                  </div>
                  <div className="constituency-item-right">
                    <span className="constituency-count-tag">
                      {c.total_booths} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
                    </span>
                    {isSelected && <Check size={16} className="constituency-check" />}
                  </div>
                </div>
              );
            })}
            {filteredList.length === 0 && (
              <div className="constituency-empty-state" style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                {language === 'pa' ? 'ਕੋਈ ਹਲਕਾ ਨਹੀਂ ਮਿਲਿਆ' : 'No constituency found'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
