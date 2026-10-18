import React from 'react';
import { X, Printer, Target, Download, FileText } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function BoothModal({ booth, onClose, constituencyId, language }) {
  if (!booth) return null;

  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.RAJA_SANSI;
  const cand = currentConst.candidates;

  const d17 = booth.data_2017;
  const d19 = booth.data_2019;
  const d22 = booth.data_2022;
  const d24 = booth.data_2024;
  const comp = booth.comparison || {
    status_label: booth.status_label,
    is_flip: booth.is_flip,
    turnout_diff: booth.turnout_diff,
    turnout_pct: booth.turnout_pct,
    inc_swing: booth.swings?.inc_swing,
    aap_swing: booth.swings?.aap_swing,
    sad_swing: booth.swings?.sad_swing,
    bjp_swing: booth.swings?.bjp_swing
  };

  // Safe percentage helper
  const getWidth = (votes, total) => {
    if (!total || total === 0) return '0%';
    return `${Math.min(100, Math.round((votes / total) * 100))}%`;
  };

  const handlePrintBooth = (e) => {
    e.stopPropagation();
    document.body.classList.add('printing-single-booth');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-single-booth');
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Dsidein Official PDF Watermark */}
        <div className="dsidein-print-watermark" aria-hidden="true">
          <img src="./dsidein_logo_transparent.png" alt="Dsidein" className="watermark-logo-img" />
          <div className="watermark-brand-name">DSIDEIN</div>
          <div className="watermark-sub-name">{currentConst.name_en} BOOTH INTELLIGENCE</div>
          <div className="watermark-url">https://dsidein.com/{constituencyId === 'QADIAN' ? 'qadian' : 'raja-sansi'}-2022-2024</div>
        </div>

        {/* Printable Official Banner */}
        <div className="print-dossier-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="print-dossier-title">
                {currentConst.name_en} ASSEMBLY SEGMENT — BOOTH DOSSIER
              </div>
              <div className="print-dossier-sub">
                Election Commission Data: 2022 Assembly vs 2024 Parliamentary Analysis ({currentConst.district_en})
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#334155' }}>
              <span style={{ fontWeight: 800, color: '#002b49' }}>DSIDEIN COMMAND CENTER</span><br />
              <span>https://dsidein.com/{constituencyId === 'QADIAN' ? 'qadian' : 'raja-sansi'}-2022-2024</span>
            </div>
          </div>
        </div>

        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div className="modal-badges-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {booth.is_rearranged || (booth.booth_no_2022 && booth.booth_no_2024 && booth.booth_no_2022 !== booth.booth_no_2024) ? (
                <span className="brand-badge rearranged">
                  {language === 'pa' 
                    ? `2022: ਬੂਥ #${booth.booth_no_2022} ➔ 2024: ਬੂਥ #${booth.booth_no_2024}` 
                    : `2022: Booth #${booth.booth_no_2022} ➔ 2024: Booth #${booth.booth_no_2024}`}
                </span>
              ) : (
                <span className="brand-badge">
                  {language === 'pa' 
                    ? `ਬੂਥ #${booth.booth_no} (2022 & 2024)` 
                    : `Booth #${booth.booth_no} (2022 & 2024)`}
                </span>
              )}
              <span className={`status-badge ${comp.is_flip ? 'flipped' : 'retained'}`}>
                {comp.status_label}
              </span>
              <span className="station-match-badge">
                {language === 'pa' ? 'ਸਟੇਸ਼ਨ ਨਾਮ: 100% ਮੇਲ' : 'Station: 100% Match'}
              </span>
            </div>
            
            {language === 'pa' ? (
              <>
                <h2 className="modal-village-title punjabi-font" style={{ fontSize: '1.25rem', marginTop: '4px' }}>
                  {booth.village_punjabi || booth.exact_name_punjabi}
                </h2>
                <p className="modal-village-sub" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {booth.village_english}
                </p>
              </>
            ) : (
              <>
                <h2 className="modal-village-title">{booth.village_english}</h2>
                <p className="modal-village-sub punjabi-text">
                  {booth.village_punjabi || booth.exact_name_punjabi}
                </p>
              </>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="btn-print-modal no-print" 
              onClick={handlePrintBooth}
              title={language === 'pa' ? 'ਇਸ ਬੂਥ ਦਸਤਾਵੇਜ਼ ਨੂੰ ਪੀ.ਡੀ.ਐਫ ਵਜੋਂ ਪ੍ਰਿੰਟ / ਸੇਵ ਕਰੋ' : 'Export / Print this Booth Dossier as PDF'}
            >
              <Printer size={15} />
              <span>{t('print_pdf', language)}</span>
            </button>
            <button 
              className="modal-close-btn no-print" 
              onClick={onClose}
              aria-label={t('close', language)}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 4-Election Trajectory Banner */}
        {booth.trend_4year && (
          <div className="modal-trajectory-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {language === 'pa' ? '4-ਚੋਣ ਇਤਿਹਾਸਕ ਸਫ਼ਰ:' : '4-Election Trajectory:'}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.01em' }}>
              {booth.trend_4year}
            </span>
          </div>
        )}

        {/* Modal Body: Multi-Year Comparison Grid */}
        <div className={d17 || d19 ? 'modal-grid-4' : 'modal-grid'}>
          {/* 2017 Vidhan Sabha Column */}
          {d17 ? (
            <div className="year-card">
              <div className="year-title">{language === 'pa' ? '2017 ਵਿਧਾਨ ਸਭਾ' : '2017 Vidhan Sabha'}</div>
              <div className="modal-station-sub">
                {language === 'pa' ? 'ਸਟੇਸ਼ਨ: ' : 'Station: '}
                <strong>{booth.village_english}</strong>
                <span style={{ marginLeft: '4px', color: 'var(--text-muted)' }}>(#{booth.booth_no})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className={`badge-winner ${d17.winner_party}`}>
                  {d17.winner_party} {t('won_by', language)}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  +{d17.margin} {t('lead', language)}
                </span>
              </div>

              {/* INC Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{cand['2017'] ? (language === 'pa' ? cand['2017'].INC.short_pa : cand['2017'].INC.short_en) : 'INC (Sarkaria)'}</span>
                  <span><strong>{d17.inc}</strong> ({d17.inc_pct}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(d17.inc, d17.total), background: '#0F766E' }} />
                </div>
              </div>

              {/* SAD Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{cand['2017'] ? (language === 'pa' ? cand['2017'].SAD.short_pa : cand['2017'].SAD.short_en) : 'SAD (Lopoke)'}</span>
                  <span><strong>{d17.sad}</strong> ({d17.sad_pct}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(d17.sad, d17.total), background: '#EA580C' }} />
                </div>
              </div>

              {/* AAP Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{cand['2017'] ? (language === 'pa' ? cand['2017'].AAP.short_pa : cand['2017'].AAP.short_en) : 'AAP (Dhillon)'}</span>
                  <span><strong>{d17.aap}</strong> ({d17.aap_pct}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(d17.aap, d17.total), background: '#B28900' }} />
                </div>
              </div>

              {/* BSP Bar */}
              {d17.bsp > 0 && (
                <div className="vote-bar-wrap">
                  <div className="vote-bar-label">
                    <span>BSP (Lakhbir)</span>
                    <span><strong>{d17.bsp}</strong> ({d17.bsp_pct}%)</span>
                  </div>
                  <div className="vote-bar-track">
                    <div className="vote-bar-fill" style={{ width: getWidth(d17.bsp, d17.total), background: '#2563EB' }} />
                  </div>
                </div>
              )}

              {/* Total 2017 */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('total_polled', language)}:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{d17.total}</strong>
              </div>
            </div>
          ) : (d19 ? (
            <div className="year-card not-established" style={{ opacity: 0.7, background: 'var(--bg-surface-elevated)' }}>
              <div className="year-title">{language === 'pa' ? '2017 ਵਿਧਾਨ ਸਭਾ' : '2017 Vidhan Sabha'}</div>
              <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                {language === 'pa' 
                  ? `ਬੂਥ #${booth.booth_no} 2017 ਵਿੱਚ ਮੌਜੂਦ ਨਹੀਂ ਸੀ (ਕੁੱਲ 209 ਬੂਥ ਸਨ)` 
                  : `Booth #${booth.booth_no} was not yet established in 2017 (209 total booths)`}
              </div>
            </div>
          ) : null)}

          {/* 2019 Lok Sabha Column */}
          {d19 ? (
            <div className="year-card">
              <div className="year-title">{language === 'pa' ? '2019 ਲੋਕ ਸਭਾ' : '2019 Lok Sabha'}</div>
              <div className="modal-station-sub">
                {language === 'pa' ? 'ਸਟੇਸ਼ਨ: ' : 'Station: '}
                <strong>{booth.village_english}</strong>
                <span style={{ marginLeft: '4px', color: 'var(--text-muted)' }}>(#{booth.booth_no})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className={`badge-winner ${d19.winner_party}`}>
                  {d19.winner_party} {t('won_by', language)}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  +{d19.margin} {t('lead', language)}
                </span>
              </div>

              {/* INC Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{cand['2019'] ? (language === 'pa' ? cand['2019'].INC.short_pa : cand['2019'].INC.short_en) : 'INC (Aujla)'}</span>
                  <span><strong>{d19.inc}</strong> ({d19.inc_pct}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(d19.inc, d19.total), background: '#0F766E' }} />
                </div>
              </div>

              {/* BJP/NDA Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{cand['2019'] ? (language === 'pa' ? cand['2019'].BJP.short_pa : cand['2019'].BJP.short_en) : 'BJP/NDA (Puri)'}</span>
                  <span><strong>{d19.bjp}</strong> ({d19.bjp_pct}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(d19.bjp, d19.total), background: '#D97706' }} />
                </div>
              </div>

              {/* AAP Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{cand['2019'] ? (language === 'pa' ? cand['2019'].AAP.short_pa : cand['2019'].AAP.short_en) : 'AAP (Dhaliwal)'}</span>
                  <span><strong>{d19.aap}</strong> ({d19.aap_pct}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(d19.aap, d19.total), background: '#B28900' }} />
                </div>
              </div>

              {/* Total 2019 */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{t('total_polled', language)}:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{d19.total}</strong>
              </div>
            </div>
          ) : (d17 ? (
            <div className="year-card not-established" style={{ opacity: 0.7, background: 'var(--bg-surface-elevated)' }}>
              <div className="year-title">{language === 'pa' ? '2019 ਲੋਕ ਸਭਾ' : '2019 Lok Sabha'}</div>
              <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                {language === 'pa' 
                  ? `ਬੂਥ #${booth.booth_no} 2019 ਵਿੱਚ ਮੌਜੂਦ ਨਹੀਂ ਸੀ` 
                  : `Booth #${booth.booth_no} was established in 2022 (Expansion)`}
              </div>
            </div>
          ) : null)}

          {/* 2022 Assembly Column */}
          <div className="year-card">
            <div className="year-title">{language === 'pa' ? '2022 ਵਿਧਾਨ ਸਭਾ' : '2022 Vidhan Sabha'}</div>
            <div className="modal-station-sub">
              {language === 'pa' ? 'ਸਟੇਸ਼ਨ: ' : 'Station: '}
              <strong>{booth.booth_name_2022 || booth.village_english}</strong>
              <span style={{ marginLeft: '4px', color: 'var(--text-muted)' }}>(#{booth.booth_no_2022 || booth.booth_no})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span className={`badge-winner ${d22.winner_party}`}>
                {d22.winner_party} {t('won_by', language)}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                +{d22.margin} {t('lead', language)}
              </span>
            </div>

            {/* INC Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{language === 'pa' ? cand['2022'].INC.short_pa : cand['2022'].INC.short_en}</span>
                <span><strong>{d22.inc}</strong> ({d22.inc_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.inc, d22.total), background: '#0F766E' }} />
              </div>
            </div>

            {/* AAP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{language === 'pa' ? cand['2022'].AAP.short_pa : cand['2022'].AAP.short_en}</span>
                <span><strong>{d22.aap}</strong> ({d22.aap_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.aap, d22.total), background: '#B28900' }} />
              </div>
            </div>

            {/* SAD Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{language === 'pa' ? cand['2022'].SAD.short_pa : cand['2022'].SAD.short_en}</span>
                <span><strong>{d22.sad}</strong> ({d22.sad_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d22.sad, d22.total), background: '#EA580C' }} />
              </div>
            </div>

            {/* BJP Bar */}
            {d22.bjp !== undefined && (
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{language === 'pa' ? cand['2022'].BJP.short_pa : cand['2022'].BJP.short_en}</span>
                  <span><strong>{d22.bjp}</strong> ({d22.bjp_pct}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(d22.bjp, d22.total), background: '#D97706' }} />
                </div>
              </div>
            )}

            {/* Total 2022 */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('total_polled', language)}:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{d22.total}</strong>
            </div>
          </div>

          {/* 2024 Lok Sabha Column */}
          <div className="year-card">
            <div className="year-title">{language === 'pa' ? '2024 ਲੋਕ ਸਭਾ' : '2024 Lok Sabha'}</div>
            <div className="modal-station-sub">
              {language === 'pa' ? 'ਸਟੇਸ਼ਨ: ' : 'Station: '}
              <strong>{booth.booth_name_2024 || booth.village_english}</strong>
              <span style={{ marginLeft: '4px', color: 'var(--text-muted)' }}>(#{booth.booth_no_2024 || booth.booth_no})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span className={`badge-winner ${d24.winner_party}`}>
                {d24.winner_party} {t('won_by', language)}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                +{d24.margin} {t('lead', language)}
              </span>
            </div>

            {/* INC Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{language === 'pa' ? cand['2024'].INC.short_pa : cand['2024'].INC.short_en}</span>
                <span><strong>{d24.inc}</strong> ({d24.inc_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.inc, d24.total), background: '#0F766E' }} />
              </div>
            </div>

            {/* AAP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{language === 'pa' ? cand['2024'].AAP.short_pa : cand['2024'].AAP.short_en}</span>
                <span><strong>{d24.aap}</strong> ({d24.aap_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.aap, d24.total), background: '#B28900' }} />
              </div>
            </div>

            {/* SAD Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{language === 'pa' ? cand['2024'].SAD.short_pa : cand['2024'].SAD.short_en}</span>
                <span><strong>{d24.sad}</strong> ({d24.sad_pct}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.sad, d24.total), background: '#EA580C' }} />
              </div>
            </div>

            {/* BJP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{language === 'pa' ? cand['2024'].BJP.short_pa : cand['2024'].BJP.short_en}</span>
                <span><strong>{d24.bjp || 0}</strong> ({d24.bjp_pct || 0}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(d24.bjp || 0, d24.total), background: '#D97706' }} />
              </div>
            </div>

            {/* Total 2024 */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('total_polled', language)}:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{d24.total}</strong>
            </div>
          </div>
        </div>

        {/* Comparative Vote Swings Row */}
        <div className="modal-shift-box" style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            {t('comparative_swings', language)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <div className="shift-metric-tile">
              <span className="shift-label">INC Swing</span>
              <span className={`shift-val ${comp.inc_swing >= 0 ? 'gain' : 'loss'}`}>
                {comp.inc_swing >= 0 ? `+${comp.inc_swing}%` : `${comp.inc_swing}%`}
              </span>
            </div>
            <div className="shift-metric-tile">
              <span className="shift-label">AAP Swing</span>
              <span className={`shift-val ${comp.aap_swing >= 0 ? 'gain' : 'loss'}`}>
                {comp.aap_swing >= 0 ? `+${comp.aap_swing}%` : `${comp.aap_swing}%`}
              </span>
            </div>
            <div className="shift-metric-tile">
              <span className="shift-label">SAD Swing</span>
              <span className={`shift-val ${comp.sad_swing >= 0 ? 'gain' : 'loss'}`}>
                {comp.sad_swing >= 0 ? `+${comp.sad_swing}%` : `${comp.sad_swing}%`}
              </span>
            </div>
            <div className="shift-metric-tile">
              <span className="shift-label">BJP Swing</span>
              <span className={`shift-val ${comp.bjp_swing >= 0 ? 'gain' : 'loss'}`}>
                {comp.bjp_swing !== undefined ? (comp.bjp_swing >= 0 ? `+${comp.bjp_swing}%` : `${comp.bjp_swing}%`) : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
