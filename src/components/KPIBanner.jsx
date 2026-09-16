import React from 'react';
import { Award, Users, CheckCircle2 } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function KPIBanner({ summary, constituencyId, language }) {
  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.RAJA_SANSI;
  const isRajaSansi = constituencyId === 'RAJA_SANSI';

  const diffVotes = summary?.turnout_diff?.toLocaleString() || (isRajaSansi ? '-19,426' : '-12,427');
  const diffPct = summary?.turnout_pct || (isRajaSansi ? -14.58 : -9.46);
  const tot24 = summary?.total_votes_2024?.toLocaleString() || (isRajaSansi ? '113,833' : '118,991');
  const tot22 = summary?.total_votes_2022?.toLocaleString() || (isRajaSansi ? '133,259' : '131,418');

  // Seats breakdown
  const bw22 = summary?.booths_won_2022 || (isRajaSansi ? { INC: 98, SAD: 65, AAP: 58, BJP: 1 } : { INC: 125, AAP: 57, Sekhwan: 41 });
  const bw24 = summary?.booths_won_2024 || (isRajaSansi ? { INC: 112, AAP: 69, SAD: 29, BJP: 11 } : { INC: 111, AAP: 81, BJP: 25, SAD: 5 });

  // Winner highlights
  const winner22 = isRajaSansi 
    ? { en: 'INC (Sarkaria)', pa: 'ਕਾਂਗਰਸ (ਸਰਕਾਰੀਆ)', lead_en: '+5,474 lead over SAD (Lopoke)', lead_pa: 'ਅਕਾਲੀ ਦਲ (ਲੋਪੋਕੇ) ’ਤੇ +5,474 ਦੀ ਲੀਡ' }
    : { en: 'INC (Bajwa)', pa: 'ਕਾਂਗਰਸ (ਬਾਜਵਾ)', lead_en: '+6,991 lead over Sekhwan/AAP', lead_pa: 'ਸੇਖਵਾਂ/ਆਪ ’ਤੇ +6,991 ਦੀ ਲੀਡ' };

  const winner24 = isRajaSansi
    ? { en: 'INC (Aujla)', pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', lead_en: '+4,543 lead over AAP (Dhaliwal)', lead_pa: 'ਆਪ (ਧਾਲੀਵਾਲ) ’ਤੇ +4,543 ਦੀ ਲੀਡ' }
    : { en: 'INC (Randhawa)', pa: 'ਕਾਂਗਰਸ (ਰੰਧਾਵਾ)', lead_en: '+3,152 lead over AAP (Kalsi)', lead_pa: 'ਆਪ (ਕਲਸੀ) ’ਤੇ +3,152 ਦੀ ਲੀਡ' };

  const flippedCount = isRajaSansi ? 119 : 136;
  const dynamicsSub = isRajaSansi
    ? (language === 'pa' ? 'ਅਕਾਲੀ ਦਲ: -36 ਬੂਥ · ਭਾਜਪਾ: +10 ਬੂਥ' : 'SAD: -36 Booths · BJP: +10 Booths')
    : (language === 'pa' ? 'ਅਕਾਲੀ ਦਲ: -36 ਬੂਥ · ਭਾਜਪਾ: +25 ਬੂਥ' : 'SAD: -36 Booths · BJP: +25 Booths');

  const incShift = isRajaSansi 
    ? (language === 'pa' ? 'ਕਾਂਗਰਸ: +14 ਬੂਥ' : 'INC: +14 Booths')
    : (language === 'pa' ? 'ਕਾਂਗਰਸ: -14 ਬੂਥ' : 'INC: -14 Booths');

  const aapShift = isRajaSansi
    ? (language === 'pa' ? 'ਆਪ: +11 ਬੂਥ' : 'AAP: +11 Booths')
    : (language === 'pa' ? 'ਆਪ: +24 ਬੂਥ' : 'AAP: +24 Booths');

  return (
    <section className="kpi-grid" aria-label="Election Highlights and Summary Metrics">
      {/* Total Turnout Shift */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">{t('turnout_shift', language)}</span>
          <Users size={16} className="text-secondary" />
        </div>
        <div className="kpi-value">{tot24}</div>
        <div className="kpi-sub">
          <span style={{ color: 'var(--color-loss)', fontWeight: 700 }}>
            {diffVotes} ({diffPct}%)
          </span>
          <span>{t('vs_2022', language)} ({tot22})</span>
        </div>
      </article>

      {/* 2022 Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">{t('assembly_winner', language)}</span>
          <Award size={16} style={{ color: '#0F766E' }} />
        </div>
        <div className="kpi-value" style={{ color: '#0F766E' }}>
          {language === 'pa' ? winner22.pa : winner22.en}
        </div>
        <div className="kpi-sub">
          <span>{language === 'pa' ? winner22.lead_pa : winner22.lead_en}</span>
        </div>
        <div className="seats-pill-box">
          <span className="seat-tag seat-inc">INC: {bw22.INC || 0}</span>
          <span className="seat-tag seat-sad">SAD: {bw22.SAD || bw22.Sekhwan || 0}</span>
          <span className="seat-tag seat-aap">AAP: {bw22.AAP || 0}</span>
          {bw22.BJP !== undefined && <span className="seat-tag seat-bjp">BJP: {bw22.BJP}</span>}
        </div>
      </article>

      {/* 2024 Result */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">{t('parl_lead', language)}</span>
          <Award size={16} style={{ color: '#0F766E' }} />
        </div>
        <div className="kpi-value" style={{ color: '#0F766E' }}>
          {language === 'pa' ? winner24.pa : winner24.en}
        </div>
        <div className="kpi-sub">
          <span>{language === 'pa' ? winner24.lead_pa : winner24.lead_en}</span>
        </div>
        <div className="seats-pill-box">
          <span className="seat-tag seat-inc">INC: {bw24.INC || 0}</span>
          <span className="seat-tag seat-aap">AAP: {bw24.AAP || 0}</span>
          <span className="seat-tag seat-sad">SAD: {bw24.SAD || 0}</span>
          <span className="seat-tag seat-bjp">BJP: {bw24.BJP || 0}</span>
        </div>
      </article>

      {/* Key Shift Dynamic */}
      <article className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-label">{t('booth_dynamics', language)}</span>
          <CheckCircle2 size={16} className="text-secondary" />
        </div>
        <div className="kpi-value">
          <span style={{ color: '#ef4444' }}>{flippedCount}</span> {t('flipped_booths', language)}
        </div>
        <div className="kpi-sub">
          <span>{dynamicsSub}</span>
        </div>
        <div className="seats-pill-box">
          <span className="seat-tag seat-inc">{incShift}</span>
          <span className="seat-tag seat-aap">{aapShift}</span>
        </div>
      </article>
    </section>
  );
}
