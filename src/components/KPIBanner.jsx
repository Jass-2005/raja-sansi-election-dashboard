import React, { useMemo } from 'react';
import { Compass, Activity, BarChart3, CheckCircle2 } from 'lucide-react';
import { CONSTITUENCIES } from '../data/constituencies';
import { t } from '../utils/translations';

export default function KPIBanner({ 
  summary, 
  constituencyId, 
  language, 
  onFilterByYearParty, 
  selectedParty, 
  activeFilter,
  partyStats,
  booths = []
}) {
  const currentConst = CONSTITUENCIES[constituencyId] || CONSTITUENCIES.RAJA_SANSI;
  const cand = currentConst.candidates || {};

  const totalBooths = booths.length || currentConst.total_booths;
  
  // Total votes 2024
  const totVotes2024Num = summary?.total_votes_2024 || booths.reduce((acc, b) => acc + (b.data_2024?.total || 0), 0);
  const tot24 = totVotes2024Num.toLocaleString();
  
  // Turnout comparison
  const turnoutShift = summary?.turnout_pct 
    ? `${summary.turnout_pct > 0 ? '+' : ''}${summary.turnout_pct}%` 
    : (summary?.turnout_diff ? `${summary.turnout_diff > 0 ? '+' : ''}${summary.turnout_diff.toLocaleString()}` : '');

  // Determine top 2 parties in 2024 for this constituency
  const partyOrder = ['INC', 'AAP', 'SAD', 'BJP'];
  const sortedParties = useMemo(() => {
    return [...partyOrder].sort((a, b) => {
      const vA = partyStats?.[a]?.votes_2024 || 0;
      const vB = partyStats?.[b]?.votes_2024 || 0;
      return vB - vA;
    });
  }, [partyStats]);

  const p1 = sortedParties[0] || 'INC';
  const p2 = sortedParties[1] || 'AAP';

  const p1Stats = partyStats?.[p1] || {};
  const p2Stats = partyStats?.[p2] || {};

  const p1Cand24 = cand?.['2024']?.[p1];
  const p2Cand24 = cand?.['2024']?.[p2];

  const p1Label = p1Cand24 
    ? (language === 'pa' ? p1Cand24.short_pa : p1Cand24.short_en) 
    : `${p1} (Winner)`;
  const p2Label = p2Cand24 
    ? (language === 'pa' ? p2Cand24.short_pa : p2Cand24.short_en) 
    : `${p2} (Runner-Up)`;

  const p1Votes = (p1Stats.votes_2024 || 0).toLocaleString();
  const p1Wins = p1Stats.booths_won_24 ?? 0;
  const p1Share = p1Stats.share_2024 ? `${p1Stats.share_2024}%` : '';
  const leadDiff = Math.max(0, (p1Stats.votes_2024 || 0) - (p2Stats.votes_2024 || 0));

  const p2Votes = (p2Stats.votes_2024 || 0).toLocaleString();
  const p2Wins = p2Stats.booths_won_24 ?? 0;
  const p2Share = p2Stats.share_2024 ? `${p2Stats.share_2024}%` : '';

  const handlePartyClick = (year, party) => {
    if (onFilterByYearParty) {
      onFilterByYearParty(year, party);
    }
  };

  // Compute longitudinal timeline metrics for all election years present
  const timelineYears = useMemo(() => {
    const allYears = [2017, 2019, 2022, 2024];
    const result = [];

    allYears.forEach(yr => {
      const yrBooths = booths.filter(b => {
        const dy = b[`data_${yr}`];
        return dy && (dy.total > 0 || dy.winner_party || dy.winner);
      });

      if (yrBooths.length === 0) return;

      const pData = {
        INC: { votes: 0, wins: 0 },
        AAP: { votes: 0, wins: 0 },
        SAD: { votes: 0, wins: 0 },
        BJP: { votes: 0, wins: 0 }
      };

      let totalVotes = 0;
      yrBooths.forEach(b => {
        const dy = b[`data_${yr}`];
        const wp = dy.winner_party || dy.winner;
        ['inc', 'aap', 'sad', 'bjp'].forEach(pk => {
          const v = dy[pk] || dy[`${pk}_votes`] || 0;
          const P = pk.toUpperCase();
          pData[P].votes += v;
          totalVotes += v;
        });
        if (wp && pData[wp]) {
          pData[wp].wins += 1;
        }
      });

      const sorted = Object.entries(pData).sort((a, b) => b[1].votes - a[1].votes);
      const winner = sorted[0];
      const runnerUp = sorted[1];
      const lead = winner[1].votes - (runnerUp ? runnerUp[1].votes : 0);

      const yearType = yr === 2019 || yr === 2024 ? 'LS' : 'VS';

      result.push({
        year: yr,
        type: yearType,
        tag: `${yr} ${yearType}`,
        boothsCount: yrBooths.length,
        totalVotes,
        parties: sorted.filter(p => p[1].votes > 0),
        winnerParty: winner[0],
        leadVotes: lead,
        winnerWins: winner[1].wins,
        partiesDict: pData
      });
    });

    return result;
  }, [booths]);

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
          ● {language === 'pa' ? 'ਲੋਕ ਸਭਾ ਚੋਣ 2024' : 'Lok Sabha 2024'} {turnoutShift ? `(${turnoutShift} vs ’22)` : ''}
        </div>
      </div>

      {/* KPI 3: #1 Leading Party in 2024 (Winner) */}
      <div 
        className={`dsidein-kpi-card ${p1.toLowerCase()}-kpi clickable-kpi ${selectedParty === p1 ? 'active-kpi' : ''}`}
        onClick={() => handlePartyClick(2024, p1)}
        title={`Click to view all ${p1Wins} booths won by ${p1} in 2024`}
        style={{ cursor: 'pointer' }}
      >
        <div className="kpi-top-row">
          <div className={`kpi-icon-pill icon-${p1.toLowerCase() === 'inc' ? 'orange' : p1.toLowerCase() === 'aap' ? 'blue' : 'purple'}`}>
            <BarChart3 size={18} />
          </div>
          <span className="click-to-filter-hint hide-mobile">
            {language === 'pa' ? 'ਫਿਲਟਰ ਲਈ ਕਲਿੱਕ ਕਰੋ' : 'Click to filter'}
          </span>
        </div>
        <div className="kpi-label">{p1Label}</div>
        <div className={`kpi-value text-${p1.toLowerCase() === 'inc' ? 'orange' : p1.toLowerCase() === 'aap' ? 'blue' : 'purple'}`}>
          {p1Votes}
        </div>
        <div className="kpi-sub-pill">
          ● {p1Wins} {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'} ({p1Share} | +{leadDiff.toLocaleString()} {language === 'pa' ? 'ਲੀਡ' : 'Lead'})
        </div>
      </div>

      {/* KPI 4: #2 Runner-Up Party in 2024 */}
      <div 
        className={`dsidein-kpi-card ${p2.toLowerCase()}-kpi clickable-kpi ${selectedParty === p2 ? 'active-kpi' : ''}`}
        onClick={() => handlePartyClick(2024, p2)}
        title={`Click to view all ${p2Wins} booths won by ${p2} in 2024`}
        style={{ cursor: 'pointer' }}
      >
        <div className="kpi-top-row">
          <div className={`kpi-icon-pill icon-${p2.toLowerCase() === 'aap' ? 'blue' : p2.toLowerCase() === 'inc' ? 'orange' : 'teal'}`}>
            <CheckCircle2 size={18} />
          </div>
          <span className="click-to-filter-hint hide-mobile">
            {language === 'pa' ? 'ਫਿਲਟਰ ਲਈ ਕਲਿੱਕ ਕਰੋ' : 'Click to filter'}
          </span>
        </div>
        <div className="kpi-label">{p2Label}</div>
        <div className={`kpi-value text-${p2.toLowerCase() === 'aap' ? 'blue' : p2.toLowerCase() === 'inc' ? 'orange' : 'teal'}`}>
          {p2Votes}
        </div>
        <div className="kpi-sub-pill">
          ● {p2Wins} {language === 'pa' ? 'ਜਿੱਤਾਂ' : 'Wins'} ({p2Share})
        </div>
      </div>

      {/* Multi-Election Historical Comparative Telemetry Strip */}
      {timelineYears.length > 1 && (
        <div className="four-year-timeline-wrap" style={{ gridColumn: '1 / -1', marginTop: '4px' }}>
          <div className="timeline-strip-header">
            <span className="timeline-strip-badge">
              {language === 'pa' 
                ? `${timelineYears.length} ਚੋਣਾਂ ਦਾ ਇਤਿਹਾਸਕ ਪ੍ਰਦਰਸ਼ਨ (${timelineYears[0].year} – ${timelineYears[timelineYears.length - 1].year})` 
                : `${timelineYears.length}-Election Longitudinal Telemetry (${timelineYears[0].year} – ${timelineYears[timelineYears.length - 1].year})`}
            </span>
            <span className="timeline-strip-note">
              {language === 'pa' 
                ? 'ਕਲਿੱਕ ਕਰਕੇ ਉਸ ਸਾਲ ਦੇ ਜੇਤੂ ਬੂਥ ਹੇਠਾਂ ਵੇਖੋ' 
                : 'Click any party below to filter that election’s winning booths'}
            </span>
          </div>
          
          <div className="timeline-strip-grid" style={{ gridTemplateColumns: `repeat(${timelineYears.length}, minmax(0, 1fr))` }}>
            {timelineYears.map(item => {
              const yrCand = cand?.[item.year.toString()] || {};
              const isLatest = item.year === 2024;

              return (
                <div key={item.year} className={`timeline-year-card ${isLatest ? 'active' : ''}`}>
                  <div className="ty-header">
                    <span className="ty-tag">{item.tag}</span>
                    <span className={`ty-winner ${item.winnerParty.toLowerCase()}`}>
                      {item.winnerParty} {item.type === 'LS' ? 'Lead' : 'Win'}
                    </span>
                  </div>

                  <div className="ty-booths">
                    {item.boothsCount} {language === 'pa' ? 'ਬੂਥ' : 'Booths'} • {item.totalVotes.toLocaleString()} {language === 'pa' ? 'ਵੋਟਾਂ' : 'Votes'}
                  </div>

                  <div className="ty-parties">
                    {item.parties.map(([pCode, pInfo]) => {
                      const cObj = yrCand[pCode];
                      const candLabel = cObj 
                        ? (language === 'pa' ? cObj.short_pa : cObj.short_en) 
                        : pCode;
                      const pct = item.totalVotes > 0 ? ((pInfo.votes / item.totalVotes) * 100).toFixed(1) : 0;

                      return (
                        <div 
                          key={pCode} 
                          className="ty-party-row clickable" 
                          onClick={() => handlePartyClick(item.year, pCode)}
                          title={`Filter ${item.year} ${pCode} Wins (${pInfo.wins} booths)`}
                        >
                          <span className={`party-name ${pCode.toLowerCase()}`}>{candLabel}</span>
                          <strong>{pInfo.votes.toLocaleString()}</strong> ({pct}%)
                        </div>
                      );
                    })}
                  </div>

                  <div 
                    className={`ty-lead ${item.winnerParty.toLowerCase()} clickable-lead`}
                    onClick={() => handlePartyClick(item.year, item.winnerParty)}
                    title={`Click to filter ${item.winnerWins} booths won by ${item.winnerParty} in ${item.year}`}
                  >
                    {item.winnerParty} Lead: +{item.leadVotes.toLocaleString()} ({item.winnerWins} {language === 'pa' ? 'ਬੂਥ ਜਿੱਤੇ' : 'Booths Won'})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
