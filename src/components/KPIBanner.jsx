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
    </section>
  );
}
