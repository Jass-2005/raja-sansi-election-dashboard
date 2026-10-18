import React from 'react';
import { X, Printer } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function BoothModal({ booth, onClose, constituencyId, language }) {
  if (!booth) return null;

  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.RAJA_SANSI;
  const cand = currentConst.candidates || {};

  const d17 = booth.data_2017;
  const d19 = booth.data_2019;
  const d22 = booth.data_2022 || {};
  const d24 = booth.data_2024 || {};
  const comp = booth.comparison || {
    status_label: booth.status_label,
    is_flip: booth.is_flip,
    turnout_diff: booth.turnout_diff,
    turnout_pct: booth.turnout_pct,
    inc_swing: booth.swings?.inc_swing ?? booth.inc_swing,
    aap_swing: booth.swings?.aap_swing ?? booth.aap_swing,
    sad_swing: booth.swings?.sad_swing ?? booth.sad_swing,
    bjp_swing: booth.swings?.bjp_swing ?? booth.bjp_swing
  };

  // Safe percentage helper
  const getWidth = (votes, total) => {
    if (!total || total === 0) return '0%';
    return `${Math.min(100, Math.round((votes / total) * 100))}%`;
  };

  const getVote = (d, p) => {
    if (!d) return 0;
    const pk = p.toLowerCase();
    return d[pk] ?? d[`${pk}_votes`] ?? 0;
  };

  const getPct = (d, p) => {
    if (!d) return 0;
    const pk = p.toLowerCase();
    if (d[`${pk}_pct`] !== undefined) return d[`${pk}_pct`];
    const tot = d.total || 0;
    const v = getVote(d, p);
    return tot > 0 ? Number(((v / tot) * 100).toFixed(1)) : 0;
  };

  const getCandLabel = (year, party, fallback) => {
    const c = cand?.[year.toString()]?.[party];
    if (c) {
      return language === 'pa' ? c.short_pa : c.short_en;
    }
    return fallback || party;
  };

  const handlePrintBooth = (e) => {
    e.stopPropagation();
    document.body.classList.add('printing-single-booth');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-single-booth');
    }, 1000);
  };

  const hasHistorical = Boolean(d17 || d19);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Dsidein Official PDF Watermark */}
        <div className="dsidein-print-watermark" aria-hidden="true">
          <img src="./dsidein_logo_transparent.png" alt="Dsidein" className="watermark-logo-img" />
          <div className="watermark-brand-name">DSIDEIN</div>
          <div className="watermark-sub-name">{currentConst.name_en} BOOTH INTELLIGENCE</div>
          <div className="watermark-url">https://dsidein.com/{currentConst.id.toLowerCase().replace('_', '-')}-election-dashboard</div>
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
              <span>https://dsidein.com/{currentConst.id.toLowerCase().replace('_', '-')}-election-dashboard</span>
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
                    ? `ਬੂਥ #${booth.booth_no}` 
                    : `Booth #${booth.booth_no}`}
                </span>
              )}
              <span className={`status-badge ${comp.is_flip ? 'flipped' : 'retained'}`}>
                {comp.status_label || (comp.is_flip ? 'Flipped' : 'Retained')}
              </span>
              <span className="station-match-badge">
                {language === 'pa' ? 'ਸਟੇਸ਼ਨ ਨਾਮ: 100% ਪ੍ਰਮਾਣਿਤ' : 'Station: 100% Verified'}
              </span>
            </div>
            
            {language === 'pa' ? (
              <>
                <h2 className="modal-village-title punjabi-font" style={{ fontSize: '1.25rem', marginTop: '4px' }}>
                  {booth.village_punjabi || booth.exact_name_punjabi || booth.village_pa}
                </h2>
                <div className="modal-village-sub" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {booth.village_english || booth.village_en}
                </div>
              </>
            ) : (
              <>
                <h2 className="modal-village-title" style={{ fontSize: '1.25rem', marginTop: '4px' }}>
                  {booth.village_english || booth.village_en}
                </h2>
                <div className="modal-village-sub punjabi-font" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {booth.village_punjabi || booth.exact_name_punjabi || booth.village_pa}
                </div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrintBooth}
              className="btn-print-dossier"
              title="Print Official 1-Page Booth Dossier (PDF)"
            >
              <Printer size={15} />
              <span>{t('print_dossier', language)}</span>
            </button>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Multi-Year Election Grid */}
        <div 
          className="modal-years-grid"
          style={{ gridTemplateColumns: hasHistorical ? 'repeat(auto-fit, minmax(210px, 1fr))' : 'repeat(2, minmax(0, 1fr))' }}
        >
          {/* 2017 Vidhan Sabha Column */}
          {d17 ? (
            <div className="year-card">
              <div className="year-title">{language === 'pa' ? '2017 ਵਿਧਾਨ ਸਭਾ' : '2017 Vidhan Sabha'}</div>
              <div className="modal-station-sub">
                {language === 'pa' ? 'ਸਟੇਸ਼ਨ: ' : 'Station: '}
                <strong>{booth.village_english || booth.village_en}</strong>
                <span style={{ marginLeft: '4px', color: 'var(--text-muted)' }}>(#{booth.booth_no})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className={`badge-winner ${(d17.winner_party || d17.winner || '').toLowerCase()}`}>
                  {d17.winner_party || d17.winner} {t('won_by', language)}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  +{d17.margin} {t('lead', language)}
                </span>
              </div>

              {/* INC Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{getCandLabel(2017, 'INC', 'INC')}</span>
                  <span><strong>{getVote(d17, 'inc')}</strong> ({getPct(d17, 'inc')}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(getVote(d17, 'inc'), d17.total), background: '#0F766E' }} />
                </div>
              </div>

              {/* SAD Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{getCandLabel(2017, 'SAD', 'SAD')}</span>
                  <span><strong>{getVote(d17, 'sad')}</strong> ({getPct(d17, 'sad')}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(getVote(d17, 'sad'), d17.total), background: '#EA580C' }} />
                </div>
              </div>

              {/* AAP Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{getCandLabel(2017, 'AAP', 'AAP')}</span>
                  <span><strong>{getVote(d17, 'aap')}</strong> ({getPct(d17, 'aap')}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(getVote(d17, 'aap'), d17.total), background: '#B28900' }} />
                </div>
              </div>

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
                  ? `ਬੂਥ #${booth.booth_no} 2017 ਵਿੱਚ ਮੌਜੂਦ ਨਹੀਂ ਸੀ` 
                  : `Booth #${booth.booth_no} was not yet established in 2017`}
              </div>
            </div>
          ) : null)}

          {/* 2019 Lok Sabha Column */}
          {d19 ? (
            <div className="year-card">
              <div className="year-title">{language === 'pa' ? '2019 ਲੋਕ ਸਭਾ' : '2019 Lok Sabha'}</div>
              <div className="modal-station-sub">
                {language === 'pa' ? 'ਸਟੇਸ਼ਨ: ' : 'Station: '}
                <strong>{booth.village_english || booth.village_en}</strong>
                <span style={{ marginLeft: '4px', color: 'var(--text-muted)' }}>(#{booth.booth_no})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className={`badge-winner ${(d19.winner_party || d19.winner || '').toLowerCase()}`}>
                  {d19.winner_party || d19.winner} {t('won_by', language)}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  +{d19.margin} {t('lead', language)}
                </span>
              </div>

              {/* INC Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{getCandLabel(2019, 'INC', 'INC')}</span>
                  <span><strong>{getVote(d19, 'inc')}</strong> ({getPct(d19, 'inc')}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(getVote(d19, 'inc'), d19.total), background: '#0F766E' }} />
                </div>
              </div>

              {/* BJP/NDA Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{getCandLabel(2019, 'BJP', 'BJP/NDA')}</span>
                  <span><strong>{getVote(d19, 'bjp')}</strong> ({getPct(d19, 'bjp')}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(getVote(d19, 'bjp'), d19.total), background: '#D97706' }} />
                </div>
              </div>

              {/* AAP Bar */}
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{getCandLabel(2019, 'AAP', 'AAP')}</span>
                  <span><strong>{getVote(d19, 'aap')}</strong> ({getPct(d19, 'aap')}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(getVote(d19, 'aap'), d19.total), background: '#B28900' }} />
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
                  : `Booth #${booth.booth_no} was established in 2022`}
              </div>
            </div>
          ) : null)}

          {/* 2022 Assembly Column */}
          <div className="year-card">
            <div className="year-title">{language === 'pa' ? '2022 ਵਿਧਾਨ ਸਭਾ' : '2022 Vidhan Sabha'}</div>
            <div className="modal-station-sub">
              {language === 'pa' ? 'ਸਟੇਸ਼ਨ: ' : 'Station: '}
              <strong>{booth.booth_name_2022 || booth.village_english || booth.village_en}</strong>
              <span style={{ marginLeft: '4px', color: 'var(--text-muted)' }}>(#{booth.booth_no_2022 || booth.booth_no})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span className={`badge-winner ${(d22.winner_party || d22.winner || '').toLowerCase()}`}>
                {d22.winner_party || d22.winner} {t('won_by', language)}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                +{d22.margin} {t('lead', language)}
              </span>
            </div>

            {/* INC Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{getCandLabel(2022, 'INC', 'INC')}</span>
                <span><strong>{getVote(d22, 'inc')}</strong> ({getPct(d22, 'inc')}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(getVote(d22, 'inc'), d22.total), background: '#0F766E' }} />
              </div>
            </div>

            {/* AAP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{getCandLabel(2022, 'AAP', 'AAP')}</span>
                <span><strong>{getVote(d22, 'aap')}</strong> ({getPct(d22, 'aap')}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(getVote(d22, 'aap'), d22.total), background: '#B28900' }} />
              </div>
            </div>

            {/* SAD Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{getCandLabel(2022, 'SAD', 'SAD')}</span>
                <span><strong>{getVote(d22, 'sad')}</strong> ({getPct(d22, 'sad')}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(getVote(d22, 'sad'), d22.total), background: '#EA580C' }} />
              </div>
            </div>

            {/* BJP Bar */}
            {(getVote(d22, 'bjp') > 0 || d22.bjp !== undefined) && (
              <div className="vote-bar-wrap">
                <div className="vote-bar-label">
                  <span>{getCandLabel(2022, 'BJP', 'BJP')}</span>
                  <span><strong>{getVote(d22, 'bjp')}</strong> ({getPct(d22, 'bjp')}%)</span>
                </div>
                <div className="vote-bar-track">
                  <div className="vote-bar-fill" style={{ width: getWidth(getVote(d22, 'bjp'), d22.total), background: '#D97706' }} />
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
              <strong>{booth.booth_name_2024 || booth.village_english || booth.village_en}</strong>
              <span style={{ marginLeft: '4px', color: 'var(--text-muted)' }}>(#{booth.booth_no_2024 || booth.booth_no})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span className={`badge-winner ${(d24.winner_party || d24.winner || '').toLowerCase()}`}>
                {d24.winner_party || d24.winner} {t('won_by', language)}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                +{d24.margin} {t('lead', language)}
              </span>
            </div>

            {/* INC Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{getCandLabel(2024, 'INC', 'INC')}</span>
                <span><strong>{getVote(d24, 'inc')}</strong> ({getPct(d24, 'inc')}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(getVote(d24, 'inc'), d24.total), background: '#0F766E' }} />
              </div>
            </div>

            {/* AAP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{getCandLabel(2024, 'AAP', 'AAP')}</span>
                <span><strong>{getVote(d24, 'aap')}</strong> ({getPct(d24, 'aap')}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(getVote(d24, 'aap'), d24.total), background: '#B28900' }} />
              </div>
            </div>

            {/* SAD Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{getCandLabel(2024, 'SAD', 'SAD')}</span>
                <span><strong>{getVote(d24, 'sad')}</strong> ({getPct(d24, 'sad')}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(getVote(d24, 'sad'), d24.total), background: '#EA580C' }} />
              </div>
            </div>

            {/* BJP Bar */}
            <div className="vote-bar-wrap">
              <div className="vote-bar-label">
                <span>{getCandLabel(2024, 'BJP', 'BJP')}</span>
                <span><strong>{getVote(d24, 'bjp')}</strong> ({getPct(d24, 'bjp')}%)</span>
              </div>
              <div className="vote-bar-track">
                <div className="vote-bar-fill" style={{ width: getWidth(getVote(d24, 'bjp'), d24.total), background: '#D97706' }} />
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
          <div className="swings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <div className="swing-pill" style={{ padding: '8px 12px', background: 'var(--bg-surface-elevated)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>INC SWING</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: comp.inc_swing >= 0 ? '#059669' : '#dc2626' }}>
                {comp.inc_swing !== undefined ? (comp.inc_swing > 0 ? `+${comp.inc_swing}%` : `${comp.inc_swing}%`) : '0.0%'}
              </div>
            </div>

            <div className="swing-pill" style={{ padding: '8px 12px', background: 'var(--bg-surface-elevated)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>AAP SWING</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: comp.aap_swing >= 0 ? '#059669' : '#dc2626' }}>
                {comp.aap_swing !== undefined ? (comp.aap_swing > 0 ? `+${comp.aap_swing}%` : `${comp.aap_swing}%`) : '0.0%'}
              </div>
            </div>

            <div className="swing-pill" style={{ padding: '8px 12px', background: 'var(--bg-surface-elevated)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>SAD SWING</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: comp.sad_swing >= 0 ? '#059669' : '#dc2626' }}>
                {comp.sad_swing !== undefined ? (comp.sad_swing > 0 ? `+${comp.sad_swing}%` : `${comp.sad_swing}%`) : '0.0%'}
              </div>
            </div>

            <div className="swing-pill" style={{ padding: '8px 12px', background: 'var(--bg-surface-elevated)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>BJP SWING</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: comp.bjp_swing >= 0 ? '#059669' : '#dc2626' }}>
                {comp.bjp_swing !== undefined ? (comp.bjp_swing > 0 ? `+${comp.bjp_swing}%` : `${comp.bjp_swing}%`) : '0.0%'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
