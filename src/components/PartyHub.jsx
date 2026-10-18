import React from 'react';
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
  language
}) {
  const currentStats = partyStats[selectedParty] || partyStats.AAP;
  const bw24 = summary?.votes_2024?.booths_won || summary?.booths_won_2024 || {};
  const totalBooths = summary?.total_booths || (constituencyId === 'RAJA_SANSI' ? 222 : 223);
  const isRajaSansi = constituencyId === 'RAJA_SANSI';

  const partyNames = {
    AAP: { en: 'AAP', pa: 'ਆਪ' },
    INC: { en: 'INC', pa: 'ਕਾਂਗਰਸ' },
    SAD: { en: 'SAD', pa: 'ਅਕਾਲੀ ਦਲ' },
    BJP: { en: 'BJP', pa: 'ਭਾਜਪਾ' }
  };

  return (
    <div className="registry-sub-controls" aria-label="Party Analytics and Filters">
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
              {bw24.AAP || (isRajaSansi ? 69 : 81)} {t('wins', language)}
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
              {bw24.INC || (isRajaSansi ? 112 : 111)} {t('wins', language)}
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
              {bw24.SAD || (isRajaSansi ? 29 : 5)} {t('wins', language)}
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
              {bw24.BJP || (isRajaSansi ? 11 : 25)} {t('wins', language)}
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
                  {summary?.total_votes_2024?.toLocaleString() || (isRajaSansi ? '113,833' : '118,991')}
                </span>
                <span className="vital-sub">
                  ({summary?.turnout_pct || (isRajaSansi ? -14.6 : -9.5)}% vs ’22)
                </span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item lead-inc">
                <span className="vital-lbl">
                  {language === 'pa' ? 'ਕਾਂਗਰਸ ਲੀਡ' : 'INC Lead'}
                </span>
                <span className="vital-val">
                  {isRajaSansi ? '+4,543' : '+3,152'}
                </span>
                <span className="vital-sub">{t('lead_over_sub', language)} AAP</span>
              </div>
              <span className="vital-divider hide-mobile" aria-hidden="true" />
              <div className="vital-item hide-mobile">
                <span className="vital-lbl">{t('booths_won_title', language)}</span>
                <span className="vital-val">
                  INC: {bw24.INC || (isRajaSansi ? 112 : 111)} · AAP: {bw24.AAP || (isRajaSansi ? 69 : 81)} · SAD: {bw24.SAD || (isRajaSansi ? 29 : 5)} · BJP: {bw24.BJP || (isRajaSansi ? 11 : 25)}
                </span>
              </div>
            </>
          ) : (
            <>
              {isRajaSansi && summary?.votes_2017 && (
                <>
                  <div className="vital-item">
                    <span className="vital-lbl">{language === 'pa' ? '’17 ਵੋਟਾਂ' : '’17 Votes'}</span>
                    <span className="vital-val">
                      {selectedParty === 'INC' ? summary.votes_2017.inc?.toLocaleString() :
                       selectedParty === 'SAD' ? summary.votes_2017.sad?.toLocaleString() :
                       selectedParty === 'AAP' ? summary.votes_2017.aap?.toLocaleString() :
                       selectedParty === 'BJP' ? (language === 'pa' ? 'ਗਠਜੋੜ' : 'In NDA') : '-'}
                    </span>
                    <span className="vital-sub">
                      ({selectedParty === 'INC' ? `${summary.votes_2017.inc_pct}%` :
                        selectedParty === 'SAD' ? `${summary.votes_2017.sad_pct}%` :
                        selectedParty === 'AAP' ? `${summary.votes_2017.aap_pct}%` :
                        selectedParty === 'BJP' ? 'SAD Ally' : '-'})
                    </span>
                  </div>
                  <span className="vital-divider" aria-hidden="true" />
                  <div className="vital-item">
                    <span className="vital-lbl">{language === 'pa' ? '’19 ਵੋਟਾਂ' : '’19 Votes'}</span>
                    <span className="vital-val">
                      {selectedParty === 'INC' ? summary.votes_2019.inc?.toLocaleString() :
                       selectedParty === 'BJP' ? summary.votes_2019.bjp?.toLocaleString() :
                       selectedParty === 'AAP' ? summary.votes_2019.aap?.toLocaleString() :
                       selectedParty === 'SAD' ? (language === 'pa' ? 'ਗਠਜੋੜ' : 'In NDA') : '-'}
                    </span>
                    <span className="vital-sub">
                      ({selectedParty === 'INC' ? `${summary.votes_2019.inc_pct}%` :
                        selectedParty === 'BJP' ? `${summary.votes_2019.bjp_pct}%` :
                        selectedParty === 'AAP' ? `${summary.votes_2019.aap_pct}%` :
                        selectedParty === 'SAD' ? 'BJP Ally' : '-'})
                    </span>
                  </div>
                  <span className="vital-divider" aria-hidden="true" />
                </>
              )}
              <div className="vital-item">
                <span className="vital-lbl">{t('votes_22', language)}</span>
                <span className="vital-val">{currentStats.votes_2022?.toLocaleString()}</span>
                <span className="vital-sub">({currentStats.share_2022}%)</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">{t('votes_24', language)}</span>
                <span className="vital-val">{currentStats.votes_2024?.toLocaleString()}</span>
                <span className="vital-sub">({currentStats.share_2024}%)</span>
              </div>
              <span className="vital-divider" aria-hidden="true" />
              <div className="vital-item">
                <span className="vital-lbl">{t('net_shift', language)} (’22→’24)</span>
                <span className={`vital-val ${currentStats.vote_diff >= 0 ? 'shift-gain' : 'shift-loss'}`}>
                  {currentStats.vote_diff >= 0 ? `+${currentStats.vote_diff?.toLocaleString()}` : currentStats.vote_diff?.toLocaleString()}
                </span>
              </div>
              <span className="vital-divider hide-mobile" aria-hidden="true" />
              <div className="vital-item hide-mobile">
                <span className="vital-lbl">{t('top_booth', language)}</span>
                <span className="vital-val">#{currentStats.top_booth?.no}</span>
                <span className="vital-sub">({currentStats.top_booth?.votes}v)</span>
              </div>
            </>
          )}
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
              className={`cat-pill-btn inc-filter ${partyFilter === 'INC_WINS' ? 'active inc-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'INC_WINS' ? 'ALL' : 'INC_WINS')}
            >
              <Award size={13} className="pill-icon inc-text" />
              <span>{t('inc_won', language)}</span>
              <span className="cat-pill-num">{bw24.INC || (isRajaSansi ? 112 : 111)}</span>
            </button>
            <button
              className={`cat-pill-btn aap-filter ${partyFilter === 'AAP_WINS' ? 'active aap-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'AAP_WINS' ? 'ALL' : 'AAP_WINS')}
            >
              <Award size={13} className="pill-icon aap-text" />
              <span>{t('aap_won', language)}</span>
              <span className="cat-pill-num">{bw24.AAP || (isRajaSansi ? 69 : 81)}</span>
            </button>
            <button
              className={`cat-pill-btn sad-filter ${partyFilter === 'SAD_WINS' ? 'active sad-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'SAD_WINS' ? 'ALL' : 'SAD_WINS')}
            >
              <Award size={13} className="pill-icon sad-text" />
              <span>{t('sad_won', language)}</span>
              <span className="cat-pill-num">{bw24.SAD || (isRajaSansi ? 29 : 5)}</span>
            </button>
            <button
              className={`cat-pill-btn bjp-filter ${partyFilter === 'BJP_WINS' ? 'active bjp-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'BJP_WINS' ? 'ALL' : 'BJP_WINS')}
            >
              <Award size={13} className="pill-icon bjp-text" />
              <span>{t('bjp_won', language)}</span>
              <span className="cat-pill-num">{bw24.BJP || (isRajaSansi ? 11 : 25)}</span>
            </button>
            <button
              className={`cat-pill-btn flipped-filter ${partyFilter === 'FLIPPED' ? 'active flip-active' : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'FLIPPED' ? 'ALL' : 'FLIPPED')}
            >
              <TrendingUp size={13} className="pill-icon flip-text" />
              <span>{t('flipped_booths', language)}</span>
              <span className="cat-pill-num">{isRajaSansi ? 119 : 136}</span>
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
            <button
              className={`cat-pill-btn won ${partyFilter === 'WON_BOTH' ? `active ${selectedParty.toLowerCase()}-active` : ''}`}
              onClick={() => setPartyFilter(partyFilter === 'WON_BOTH' ? 'ALL' : 'WON_BOTH')}
              title={`Won in both 2022 & 2024 by ${selectedParty}`}
            >
              <ShieldCheck size={13} />
              <span>{t('won_both', language)}</span>
              <span className="cat-pill-num">{currentStats.won_both_count}</span>
            </button>
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
