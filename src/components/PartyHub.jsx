import React, { useMemo } from 'react';
import { Layers, ShieldCheck, TrendingUp, TrendingDown, AlertTriangle, ShieldAlert, Award, Filter } from 'lucide-react';
import { t } from '../utils/translations';

export default function PartyHub({ 
  selectedParty, 
  setSelectedParty, 
  partyFilter, 
  setPartyFilter,
  partyStats,
  summary,
  constituencyId,
  language,
  booths = [],
  selectedYears = [],
  setSelectedYears
}) {
  const currentStats = partyStats[selectedParty] || partyStats.AAP;
  const totalBooths = booths.length || summary?.total_booths || 222;

  const partyNames = {
    AAP: { en: 'AAP', pa: 'ਆਪ' },
    INC: { en: 'INC', pa: 'ਕਾਂਗਰਸ' },
    SAD: { en: 'SAD', pa: 'ਅਕਾਲੀ ਦਲ' },
    BJP: { en: 'BJP', pa: 'ਭਾਜਪਾ' }
  };

  // Determine top 2 parties in 2024 for vitals header
  const topParties = useMemo(() => {
    const pList = ['INC', 'AAP', 'SAD', 'BJP'];
    return [...pList].sort((a, b) => {
      const vA = partyStats?.[a]?.votes_2024 || 0;
      const vB = partyStats?.[b]?.votes_2024 || 0;
      return vB - vA;
    });
  }, [partyStats]);

  const p1 = topParties[0] || 'INC';
  const p2 = topParties[1] || 'AAP';
  const p1Lead = Math.max(0, (partyStats?.[p1]?.votes_2024 || 0) - (partyStats?.[p2]?.votes_2024 || 0));

  // Dynamically detect available election years for this constituency
  const availableYears = useMemo(() => {
    const list = [];
    if (booths.some(b => b.data_2017 && (b.data_2017.total > 0 || b.data_2017.winner_party || b.data_2017.winner))) {
      list.push({ year: 2017, code: '’17 VS' });
    }
    if (booths.some(b => b.data_2019 && (b.data_2019.total > 0 || b.data_2019.winner_party || b.data_2019.winner))) {
      list.push({ year: 2019, code: '’19 LS' });
    }
    if (booths.some(b => b.data_2022 && (b.data_2022.total > 0 || b.data_2022.winner_party || b.data_2022.winner))) {
      list.push({ year: 2022, code: '’22 VS' });
    }
    if (booths.some(b => b.data_2024 && (b.data_2024.total > 0 || b.data_2024.winner_party || b.data_2024.winner))) {
      list.push({ year: 2024, code: '’24 LS' });
    }
    return list;
  }, [booths]);

  const has4Years = availableYears.length >= 4;

  // Calculate booth count for any set of election years
  const getComboCount = (comboYears) => {
    return booths.filter(b => {
      if (selectedParty !== 'ALL') {
        return comboYears.every(yr => {
          const dy = b[`data_${yr}`];
          const wp = dy?.winner_party || dy?.winner;
          return wp === selectedParty;
        });
      } else {
        const winners = comboYears.map(yr => {
          const dy = b[`data_${yr}`];
          return dy?.winner_party || dy?.winner;
        }).filter(Boolean);
        return winners.length === comboYears.length && winners.every(w => w === winners[0]);
      }
    }).length;
  };

  // Pre-calculated combinations dynamically adapting to 4-year vs 2-year constituencies
  const comboPills = useMemo(() => {
    let presets = [];
    if (has4Years) {
      presets = [
        { id: '17_19_24', years: [2017, 2019, 2024], label: language === 'pa' ? '’17+’19+’24 ਵਿੱਚ ਜਿੱਤ' : "Won ’17+’19+’24", isPrimary: true },
        { id: '17_19_22', years: [2017, 2019, 2022], label: language === 'pa' ? '’17+’19+’22 ਵਿੱਚ ਜਿੱਤ' : "Won ’17+’19+’22" },
        { id: '17_22_24', years: [2017, 2022, 2024], label: language === 'pa' ? '’17+’22+’24 ਵਿੱਚ ਜਿੱਤ' : "Won ’17+’22+’24" },
        { id: '19_22_24', years: [2019, 2022, 2024], label: language === 'pa' ? '’19+’22+’24 ਵਿੱਚ ਜਿੱਤ' : "Won ’19+’22+’24" },
        { id: '17_19', years: [2017, 2019], label: language === 'pa' ? '’17+’19 ਵਿੱਚ ਜਿੱਤ' : "Won ’17+’19" },
        { id: '19_24', years: [2019, 2024], label: language === 'pa' ? '’19+’24 ਵਿੱਚ ਜਿੱਤ' : "Won ’19+’24" },
        { id: '17_24', years: [2017, 2024], label: language === 'pa' ? '’17+’24 ਵਿੱਚ ਜਿੱਤ' : "Won ’17+’24" },
        { id: '22_24', years: [2022, 2024], label: language === 'pa' ? '’22+’24 ਵਿੱਚ ਜਿੱਤ' : "Won ’22+’24" },
        { id: 'ALL_4', years: [2017, 2019, 2022, 2024], label: language === 'pa' ? '👑 ਸਾਰੀਆਂ 4 ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ' : "👑 All 4 (’17+’19+’22+’24)" }
      ];
    } else {
      presets = [
        { id: '22_24', years: [2022, 2024], label: language === 'pa' ? '’22+’24 ਦੋਵਾਂ ਵਿੱਚ ਜਿੱਤ' : "Won Both (’22+’24)", isPrimary: true },
        { id: '24', years: [2024], label: language === 'pa' ? '’24 ਲੋਕ ਸਭਾ ਜਿੱਤ' : "Won ’24 Lok Sabha" },
        { id: '22', years: [2022], label: language === 'pa' ? '’22 ਵਿਧਾਨ ਸਭਾ ਜਿੱਤ' : "Won ’22 Assembly" }
      ];
    }

    return presets.map(item => ({
      ...item,
      count: getComboCount(item.years)
    }));
  }, [booths, selectedParty, language, has4Years]);

  // Aggregate Category Counts for 'ALL' party mode
  const allCategoryCounts = useMemo(() => {
    let wonAll = 0;
    let won2 = 0;
    let won3Plus = 0;
    let flipped = 0;

    booths.forEach(b => {
      const w24 = b.data_2024?.winner_party || b.data_2024?.winner;
      if (b.is_flip || b.comparison?.is_flip) flipped++;

      if (w24) {
        let count = 0;
        if ((b.data_2017?.winner_party || b.data_2017?.winner) === w24) count++;
        if ((b.data_2019?.winner_party || b.data_2019?.winner) === w24) count++;
        if ((b.data_2022?.winner_party || b.data_2022?.winner) === w24) count++;
        if ((b.data_2024?.winner_party || b.data_2024?.winner) === w24) count++;

        const tot = has4Years ? 4 : 2;
        if (count === tot) wonAll++;
        if (count === 2) won2++;
        if (count >= 3) won3Plus++;
      }
    });

    return { wonAll, won2, won3Plus, flipped };
  }, [booths, has4Years]);

  const handleToggleYear = (year) => {
    if (!setSelectedYears) return;
    const exists = selectedYears.includes(year);
    let next;
    if (exists) {
      next = selectedYears.filter(y => y !== year);
    } else {
      next = [...selectedYears, year].sort((a, b) => a - b);
    }
    setSelectedYears(next);
  };

  const handleSelectCombo = (comboYears) => {
    if (!setSelectedYears) return;
    const isCurrentlyActive = selectedYears.length === comboYears.length && 
      comboYears.every(y => selectedYears.includes(y));
    
    if (isCurrentlyActive) {
      setSelectedYears([]);
    } else {
      setSelectedYears([...comboYears].sort((a, b) => a - b));
    }
  };

  return (
    <div id="party-analytics-hub" className="registry-sub-controls" aria-label="Party Analytics and Filters">
      {/* 1. Main Segment Switcher Tabs & Live Summary */}
      <div className="party-pills-row">
        <div className="party-pill-tabs">
          {/* Complete List Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'ALL' ? 'active all' : ''}`}
            onClick={() => { setSelectedParty('ALL'); setPartyFilter('ALL'); }}
            title={`View complete list of all ${totalBooths} booths`}
          >
            <Layers size={15} />
            <span className="party-tab-text">{t('complete_list', language)}</span>
            <span className="tab-pill-count">{totalBooths}</span>
          </button>

          {/* AAP Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'AAP' ? 'active aap' : ''}`}
            onClick={() => { setSelectedParty('AAP'); setPartyFilter('ALL'); }}
            title="Switch to AAP Booth Analytics"
          >
            <span className="party-color-indicator aap-indicator"></span>
            <span className="party-tab-text">{partyNames.AAP[language]}</span>
            <span className="tab-pill-count aap-badge">
              {partyStats.AAP?.booths_won_24 ?? 0} {t('wins', language)}
            </span>
          </button>

          {/* INC Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'INC' ? 'active inc' : ''}`}
            onClick={() => { setSelectedParty('INC'); setPartyFilter('ALL'); }}
            title="Switch to INC Booth Analytics"
          >
            <span className="party-color-indicator inc-indicator"></span>
            <span className="party-tab-text">{partyNames.INC[language]}</span>
            <span className="tab-pill-count inc-badge">
              {partyStats.INC?.booths_won_24 ?? 0} {t('wins', language)}
            </span>
          </button>

          {/* SAD Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'SAD' ? 'active sad' : ''}`}
            onClick={() => { setSelectedParty('SAD'); setPartyFilter('ALL'); }}
            title="Switch to SAD Booth Analytics"
          >
            <span className="party-color-indicator sad-indicator"></span>
            <span className="party-tab-text">{partyNames.SAD[language]}</span>
            <span className="tab-pill-count sad-badge">
              {partyStats.SAD?.booths_won_24 ?? 0} {t('wins', language)}
            </span>
          </button>

          {/* BJP Analytics Button */}
          <button
            className={`party-tab-pill ${selectedParty === 'BJP' ? 'active bjp' : ''}`}
            onClick={() => { setSelectedParty('BJP'); setPartyFilter('ALL'); }}
            title="Switch to BJP Booth Analytics"
          >
            <span className="party-color-indicator bjp-indicator"></span>
            <span className="party-tab-text">{partyNames.BJP[language]}</span>
            <span className="tab-pill-count bjp-badge">
              {partyStats.BJP?.booths_won_24 ?? 0} {t('wins', language)}
            </span>
          </button>
        </div>

        {/* Compact Vitals Badge Strip */}
        <div className="compact-vitals-line" title="Aggregated Constituency & Party Vitals">
          {selectedParty === 'ALL' ? (
            <>
              <div className="vital-item">
                <span className="vital-lbl">{t('polled_2024', language)}</span>
                <span className="vital-val">
                  {(summary?.total_votes_2024 || booths.reduce((a, b) => a + (b.data_2024?.total || 0), 0)).toLocaleString()}
                </span>
                {summary?.turnout_pct && (
                  <span className="vital-sub">
                    ({summary.turnout_pct > 0 ? '+' : ''}{summary.turnout_pct}% vs ’22)
                  </span>
                )}
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item lead-highlight">
                <span className="vital-lbl">
                  {p1} {language === 'pa' ? 'ਲੀਡ' : 'Lead'}
                </span>
                <span className="vital-val">
                  +{p1Lead.toLocaleString()}
                </span>
                <span className="vital-sub">{t('lead_over_sub', language)} {p2}</span>
              </div>
              <span className="vital-divider hide-mobile" aria-hidden="true" />
              <div className="vital-item hide-mobile">
                <span className="vital-lbl">{t('booths_won_title', language)}</span>
                <span className="vital-val">
                  INC: {partyStats.INC?.booths_won_24 ?? 0} · AAP: {partyStats.AAP?.booths_won_24 ?? 0} · SAD: {partyStats.SAD?.booths_won_24 ?? 0} · BJP: {partyStats.BJP?.booths_won_24 ?? 0}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="vital-item">
                <span className="vital-lbl">{language === 'pa' ? '’24 ਵੋਟਾਂ' : '’24 Votes'}</span>
                <span className="vital-val">
                  {(currentStats.votes_2024 || 0).toLocaleString()}
                </span>
                <span className="vital-sub">({currentStats.share_2024 || 0}%)</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">{language === 'pa' ? '’22 ਵੋਟਾਂ' : '’22 Votes'}</span>
                <span className="vital-val">
                  {(currentStats.votes_2022 || 0).toLocaleString()}
                </span>
                <span className="vital-sub">({currentStats.share_2022 || 0}%)</span>
              </div>
              <span className="vital-divider hide-mobile" aria-hidden="true" />
              <div className="vital-item hide-mobile">
                <span className="vital-lbl">{language === 'pa' ? 'ਸ਼ਿਫਟ ਬਨਾਮ ’22' : 'Shift vs ’22'}</span>
                <span className={`vital-val ${currentStats.vote_diff >= 0 ? 'text-green' : 'text-red'}`}>
                  {currentStats.vote_diff >= 0 ? `+${currentStats.vote_diff.toLocaleString()}` : currentStats.vote_diff.toLocaleString()}
                </span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">{t('top_booth', language)}</span>
                <span className="vital-val">#{currentStats.top_booth?.no}</span>
                <span className="vital-sub">({currentStats.top_booth?.votes}v)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Multi-Election Trajectory & Continuity Combination Hub */}
      <div className="multi-year-trajectory-box">
        <div className="trajectory-box-header">
          <div className="trajectory-title-wrap">
            <span className="trajectory-badge">
              {language === 'pa' ? 'ਬਹੁ-ਚੋਣ ਜਿੱਤ ਫਿਲਟਰ' : 'MULTI-YEAR COMBINATIONS'}
            </span>
            <span className="trajectory-title">
              {language === 'pa' ? 'ਚੋਣ ਸਫ਼ਰ ਅਤੇ ਲਗਾਤਾਰਤਾ ਫਿਲਟਰ' : 'ELECTION TRAJECTORY & CONTINUITY FILTERS'}
            </span>
            <span className="trajectory-hint">
              {has4Years 
                ? (language === 'pa' 
                    ? 'ਕਈ ਚੋਣਾਂ ਵਿੱਚ ਲਗਾਤਾਰ ਜਿੱਤਾਂ ਵਾਲੇ ਬੂਥ ਦੇਖੋ (ਜਿਵੇਂ ’17+’19+’24, ’17+’19, ’19+’24)' 
                    : 'Filter booths won across combinations (e.g. Won in ’17+’19+’24, ’17+’19, ’19+’24)')
                : (language === 'pa'
                    ? '2022 ਅਤੇ 2024 ਵਿੱਚ ਜਿੱਤਾਂ ਅਤੇ ਫਲਿੱਪਸ ਦੀ ਤੁਲਨਾ ਕਰੋ'
                    : 'Compare booths won across 2022 Assembly and 2024 Lok Sabha')}
            </span>
          </div>

          {selectedYears.length > 0 && (
            <button 
              type="button"
              className="btn-clear-combo"
              onClick={() => setSelectedYears([])}
              title="Reset multi-year filter"
            >
              <span>{language === 'pa' ? 'ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ' : 'Clear Filter'} ({selectedYears.map(y => "'" + y.toString().slice(-2)).join('+')})</span>
            </button>
          )}
        </div>

        {/* Dynamic Year Builder Strip & Quick Presets */}
        <div className="trajectory-controls-row">
          <div className="year-builder-group">
            <span className="builder-label">
              {language === 'pa' ? 'ਚੋਣ ਸਾਲ ਚੁਣੋ:' : 'CUSTOM BUILDER:'}
            </span>
            <div className="year-toggle-strip">
              {availableYears.map(({ year, code }) => {
                const isActive = selectedYears.includes(year);
                return (
                  <button
                    key={year}
                    type="button"
                    className={`year-toggle-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleToggleYear(year)}
                    title={`Toggle ${year} in trajectory filter`}
                  >
                    <span className="year-toggle-check">{isActive ? '✓' : '+'}</span>
                    <span className="year-toggle-text">{code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Combinations Row */}
          <div className="quick-combos-group">
            <span className="builder-label">
              {language === 'pa' ? 'ਮੁੱਖ ਚੋਣ ਮਿਸ਼ਰਨ:' : 'QUICK COMBINATIONS:'}
            </span>
            <div className="quick-combos-pills">
              {comboPills.map(combo => {
                const isActive = selectedYears.length === combo.years.length && 
                  combo.years.every(y => selectedYears.includes(y));
                return (
                  <button
                    key={combo.id}
                    type="button"
                    className={`quick-combo-btn ${isActive ? 'active' : ''} ${combo.isPrimary ? 'featured-combo' : ''}`}
                    onClick={() => handleSelectCombo(combo.years)}
                    title={`Filter booths won in ${combo.label}`}
                  >
                    <span className="combo-btn-label">{combo.label}</span>
                    <span className="combo-btn-count">{combo.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Enhanced Category Filter Pills */}
      <div className={`category-filter-pills ${selectedParty.toLowerCase()}-mode`}>
        <div className="filter-pill-header">
          <Filter size={12} className="filter-header-icon" />
          <span className="filter-group-label">{t('filter_label', language)}</span>
        </div>

        {selectedParty === 'ALL' ? (
          <div className="cat-pill-group">
            <button
              className={`cat-pill-btn ${partyFilter === 'ALL' ? 'active default-active' : ''}`}
              onClick={() => setPartyFilter('ALL')}
            >
              <span>{t('all_booths', language)}</span>
              <span className="cat-pill-num">{totalBooths}</span>
            </button>
            <button
              className={`cat-pill-btn highlight-filter ${partyFilter === 'WON_THIS_YEAR' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_THIS_YEAR' ? 'ALL' : 'WON_THIS_YEAR')}
              title="Booths with a clear winner in 2024"
            >
              <Award size={13} />
              <span>{language === 'pa' ? 'ਇਸ ਸਾਲ ਜਿੱਤੇ (’24)' : 'Won in This Year (’24)'}</span>
              <span className="cat-pill-num">{totalBooths}</span>
            </button>
            <button
              className={`cat-pill-btn highlight-filter ${partyFilter === 'WON_ALL_ELECTIONS' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_ALL_ELECTIONS' ? 'ALL' : 'WON_ALL_ELECTIONS')}
              title={`Booths won in all elections by the same party (Clean Sweep)`}
            >
              <Award size={13} />
              <span>{language === 'pa' ? 'ਸਾਰੀਆਂ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ' : 'All Elections Won'}</span>
              <span className="cat-pill-num">{allCategoryCounts.wonAll}</span>
            </button>
            <button
              className={`cat-pill-btn highlight-filter ${partyFilter === 'WON_IN_2' ? 'active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_IN_2' ? 'ALL' : 'WON_IN_2')}
              title="Booths won in exactly 2 elections by the 2024 winner"
            >
              <ShieldCheck size={13} />
              <span>{language === 'pa' ? 'ਦੋ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ' : 'Won in Two (2 Elections)'}</span>
              <span className="cat-pill-num">{allCategoryCounts.won2}</span>
            </button>
            {has4Years && (
              <button
                className={`cat-pill-btn highlight-filter ${partyFilter === 'WON_IN_3_PLUS' ? 'active' : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_IN_3_PLUS' ? 'ALL' : 'WON_IN_3_PLUS')}
                title="Booths won in 3 or more elections"
              >
                <TrendingUp size={13} />
                <span>{language === 'pa' ? '3+ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ' : 'Won 3+ Elections'}</span>
                <span className="cat-pill-num">{allCategoryCounts.won3Plus}</span>
              </button>
            )}
            <button
              className={`cat-pill-btn inc-filter ${partyFilter === 'INC_WINS' ? 'active inc-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'INC_WINS' ? 'ALL' : 'INC_WINS')}
            >
              <Award size={13} className="pill-icon inc-text" />
              <span>{t('inc_won', language)}</span>
              <span className="cat-pill-num">{partyStats.INC?.booths_won_24 ?? 0}</span>
            </button>
            <button
              className={`cat-pill-btn aap-filter ${partyFilter === 'AAP_WINS' ? 'active aap-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'AAP_WINS' ? 'ALL' : 'AAP_WINS')}
            >
              <Award size={13} className="pill-icon aap-text" />
              <span>{t('aap_won', language)}</span>
              <span className="cat-pill-num">{partyStats.AAP?.booths_won_24 ?? 0}</span>
            </button>
            <button
              className={`cat-pill-btn sad-filter ${partyFilter === 'SAD_WINS' ? 'active sad-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'SAD_WINS' ? 'ALL' : 'SAD_WINS')}
            >
              <Award size={13} className="pill-icon sad-text" />
              <span>{t('sad_won', language)}</span>
              <span className="cat-pill-num">{partyStats.SAD?.booths_won_24 ?? 0}</span>
            </button>
            <button
              className={`cat-pill-btn bjp-filter ${partyFilter === 'BJP_WINS' ? 'active bjp-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'BJP_WINS' ? 'ALL' : 'BJP_WINS')}
            >
              <Award size={13} className="pill-icon bjp-text" />
              <span>{t('bjp_won', language)}</span>
              <span className="cat-pill-num">{partyStats.BJP?.booths_won_24 ?? 0}</span>
            </button>
            <button
              className={`cat-pill-btn flipped-filter ${partyFilter === 'FLIPPED' ? 'active flip-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'FLIPPED' ? 'ALL' : 'FLIPPED')}
            >
              <TrendingUp size={13} className="pill-icon flip-text" />
              <span>{t('flipped_booths', language)}</span>
              <span className="cat-pill-num">{allCategoryCounts.flipped}</span>
            </button>
          </div>
        ) : (
          <div className="cat-pill-group">
            <button
              className={`cat-pill-btn ${partyFilter === 'ALL' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter('ALL')}
            >
              <span>{t('all_booths', language)}</span>
              <span className="cat-pill-num">{totalBooths}</span>
            </button>
            {(currentStats.booths_won_24 > 0 || currentStats.won_this_year_count > 0) && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_THIS_YEAR' || partyFilter === 'WON_24' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_THIS_YEAR' || partyFilter === 'WON_24' ? 'ALL' : 'WON_24')}
                title={`Booths won by ${selectedParty} in 2024`}
              >
                <span>’24 {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'}</span>
                <span className="cat-pill-num">{currentStats.booths_won_24}</span>
              </button>
            )}
            {currentStats.booths_won_22 > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_22' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_22' ? 'ALL' : 'WON_22')}
                title={`Booths won by ${selectedParty} in 2022 Vidhan Sabha`}
              >
                <span>’22 {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'}</span>
                <span className="cat-pill-num">{currentStats.booths_won_22}</span>
              </button>
            )}
            {currentStats.booths_won_19 > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_19' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_19' ? 'ALL' : 'WON_19')}
                title={`Booths won by ${selectedParty} in 2019 Lok Sabha`}
              >
                <span>’19 {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'}</span>
                <span className="cat-pill-num">{currentStats.booths_won_19}</span>
              </button>
            )}
            {currentStats.booths_won_17 > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_17' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_17' ? 'ALL' : 'WON_17')}
                title={`Booths won by ${selectedParty} in 2017 Vidhan Sabha`}
              >
                <span>’17 {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'}</span>
                <span className="cat-pill-num">{currentStats.booths_won_17}</span>
              </button>
            )}
            <button
              className={`cat-pill-btn won ${partyFilter === 'WON_BOTH' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_BOTH' ? 'ALL' : 'WON_BOTH')}
              title={`Won in both 2022 & 2024 by ${selectedParty}`}
            >
              <ShieldCheck size={13} />
              <span>{t('won_both', language)}</span>
              <span className="cat-pill-num">{currentStats.won_both_count}</span>
            </button>
            {currentStats.won_in_2_count > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_IN_2' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_IN_2' ? 'ALL' : 'WON_IN_2')}
                title={`Booths won by ${selectedParty} in exactly 2 elections`}
              >
                <ShieldCheck size={13} />
                <span>{language === 'pa' ? 'ਦੋ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ' : 'Won in Two (2 Elections)'}</span>
                <span className="cat-pill-num">{currentStats.won_in_2_count}</span>
              </button>
            )}
            {currentStats.won_in_3_count > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_IN_3_PLUS' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_IN_3_PLUS' ? 'ALL' : 'WON_IN_3_PLUS')}
                title={`Booths won by ${selectedParty} in 3 or more elections`}
              >
                <TrendingUp size={13} />
                <span>{language === 'pa' ? '3+ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ' : 'Won 3+ Elections'}</span>
                <span className="cat-pill-num">{currentStats.won_in_3_count}</span>
              </button>
            )}
            {currentStats.won_all_count > 0 && (
              <button
                className={`cat-pill-btn ${partyFilter === 'WON_ALL_ELECTIONS' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
                onClick={() => setPartyFilter(partyFilter === 'WON_ALL_ELECTIONS' ? 'ALL' : 'WON_ALL_ELECTIONS')}
                title={`Booths won by ${selectedParty} in all elections (Clean Sweep)`}
              >
                <Award size={13} />
                <span>{language === 'pa' ? 'ਸਾਰੀਆਂ ਚੋਣਾਂ ਵਿੱਚ ਜਿੱਤ' : 'All Elections Won'}</span>
                <span className="cat-pill-num">{currentStats.won_all_count}</span>
              </button>
            )}
            <button
              className={`cat-pill-btn gained ${partyFilter === 'GAINED' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'GAINED' ? 'ALL' : 'GAINED')}
              title={`Gained by ${selectedParty} in 2024`}
            >
              <TrendingUp size={13} />
              <span>{t('gained_in_24', language)}</span>
              <span className="cat-pill-num">{currentStats.gained_count}</span>
            </button>
            <button
              className={`cat-pill-btn lost ${partyFilter === 'LOST_24' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'LOST_24' ? 'ALL' : 'LOST_24')}
              title={`Won in 2022, lost in 2024 by ${selectedParty}`}
            >
              <TrendingDown size={13} />
              <span>{t('lost_in_24', language)}</span>
              <span className="cat-pill-num">{currentStats.lost_24_count}</span>
            </button>
            <button
              className={`cat-pill-btn weak ${partyFilter === 'WEAK' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WEAK' ? 'ALL' : 'WEAK')}
              title={`Weak booth: less than 20% vote share for ${selectedParty}`}
            >
              <AlertTriangle size={13} />
              <span>{t('weak_booths', language)}</span>
              <span className="cat-pill-num">{currentStats.weak_count}</span>
            </button>
            <button
              className={`cat-pill-btn deficit ${partyFilter === 'LOST_BOTH' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'LOST_BOTH' ? 'ALL' : 'LOST_BOTH')}
              title={`Lost in both 2022 & 2024 by ${selectedParty}`}
            >
              <ShieldAlert size={13} />
              <span>{t('lost_both', language)}</span>
              <span className="cat-pill-num">{currentStats.lost_both_count}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
