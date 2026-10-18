import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpRight, ArrowDownRight, Minus, ChevronRight, Printer } from 'lucide-react';
import { t } from '../utils/translations';

export default function BoothGrid({ 
  booths, 
  selectedParty, 
  onSelectBooth,
  onExportBoothPdf,
  partyFilter,
  language
}) {
  const [viewMode, setViewMode] = useState('LIST'); // 'LIST' or 'GRID'

  const isAllMode = selectedParty === 'ALL';
  const pKey = selectedParty.toLowerCase(); // 'aap', 'inc', 'sad', 'bjp'

  const renderBoothBadge = (b) => {
    const est = b.created_year || (b.data_2017 ? 2017 : (b.data_2019 ? 2019 : 2022));
    const tag = est === 2017 ? '’17–’24' : (est === 2019 ? 'New ’19' : 'New ’22');
    return (
      <div className="dual-booth-badge matched" title={`Booth #${b.booth_no} (${est}–2024)`}>
        <span className="card-booth-badge">#{b.booth_no}</span>
        <span className="booth-match-tag">{tag}</span>
      </div>
    );
  };

  const renderTableBoothBadge = (b) => {
    const est = b.created_year || (b.data_2017 ? 2017 : (b.data_2019 ? 2019 : 2022));
    const tag = est === 2017 ? '’17–’24' : (est === 2019 ? 'New ’19' : 'New ’22');
    return (
      <div className="booth-avatar-badge-wrap" title={`Booth #${b.booth_no} (${est}–2024)`}>
        <span className="booth-avatar-badge">{b.booth_no}</span>
        <span className="booth-match-sub">{tag}</span>
      </div>
    );
  };

  if (booths.length === 0) {
    return (
      <div className="empty-state">
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>
          {language === 'pa' ? 'ਚੁਣੇ ਗਏ ਫਿਲਟਰ ਅਨੁਸਾਰ ਕੋਈ ਬੂਥ ਨਹੀਂ ਮਿਲਿਆ।' : 'No booths match the selected criteria.'}
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {language === 'pa' ? 'ਕਿਰਪਾ ਕਰਕੇ ਖੋਜ ਜਾਂ ਫਿਲਟਰ ਬਦਲੋ।' : 'Try clearing the search query or category filter.'}
        </p>
      </div>
    );
  }

  return (
    <div className="booth-container">
      {/* List Header Bar */}
      <div className="booth-list-header">
        <div className="list-title-wrap">
          <span className="list-count-badge">
            {booths.length} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
          </span>
          <span className="list-filter-label">
            {isAllMode && (
              partyFilter === 'ALL' ? (language === 'pa' ? 'ਸਾਰੇ ਬੂਥਾਂ ਦੀ ਮੁਕੰਮਲ ਸੂਚੀ' : `Complete Master List (${booths.length} Booths)`) :
              partyFilter === 'INC_WINS' ? (language === 'pa' ? '2024 ਵਿੱਚ ਕਾਂਗਰਸ ਦੁਆਰਾ ਜਿੱਤੇ ਬੂਥ' : 'Booths Won by INC in 2024') :
              partyFilter === 'AAP_WINS' ? (language === 'pa' ? '2024 ਵਿੱਚ ਆਪ ਦੁਆਰਾ ਜਿੱਤੇ ਬੂਥ' : 'Booths Won by AAP in 2024') :
              partyFilter === 'BJP_WINS' ? (language === 'pa' ? '2024 ਵਿੱਚ ਭਾਜਪਾ ਦੁਆਰਾ ਜਿੱਤੇ ਬੂਥ' : 'Booths Won by BJP in 2024') :
              partyFilter === 'SAD_WINS' ? (language === 'pa' ? '2024 ਵਿੱਚ ਅਕਾਲੀ ਦਲ ਦੁਆਰਾ ਜਿੱਤੇ ਬੂਥ' : 'Booths Won by SAD in 2024') : 
              partyFilter === 'FLIPPED' ? (language === 'pa' ? 'ਬਦਲੇ ਹੋਏ ਬੂਥ (Flipped Booths)' : 'Flipped Booths') : 'Booths'
            )}
            {!isAllMode && (
              partyFilter === 'ALL' ? (language === 'pa' ? `${selectedParty} ਦੇ ਸਾਰੇ ਬੂਥ` : `All Booths for ${selectedParty}`) :
              partyFilter === 'WON_BOTH' ? (language === 'pa' ? `${selectedParty} ਗੜ੍ਹ (ਦੋਵੇਂ 2022 ਅਤੇ 2024 ਜਿੱਤੇ)` : `${selectedParty} Strongholds (Won Both 2022 & 2024)`) :
              partyFilter === 'GAINED' ? (language === 'pa' ? `${selectedParty} ਲਾਭ (2024 ਜਿੱਤਿਆ, 2022 ਹਾਰਿਆ)` : `${selectedParty} Gains (Won in 2024, Lost in 2022)`) :
              partyFilter === 'LOST_24' ? (language === 'pa' ? `${selectedParty} ਨੁਕਸਾਨ (2022 ਜਿੱਤਿਆ, 2024 ਹਾਰਿਆ)` : `${selectedParty} Losses (Won in 2022, Lost in 2024)`) :
              partyFilter === 'WEAK' ? (language === 'pa' ? `${selectedParty} ਲਈ ਕਮਜ਼ੋਰ ਬੂਥ (< 20% ਵੋਟਾਂ)` : `Weak Booths for ${selectedParty} (< 20% Vote Share)`) :
              partyFilter === 'LOST_BOTH' ? (language === 'pa' ? `${selectedParty} ਦੁਆਰਾ ਦੋਵੇਂ ਵਾਰ ਹਾਰੇ ਬੂਥ` : `Booths Lost Both Times by ${selectedParty}`) : 'Booths'
            )}
          </span>
        </div>

        <div className="view-toggle-btns">
          <button 
            className={`toggle-btn ${viewMode === 'LIST' ? 'active' : ''}`}
            onClick={() => setViewMode('LIST')}
            title="List View"
            aria-label="List View"
          >
            <List size={16} />
            <span>{t('list_view', language)}</span>
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'GRID' ? 'active' : ''}`}
            onClick={() => setViewMode('GRID')}
            title="Grid Cards View"
            aria-label="Grid Cards View"
          >
            <LayoutGrid size={16} />
            <span>{t('grid_view', language)}</span>
          </button>
        </div>
      </div>

      {/* View Mode: Table List */}
      {viewMode === 'LIST' ? (
        <div className="clean-table-wrap">
          <table className="clean-table">
            <thead>
              {isAllMode ? (
                /* Complete List Headers: 4 Elections */
                <tr>
                  <th style={{ width: '68px', textAlign: 'center' }}>{t('col_no', language)}</th>
                  <th>{t('col_village', language)}</th>
                  <th>2017 VS</th>
                  <th>2019 LS</th>
                  <th>2022 VS</th>
                  <th>2024 LS</th>
                  <th>{language === 'pa' ? '4-ਚੋਣ ਸਫ਼ਰ' : '4-Year Trajectory'}</th>
                  <th style={{ textAlign: 'right' }}>{t('col_turnout_24', language)}</th>
                  <th style={{ textAlign: 'right' }}>{t('col_turnout_shift', language)}</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>{t('col_action', language)}</th>
                </tr>
              ) : (
                /* Party-Specific Headers */
                <tr>
                  <th style={{ width: '68px', textAlign: 'center' }}>{t('col_no', language)}</th>
                  <th>{t('col_village', language)}</th>
                  <th style={{ textAlign: 'right' }}>’17 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>’19 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>’22 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>’24 ({selectedParty})</th>
                  <th style={{ textAlign: 'right' }}>{language === 'pa' ? 'ਫ਼ਰਕ' : 'Shift'} (’22→’24)</th>
                  <th>{t('col_winner_24', language)}</th>
                  <th>{t('col_category', language)}</th>
                  <th style={{ width: '84px', textAlign: 'center' }}>{t('col_action', language)}</th>
                </tr>
              )}
            </thead>
            <tbody>
              {booths.map((b) => {
                const w17 = b.data_2017?.winner_party;
                const m17 = b.data_2017?.margin;
                const w19 = b.data_2019?.winner_party;
                const m19 = b.data_2019?.margin;
                const w22 = b.data_2022.winner_party;
                const w24 = b.data_2024.winner_party;
                const diff = b.comparison.turnout_diff;
                const pct = b.comparison.turnout_pct;

                if (isAllMode) {
                  return (
                    <tr 
                      key={b.booth_no}
                      onClick={() => onSelectBooth(b)}
                      title={`Click to inspect Booth #${b.booth_no}`}
                    >
                      <td style={{ textAlign: 'center' }}>
                        {renderTableBoothBadge(b)}
                      </td>

                      <td>
                        {language === 'pa' ? (
                          <>
                            <div className="village-pa punjabi-font" style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                              {b.village_punjabi || b.exact_name_punjabi}
                            </div>
                            <div className="village-en" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {b.village_english}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="village-en">{b.village_english}</div>
                            <div className="village-pa punjabi-font">{b.village_punjabi || b.exact_name_punjabi}</div>
                          </>
                        )}
                      </td>

                      {/* 2017 Winner */}
                      <td>
                        {b.data_2017 ? (
                          <span className={`mini-winner ${w17}`}>
                            {w17} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '3px' }}>+{m17}</span>
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>-</span>
                        )}
                      </td>

                      {/* 2019 Winner */}
                      <td>
                        {b.data_2019 ? (
                          <span className={`mini-winner ${w19}`}>
                            {w19} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '3px' }}>+{m19}</span>
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>-</span>
                        )}
                      </td>

                      {/* 2022 Winner */}
                      <td>
                        <span className={`mini-winner ${w22}`}>{w22}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                          +{b.data_2022.margin}
                        </span>
                      </td>

                      {/* 2024 Winner */}
                      <td>
                        <span className={`mini-winner ${w24}`}>{w24}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                          +{b.data_2024.margin}
                        </span>
                      </td>

                      {/* 4-Year Trajectory */}
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-surface-elevated)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>
                          {b.trend_4year || b.comparison.status_label}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        {b.data_2024.total.toLocaleString()}
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <span className={`diff-pill ${diff >= 0 ? 'gain' : 'loss'}`}>
                          {diff >= 0 ? `+${diff}` : diff} ({pct}%)
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <button
                            className="btn-table-pdf"
                            title={`Export Booth #${b.booth_no} as PDF`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onExportBoothPdf(b);
                            }}
                          >
                            <Printer size={12} />
                            <span>PDF</span>
                          </button>
                          <button
                            className="btn-table-view"
                            title={`Inspect Booth #${b.booth_no}`}
                            onClick={() => onSelectBooth(b)}
                          >
                            <span>{t('inspect', language)}</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                // Party-Specific Row
                const v17 = b.data_2017?.[pKey] !== undefined ? b.data_2017[pKey] : (selectedParty === 'BJP' && b.data_2017 ? 'NDA' : (selectedParty === 'SAD' && b.data_2019 ? 'NDA' : '-'));
                const v19 = b.data_2019?.[pKey] !== undefined ? b.data_2019[pKey] : (selectedParty === 'SAD' && b.data_2019 ? 'NDA' : '-');
                const v22 = b.data_2022[pKey] || 0;
                const pct22 = b.data_2022[`${pKey}_pct`] || 0;
                const v24 = b.data_2024[pKey] || 0;
                const pct24 = b.data_2024[`${pKey}_pct`] || 0;
                const partyDiff = v24 - v22;
                const swing = (pct24 - pct22).toFixed(1);

                let catLabel = language === 'pa' ? 'ਦੋਵੇਂ ਹਾਰੇ' : 'Lost Both';
                let catClass = 'neutral';
                if (w22 === selectedParty && w24 === selectedParty) {
                  catLabel = language === 'pa' ? 'ਦੋਵੇਂ ਜਿੱਤੇ' : 'Won Both';
                  catClass = 'won';
                } else if (w22 !== selectedParty && w24 === selectedParty) {
                  catLabel = language === 'pa' ? '2024 ’ਚ ਜਿੱਤਿਆ' : 'Gained in ’24';
                  catClass = 'gained';
                } else if (w22 === selectedParty && w24 !== selectedParty) {
                  catLabel = language === 'pa' ? `${w24} ਤੋਂ ਹਾਰਿਆ` : `Lost to ${w24}`;
                  catClass = 'lost';
                }

                if (pct24 < 20.0 && b.data_2024.total > 0) {
                  catLabel = language === 'pa' ? 'ਕਮਜ਼ੋਰ (<20%)' : 'Weak (<20%)';
                  catClass = 'weak';
                }

                return (
                  <tr 
                    key={b.booth_no}
                    onClick={() => onSelectBooth(b)}
                    title={`Click to inspect Booth #${b.booth_no}`}
                  >
                    <td style={{ textAlign: 'center' }}>
                      {renderTableBoothBadge(b)}
                    </td>

                    <td>
                      {language === 'pa' ? (
                        <>
                          <div className="village-pa punjabi-font" style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                            {b.village_punjabi || b.exact_name_punjabi}
                          </div>
                          <div className="village-en" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {b.village_english}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="village-en">{b.village_english}</div>
                          <div className="village-pa punjabi-font">{b.village_punjabi || b.exact_name_punjabi}</div>
                        </>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v17}</strong>
                      {b.data_2017 && b.data_2017[`${pKey}_pct`] !== undefined && (
                        <span className="pct-sub">({b.data_2017[`${pKey}_pct`]}%)</span>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v19}</strong>
                      {b.data_2019 && b.data_2019[`${pKey}_pct`] !== undefined && (
                        <span className="pct-sub">({b.data_2019[`${pKey}_pct`]}%)</span>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v22}</strong>
                      <span className="pct-sub">({pct22}%)</span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <strong>{v24}</strong>
                      <span className="pct-sub">({pct24}%)</span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <span className={`diff-pill ${partyDiff >= 0 ? 'gain' : 'loss'}`}>
                        {partyDiff >= 0 ? `+${partyDiff}` : partyDiff}
                      </span>
                      <span className="pct-sub" style={{ display: 'block', fontSize: '0.6875rem' }}>
                        {swing >= 0 ? `+${swing}%` : `${swing}%`}
                      </span>
                    </td>

                    <td>
                      <span className={`mini-winner ${w24}`}>{w24}</span>
                    </td>

                    <td>
                      <span className={`cat-pill ${catClass}`}>{catLabel}</span>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <button
                          className="btn-table-pdf"
                          title={`Export Booth #${b.booth_no} as PDF`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onExportBoothPdf(b);
                          }}
                        >
                          <Printer size={12} />
                          <span>PDF</span>
                        </button>
                        <button
                          className="btn-table-view"
                          title={`Inspect Booth #${b.booth_no}`}
                          onClick={() => onSelectBooth(b)}
                        >
                          <span>{t('inspect', language)}</span>
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* View Mode: Card Grid */
        <div className="grid-cards-layout">
          {booths.map((b) => {
            const w17 = b.data_2017 ? b.data_2017.winner_party : 'N/A';
            const w19 = b.data_2019 ? b.data_2019.winner_party : 'N/A';
            const w22 = b.data_2022.winner_party;
            const w24 = b.data_2024.winner_party;
            const diff = b.comparison.turnout_diff;

            if (isAllMode) {
              return (
                <div 
                  key={b.booth_no} 
                  className="booth-card"
                  onClick={() => onSelectBooth(b)}
                >
                  <div className="card-top-row">
                    {renderBoothBadge(b)}
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {b.established_in && (
                        <span className="badge-new-booth" style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: '#3b82f6', color: '#fff', fontWeight: 600 }}>
                          Est. {b.established_in}
                        </span>
                      )}
                      <span className={`cat-pill ${b.comparison.is_flip ? 'lost' : 'won'}`}>
                        {b.comparison.status_label}
                      </span>
                    </div>
                  </div>

                  {language === 'pa' ? (
                    <>
                      <div className="card-village-punjabi punjabi-font" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                        {b.village_punjabi || b.exact_name_punjabi}
                      </div>
                      <div className="card-village-name" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {b.village_english}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="card-village-name">{b.village_english}</div>
                      <div className="card-village-punjabi punjabi-font">{b.village_punjabi || b.exact_name_punjabi}</div>
                    </>
                  )}

                  <div className="card-stats-box 4-year-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center', background: 'var(--bg-card-alt, rgba(255,255,255,0.03))', padding: '8px 4px', borderRadius: '6px', margin: '8px 0' }}>
                    <div className="card-stat-col">
                      <span className="card-stat-label" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>'17 VS</span>
                      {b.data_2017 ? (
                        <>
                          <span className={`mini-winner ${w17}`} style={{ marginTop: '2px', fontSize: '0.72rem', display: 'inline-block' }}>{w17}</span>
                          <span className="pct-sub" style={{ fontSize: '0.65rem', display: 'block', margin: '2px 0 0 0' }}>{b.data_2017.total}</span>
                        </>
                      ) : (
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>-</span>
                      )}
                    </div>
                    <div className="card-stat-col">
                      <span className="card-stat-label" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>'19 LS</span>
                      {b.data_2019 ? (
                        <>
                          <span className={`mini-winner ${w19}`} style={{ marginTop: '2px', fontSize: '0.72rem', display: 'inline-block' }}>{w19}</span>
                          <span className="pct-sub" style={{ fontSize: '0.65rem', display: 'block', margin: '2px 0 0 0' }}>{b.data_2019.total}</span>
                        </>
                      ) : (
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>-</span>
                      )}
                    </div>
                    <div className="card-stat-col">
                      <span className="card-stat-label" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>'22 VS</span>
                      <span className={`mini-winner ${w22}`} style={{ marginTop: '2px', fontSize: '0.72rem', display: 'inline-block' }}>{w22}</span>
                      <span className="pct-sub" style={{ fontSize: '0.65rem', display: 'block', margin: '2px 0 0 0' }}>{b.data_2022.total}</span>
                    </div>
                    <div className="card-stat-col">
                      <span className="card-stat-label" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>'24 LS</span>
                      <span className={`mini-winner ${w24}`} style={{ marginTop: '2px', fontSize: '0.72rem', display: 'inline-block' }}>{w24}</span>
                      <span className="pct-sub" style={{ fontSize: '0.65rem', display: 'block', margin: '2px 0 0 0' }}>{b.data_2024.total}</span>
                    </div>
                  </div>

                  {b.trajectory_4yr && (
                    <div style={{ fontSize: '0.68rem', padding: '3px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', textAlign: 'center', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                      <strong>{language === 'pa' ? 'ਸਫ਼ਰ:' : '4-Yr:'}</strong> {b.trajectory_4yr}
                    </div>
                  )}

                  <div className="card-footer-row">
                    <div>
                      <span className="footer-label">{language === 'pa' ? 'ਵੋਟਿੰਗ ਫ਼ਰਕ: ' : 'Turnout: '}</span>
                      <span className={`diff-pill ${diff >= 0 ? 'gain' : 'loss'}`}>
                        {diff >= 0 ? `+${diff}` : diff}
                      </span>
                    </div>
                    <button
                      className="btn-card-pdf"
                      title={`Export Booth #${b.booth_no} as PDF`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onExportBoothPdf(b);
                      }}
                    >
                      <Printer size={12} />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              );
            }

            // Party-Specific Card
            const v17 = b.data_2017 ? (b.data_2017[pKey] || 0) : null;
            const pct17 = b.data_2017 ? (b.data_2017[`${pKey}_pct`] || 0) : null;
            const v19 = b.data_2019 ? (b.data_2019[pKey] || 0) : null;
            const pct19 = b.data_2019 ? (b.data_2019[`${pKey}_pct`] || 0) : null;
            const v22 = b.data_2022[pKey] || 0;
            const pct22 = b.data_2022[`${pKey}_pct`] || 0;
            const v24 = b.data_2024[pKey] || 0;
            const pct24 = b.data_2024[`${pKey}_pct`] || 0;
            const partyDiff = v24 - v22;

            let catLabel = language === 'pa' ? 'ਦੋਵੇਂ ਹਾਰੇ' : 'Lost Both';
            let catClass = 'neutral';
            if (w22 === selectedParty && w24 === selectedParty) {
              catLabel = language === 'pa' ? 'ਦੋਵੇਂ ਜਿੱਤੇ' : 'Won Both';
              catClass = 'won';
            } else if (w22 !== selectedParty && w24 === selectedParty) {
              catLabel = language === 'pa' ? '2024 ’ਚ ਜਿੱਤਿਆ' : 'Gained in ’24';
              catClass = 'gained';
            } else if (w22 === selectedParty && w24 !== selectedParty) {
              catLabel = language === 'pa' ? `${w24} ਤੋਂ ਹਾਰਿਆ` : `Lost to ${w24}`;
              catClass = 'lost';
            }

            if (pct24 < 20.0 && b.data_2024.total > 0) {
              catLabel = language === 'pa' ? 'ਕਮਜ਼ੋਰ (<20%)' : 'Weak (<20%)';
              catClass = 'weak';
            }

            return (
              <div 
                key={b.booth_no} 
                className="booth-card"
                onClick={() => onSelectBooth(b)}
              >
                <div className="card-top-row">
                  {renderBoothBadge(b)}
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {b.established_in && (
                      <span className="badge-new-booth" style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: '#3b82f6', color: '#fff', fontWeight: 600 }}>
                        Est. {b.established_in}
                      </span>
                    )}
                    <span className={`cat-pill ${catClass}`}>{catLabel}</span>
                  </div>
                </div>

                {language === 'pa' ? (
                  <>
                    <div className="card-village-punjabi punjabi-font" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                      {b.village_punjabi || b.exact_name_punjabi}
                    </div>
                    <div className="card-village-name" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {b.village_english}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-village-name">{b.village_english}</div>
                    <div className="card-village-punjabi punjabi-font">{b.village_punjabi || b.exact_name_punjabi}</div>
                  </>
                )}

                <div className="card-stats-box 4-year-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', textAlign: 'center', background: 'var(--bg-card-alt, rgba(255,255,255,0.03))', padding: '8px 4px', borderRadius: '6px', margin: '8px 0' }}>
                  <div className="card-stat-col">
                    <span className="card-stat-label" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>'17 VS</span>
                    {v17 !== null ? (
                      <>
                        <strong style={{ fontSize: '0.78rem', display: 'block' }}>{v17}</strong>
                        <span className="pct-sub" style={{ fontSize: '0.65rem' }}>{pct17}%</span>
                        <span className={`mini-winner ${w17}`} style={{ marginTop: '2px', fontSize: '0.68rem', display: 'inline-block' }}>{w17}</span>
                      </>
                    ) : (
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>-</span>
                    )}
                  </div>

                  <div className="card-stat-col">
                    <span className="card-stat-label" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>'19 LS</span>
                    {v19 !== null ? (
                      <>
                        <strong style={{ fontSize: '0.78rem', display: 'block' }}>{v19}</strong>
                        <span className="pct-sub" style={{ fontSize: '0.65rem' }}>{pct19}%</span>
                        <span className={`mini-winner ${w19}`} style={{ marginTop: '2px', fontSize: '0.68rem', display: 'inline-block' }}>{w19}</span>
                      </>
                    ) : (
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>-</span>
                    )}
                  </div>

                  <div className="card-stat-col">
                    <span className="card-stat-label" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>'22 VS</span>
                    <strong style={{ fontSize: '0.78rem', display: 'block' }}>{v22}</strong>
                    <span className="pct-sub" style={{ fontSize: '0.65rem' }}>{pct22}%</span>
                    <span className={`mini-winner ${w22}`} style={{ marginTop: '2px', fontSize: '0.68rem', display: 'inline-block' }}>{w22}</span>
                  </div>

                  <div className="card-stat-col">
                    <span className="card-stat-label" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>'24 LS</span>
                    <strong style={{ fontSize: '0.78rem', display: 'block' }}>{v24}</strong>
                    <span className="pct-sub" style={{ fontSize: '0.65rem' }}>{pct24}%</span>
                    <span className={`mini-winner ${w24}`} style={{ marginTop: '2px', fontSize: '0.68rem', display: 'inline-block' }}>{w24}</span>
                  </div>
                </div>

                <div className="card-footer-row">
                  <div>
                    <span className="footer-label">{language === 'pa' ? 'ਫ਼ਰਕ: ' : 'Shift: '}</span>
                    <span className={`diff-pill ${partyDiff >= 0 ? 'gain' : 'loss'}`}>
                      {partyDiff >= 0 ? `+${partyDiff}` : partyDiff}
                    </span>
                  </div>
                  <button
                    className="btn-card-pdf"
                    title={`Export Booth #${b.booth_no} as PDF`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportBoothPdf(b);
                    }}
                  >
                    <Printer size={12} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
