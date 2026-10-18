import React from 'react';
import { Compass, Activity, BarChart3, CheckCircle2 } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function KPIBanner({ summary, constituencyId, language }) {
  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.RAJA_SANSI;
  const isRajaSansi = constituencyId === 'RAJA_SANSI';

  const totalBooths = currentConst.total_booths || (isRajaSansi ? 222 : 223);
  const tot24 = summary?.total_votes_2024?.toLocaleString() || (isRajaSansi ? '113,833' : '118,991');
  const turnoutPct = isRajaSansi ? '70.1%' : '72.1%';
  const turnoutShift = isRajaSansi ? '-14.6%' : '-9.5%';

  // INC Stats
  const incVotes = isRajaSansi ? '42,408' : '41,806';
  const incWins = isRajaSansi ? 112 : 111;
  const incShare = isRajaSansi ? '37.3%' : '35.1%';
  const incLead = isRajaSansi ? '+4,543' : '+3,152';

  // AAP Stats
  const aapCandidate = isRajaSansi 
    ? (language === 'pa' ? 'ਆਪ (ਧਾਲੀਵਾਲ)' : 'AAP (DHALIWAL)')
    : (language === 'pa' ? 'ਆਪ (ਕਲਸੀ)' : 'AAP (KALSI)');
  const aapVotes = isRajaSansi ? '37,865' : '38,654';
  const aapWins = isRajaSansi ? 69 : 81;
  const aapShare = isRajaSansi ? '33.3%' : '32.5%';
  const aapGains = isRajaSansi ? '+11' : '+63';

  return (
    <section className="dsidein-kpi-grid" aria-label="Election Highlights and Summary Metrics">
      {/* KPI 1: Live Telemetry & Polling Stations */}
      <div className="dsidein-kpi-card">
        <div className="kpi-top-row">
          <div className="kpi-icon-pill icon-blue">
            <Compass size={18} />
          </div>
        </div>
        <div className="kpi-label">
          {language === 'pa' ? 'ਕੁੱਲ ਪੋਲਿੰਗ ਸਟੇਸ਼ਨ' : 'POLLING STATIONS'}
        </div>
        <div className="kpi-value text-blue">
          {totalBooths} {language === 'pa' ? 'ਬੂਥ' : 'Booths'}
        </div>
        <div className="kpi-sub-pill text-blue">
          ● {language === 'pa' ? '100% ਪ੍ਰਮਾਣਿਤ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਿਤ' : '100% Monitored & Verified'}
        </div>
      </div>

      {/* KPI 2: Total 2024 Turnout */}
      <div className="dsidein-kpi-card">
        <div className="kpi-top-row">
          <div className="kpi-icon-pill icon-orange">
            <Activity size={18} />
          </div>
        </div>
        <div className="kpi-label">
          {language === 'pa' ? '2024 ਕੁੱਲ ਵੈਧ ਵੋਟਾਂ' : '2024 VALID VOTES'}
        </div>
        <div className="kpi-value">{tot24}</div>
        <div className="kpi-sub-pill text-orange">
          ● {turnoutPct} {language === 'pa' ? 'ਪੋਲਿੰਗ' : 'Valid Polled'} ({turnoutShift} {language === 'pa' ? 'ਬਨਾਮ ’22' : 'vs ’22'})
        </div>
      </div>

      {/* KPI 3: Congress (INC) */}
      <div className="dsidein-kpi-card inc-kpi">
        <div className="kpi-top-row">
          <div className="kpi-icon-pill icon-orange">
            <BarChart3 size={18} />
          </div>
        </div>
        <div className="kpi-label">
          {language === 'pa' ? 'ਕਾਂਗਰਸ (INC)' : 'CONGRESS (INC)'}
        </div>
        <div className="kpi-value text-orange">{incVotes}</div>
        <div className="kpi-sub-pill text-orange">
          ● {incWins} {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'} ({incShare} | {incLead} {language === 'pa' ? 'ਲੀਡ' : 'Lead'})
        </div>
      </div>

      {/* KPI 4: AAP */}
      <div className="dsidein-kpi-card aap-kpi">
        <div className="kpi-top-row">
          <div className="kpi-icon-pill icon-blue">
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className="kpi-label">{aapCandidate}</div>
        <div className="kpi-value text-blue">{aapVotes}</div>
        <div className="kpi-sub-pill text-blue">
          ● {aapWins} {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'} ({aapShare} | {aapGains} {language === 'pa' ? 'ਲਾਭ' : 'Gains'})
        </div>
      </div>

      {/* 4-Election Historical Comparative Telemetry Strip */}
      {isRajaSansi && summary?.votes_2017 && summary?.votes_2019 && (
        <div className="four-year-timeline-wrap" style={{ gridColumn: '1 / -1', marginTop: '4px' }}>
          <div className="timeline-strip-header">
            <span className="timeline-strip-badge">
              {language === 'pa' ? '4 ਚੋਣਾਂ ਦਾ ਇਤਿਹਾਸਕ ਪ੍ਰਦਰਸ਼ਨ' : '4-Election Longitudinal Telemetry (2017 – 2024)'}
            </span>
            <span className="timeline-strip-note">
              {language === 'pa' 
                ? '2017 (209 ਬੂਥ) ➔ 2019 (213 ਬੂਥ) ➔ 2022 (222 ਬੂਥ) ➔ 2024 (222 ਬੂਥ)' 
                : '2017 (209 Booths) ➔ 2019 (213 Booths) ➔ 2022 (222 Booths) ➔ 2024 (222 Booths)'}
            </span>
          </div>
          
          <div className="timeline-strip-grid">
            {/* 2017 Vidhan Sabha */}
            <div className="timeline-year-card">
              <div className="ty-header">
                <span className="ty-tag">2017 VS</span>
                <span className="ty-winner inc">INC Win</span>
              </div>
              <div className="ty-booths">209 {language === 'pa' ? 'ਬੂਥ' : 'Booths'} • 131,895 {language === 'pa' ? 'ਵੋਟਾਂ' : 'Votes'}</div>
              <div className="ty-parties">
                <div className="ty-party-row"><span className="party-name inc">INC (Sarkaria)</span><strong>59,586</strong> (45.2%)</div>
                <div className="ty-party-row"><span className="party-name sad">SAD (Lopoke)</span><strong>53,869</strong> (40.8%)</div>
                <div className="ty-party-row"><span className="party-name aap">AAP (Dhillon)</span><strong>13,177</strong> (10.0%)</div>
              </div>
              <div className="ty-lead inc">INC Lead: +5,717 (132 Booths Won)</div>
            </div>

            {/* 2019 Lok Sabha */}
            <div className="timeline-year-card">
              <div className="ty-header">
                <span className="ty-tag">2019 LS</span>
                <span className="ty-winner inc">INC Win</span>
              </div>
              <div className="ty-booths">213 {language === 'pa' ? 'ਬੂਥ (+4)' : 'Booths (+4)'} • 110,814 {language === 'pa' ? 'ਵੋਟਾਂ' : 'Votes'}</div>
              <div className="ty-parties">
                <div className="ty-party-row"><span className="party-name inc">INC (Aujla)</span><strong>62,496</strong> (56.4%)</div>
                <div className="ty-party-row"><span className="party-name bjp">BJP/NDA (Puri)</span><strong>37,948</strong> (34.2%)</div>
                <div className="ty-party-row"><span className="party-name aap">AAP (Dhaliwal)</span><strong>2,541</strong> (2.3%)</div>
              </div>
              <div className="ty-lead inc">INC Lead: +24,548 (190 Booths Won)</div>
            </div>

            {/* 2022 Vidhan Sabha */}
            <div className="timeline-year-card">
              <div className="ty-header">
                <span className="ty-tag">2022 VS</span>
                <span className="ty-winner inc">INC Win</span>
              </div>
              <div className="ty-booths">222 {language === 'pa' ? 'ਬੂਥ (+9)' : 'Booths (+9)'} • 133,259 {language === 'pa' ? 'ਵੋਟਾਂ' : 'Votes'}</div>
              <div className="ty-parties">
                <div className="ty-party-row"><span className="party-name inc">INC (Sarkaria)</span><strong>46,802</strong> (35.1%)</div>
                <div className="ty-party-row"><span className="party-name sad">SAD (Lopoke)</span><strong>41,333</strong> (31.0%)</div>
                <div className="ty-party-row"><span className="party-name aap">AAP (Miadian)</span><strong>37,264</strong> (28.0%)</div>
              </div>
              <div className="ty-lead inc">INC Lead: +5,469 (98 vs SAD 65 vs AAP 58)</div>
            </div>

            {/* 2024 Lok Sabha */}
            <div className="timeline-year-card active">
              <div className="ty-header">
                <span className="ty-tag">2024 LS</span>
                <span className="ty-winner inc">INC Lead</span>
              </div>
              <div className="ty-booths">222 {language === 'pa' ? 'ਬੂਥ (ਸਥਿਰ)' : 'Booths (Identical)'} • 113,833 {language === 'pa' ? 'ਵੋਟਾਂ' : 'Votes'}</div>
              <div className="ty-parties">
                <div className="ty-party-row"><span className="party-name inc">INC (Aujla)</span><strong>36,285</strong> (31.9%)</div>
                <div className="ty-party-row"><span className="party-name aap">AAP (Dhaliwal)</span><strong>31,742</strong> (27.9%)</div>
                <div className="ty-party-row"><span className="party-name sad">SAD (Joshi)</span><strong>22,942</strong> (20.2%)</div>
                <div className="ty-party-row"><span className="party-name bjp">BJP (Sandhu)</span><strong>11,680</strong> (10.3%)</div>
              </div>
              <div className="ty-lead inc">INC Lead: +4,543 (112 vs AAP 69 vs SAD 29)</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
