import rajaSansiData from './raja_sansi_comparison_data.json';
import amritsarSouthData from './amritsar_south_comparison_data.json';
import ajnalaData from './ajnala_comparison_data.json';
import majithaData from './majitha_comparison_data.json';
import qadianData from './qadian_comparison_data.json';
import samralaData from './samrala_comparison_data.json';

export const CONSTITUENCIES = {
  RAJA_SANSI: {
    id: 'RAJA_SANSI',
    code: '12',
    name_en: '12 - Raja Sansi',
    name_pa: '12 - ਰਾਜਾ ਸਾਂਸੀ',
    district_en: 'Amritsar PC',
    district_pa: 'ਅੰਮ੍ਰਿਤਸਰ ਲੋਕ ਸਭਾ',
    total_booths: 222,
    data: rajaSansiData,
    excelFile: './Raja_Sansi_Master_Booth_Analysis_AAP_INC.xlsx',
    excelName: 'Raja_Sansi_Master_Booth_Analysis_AAP_INC.xlsx',
    csvFile: './Raja_Sansi_All_Booths_Comparison.csv',
    csvName: 'Raja_Sansi_All_Booths_Comparison.csv',
    candidates: {
      2017: {
        INC: { short_en: 'INC (Sarkaria)', short_pa: 'ਕਾਂਗਰਸ (ਸਰਕਾਰੀਆ)', name_en: 'Sukhbinder Singh Sarkaria', name_pa: 'ਸੁਖਬਿੰਦਰ ਸਿੰਘ ਸਰਕਾਰੀਆ' },
        SAD: { short_en: 'SAD (Lopoke)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਲੋਪੋਕੇ)', name_en: 'Vir Singh Lopoke', name_pa: 'ਵੀਰ ਸਿੰਘ ਲੋਪੋਕੇ' },
        AAP: { short_en: 'AAP (Dhillon)', short_pa: 'ਆਪ (ਢਿੱਲੋਂ)', name_en: 'Jagjot Singh Dhillon', name_pa: 'ਜਗਜੋਤ ਸਿੰਘ ਢਿੱਲੋਂ' },
        BSP: { short_en: 'BSP (Lakhbir)', short_pa: 'ਬਸਪਾ (ਲਖਬੀਰ)', name_en: 'Lakhbir Singh', name_pa: 'ਲਖਬੀਰ ਸਿੰਘ' }
      },
      2019: {
        INC: { short_en: 'INC (Aujla)', short_pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', name_en: 'Gurjeet Singh Aujla', name_pa: 'ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ' },
        BJP: { short_en: 'BJP/NDA (Puri)', short_pa: 'ਭਾਜਪਾ/ਗਠਜੋੜ (ਪੁਰੀ)', name_en: 'Hardeep Singh Puri', name_pa: 'ਹਰਦੀਪ ਸਿੰਘ ਪੁਰੀ' },
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' }
      },
      2022: {
        INC: { short_en: 'INC (Sarkaria)', short_pa: 'ਕਾਂਗਰਸ (ਸਰਕਾਰੀਆ)', name_en: 'Sukhbinder Singh Sarkaria', name_pa: 'ਸੁਖਬਿੰਦਰ ਸਿੰਘ ਸਰਕਾਰੀਆ' },
        AAP: { short_en: 'AAP (Miadian)', short_pa: 'ਆਪ (ਮਿਆਦੀਆਂ)', name_en: 'Baldev Singh Miadian', name_pa: 'ਬਲਦੇਵ ਸਿੰਘ ਮਿਆਦੀਆਂ' },
        SAD: { short_en: 'SAD (Lopoke)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਲੋਪੋਕੇ)', name_en: 'Vir Singh Lopoke', name_pa: 'ਵੀਰ ਸਿੰਘ ਲੋਪੋਕੇ' },
        BJP: { short_en: 'BJP (Mukhwinder Singh)', short_pa: 'ਭਾਜਪਾ (ਮੁਖਵਿੰਦਰ ਸਿੰਘ)', name_en: 'Mukhwinder Singh', name_pa: 'ਮੁਖਵਿੰਦਰ ਸਿੰਘ' }
      },
      2024: {
        INC: { short_en: 'INC (Aujla)', short_pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', name_en: 'Gurjeet Singh Aujla', name_pa: 'ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ' },
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' },
        SAD: { short_en: 'SAD (Anil Joshi)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਜੋਸ਼ੀ)', name_en: 'Anil Joshi', name_pa: 'ਅਨਿਲ ਜੋਸ਼ੀ' },
        BJP: { short_en: 'BJP (Sandhu)', short_pa: 'ਭਾਜਪਾ (ਸੰਧੂ)', name_en: 'Taranjit Singh Sandhu Samundri', name_pa: 'ਤਰਨਜੀਤ ਸਿੰਘ ਸੰਧੂ ਸਮੁੰਦਰੀ' }
      }
    }
  },
  AMRITSAR_SOUTH: {
    id: 'AMRITSAR_SOUTH',
    code: '19',
    name_en: '19 - Amritsar South',
    name_pa: '19 - ਅੰਮ੍ਰਿਤਸਰ ਦੱਖਣੀ',
    district_en: 'Amritsar PC',
    district_pa: 'ਅੰਮ੍ਰਿਤਸਰ ਲੋਕ ਸਭਾ',
    total_booths: 169,
    data: amritsarSouthData,
    excelFile: './Amritsar_South_Master_Booth_Analysis_AAP_INC.xlsx',
    excelName: 'Amritsar_South_Master_Booth_Analysis_AAP_INC.xlsx',
    csvFile: './Amritsar_South_All_Booths_Comparison.csv',
    csvName: 'Amritsar_South_All_Booths_Comparison.csv',
    candidates: {
      2017: {
        INC: { short_en: 'INC (Bolaria)', short_pa: 'ਕਾਂਗਰਸ (ਬੁਲਾਰੀਆ)', name_en: 'Inderbir Singh Bolaria', name_pa: 'ਇੰਦਰਬੀਰ ਸਿੰਘ ਬੁਲਾਰੀਆ' },
        AAP: { short_en: 'AAP (Dr. Nijjar)', short_pa: 'ਆਪ (ਡਾ. ਨਿੱਜਰ)', name_en: 'Dr. Inderbir Singh Nijjar', name_pa: 'ਡਾ. ਇੰਦਰਬੀਰ ਸਿੰਘ ਨਿੱਜਰ' },
        SAD: { short_en: 'SAD (Tikka)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਟਿੱਕਾ)', name_en: 'Gurpartap Singh Tikka', name_pa: 'ਗੁਰਪ੍ਰਤਾਪ ਸਿੰਘ ਟਿੱਕਾ' }
      },
      2019: {
        INC: { short_en: 'INC (Aujla)', short_pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', name_en: 'Gurjeet Singh Aujla', name_pa: 'ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ' },
        BJP: { short_en: 'BJP/NDA (Puri)', short_pa: 'ਭਾਜਪਾ/ਗਠਜੋੜ (ਪੁਰੀ)', name_en: 'Hardeep Singh Puri', name_pa: 'ਹਰਦੀਪ ਸਿੰਘ ਪੁਰੀ' },
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' }
      },
      2022: {
        AAP: { short_en: 'AAP (Dr. Nijjar)', short_pa: 'ਆਪ (ਡਾ. ਨਿੱਜਰ)', name_en: 'Dr. Inderbir Singh Nijjar', name_pa: 'ਡਾ. ਇੰਦਰਬੀਰ ਸਿੰਘ ਨਿੱਜਰ' },
        SAD: { short_en: 'SAD (Gill)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਗਿੱਲ)', name_en: 'Talbir Singh Gill', name_pa: 'ਤਲਬੀਰ ਸਿੰਘ ਗਿੱਲ' },
        INC: { short_en: 'INC (Bolaria)', short_pa: 'ਕਾਂਗਰਸ (ਬੁਲਾਰੀਆ)', name_en: 'Inderbir Singh Bolaria', name_pa: 'ਇੰਦਰਬੀਰ ਸਿੰਘ ਬੁਲਾਰੀਆ' },
        BJP: { short_en: 'BJP (Thekedar)', short_pa: 'ਭਾਜਪਾ (ਠੇਕੇਦਾਰ)', name_en: 'Harjinder Singh Thekedar', name_pa: 'ਹਰਜਿੰਦਰ ਸਿੰਘ ਠੇਕੇਦਾਰ' }
      },
      2024: {
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' },
        BJP: { short_en: 'BJP (Sandhu)', short_pa: 'ਭਾਜਪਾ (ਸੰਧੂ)', name_en: 'Taranjit Singh Sandhu Samundri', name_pa: 'ਤਰਨਜੀਤ ਸਿੰਘ ਸੰਧੂ ਸਮੁੰਦਰੀ' },
        INC: { short_en: 'INC (Aujla)', short_pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', name_en: 'Gurjeet Singh Aujla', name_pa: 'ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ' },
        SAD: { short_en: 'SAD (Anil Joshi)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਜੋਸ਼ੀ)', name_en: 'Anil Joshi', name_pa: 'ਅਨਿਲ ਜੋਸ਼ੀ' }
      }
    }
  },
  AJNALA: {
    id: 'AJNALA',
    code: '11',
    name_en: '11 - Ajnala',
    name_pa: '11 - ਅਜਨਾਲਾ',
    district_en: 'Amritsar PC',
    district_pa: 'ਅੰਮ੍ਰਿਤਸਰ ਲੋਕ ਸਭਾ',
    total_booths: 188,
    data: ajnalaData,
    excelFile: './Ajnala_Master_Booth_Analysis_AAP_INC.xlsx',
    excelName: 'Ajnala_Master_Booth_Analysis_AAP_INC.xlsx',
    csvFile: './Ajnala_All_Booths_Comparison.csv',
    csvName: 'Ajnala_All_Booths_Comparison.csv',
    candidates: {
      2017: {
        INC: { short_en: 'INC (Harpartap)', short_pa: 'ਕਾਂਗਰਸ (ਹਰਪ੍ਰਤਾਪ)', name_en: 'Harpartap Singh', name_pa: 'ਹਰਪ੍ਰਤਾਪ ਸਿੰਘ' },
        SAD: { short_en: 'SAD (Bonny)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਬੋਨੀ)', name_en: 'Amarpal Singh Bony Ajnala', name_pa: 'ਅਮਰਪਾਲ ਸਿੰਘ ਬੋਨੀ ਅਜਨਾਲਾ' },
        AAP: { short_en: 'AAP (Rajpreet)', short_pa: 'ਆਪ (ਰਾਜਪ੍ਰੀਤ)', name_en: 'Rajpreet Singh', name_pa: 'ਰਾਜਪ੍ਰੀਤ ਸਿੰਘ' },
        BSP: { short_en: 'BSP (Balwinder)', short_pa: 'ਬਸਪਾ (ਬਲਵਿੰਦਰ)', name_en: 'Balwinder Singh', name_pa: 'ਬਲਵਿੰਦਰ ਸਿੰਘ' }
      },
      2019: {
        INC: { short_en: 'INC (Aujla)', short_pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', name_en: 'Gurjeet Singh Aujla', name_pa: 'ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ' },
        BJP: { short_en: 'BJP (Puri)', short_pa: 'ਭਾਜਪਾ (ਪੁਰੀ)', name_en: 'Hardeep Singh Puri', name_pa: 'ਹਰਦੀਪ ਸਿੰਘ ਪੁਰੀ' },
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' }
      },
      2022: {
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' },
        INC: { short_en: 'INC (Harpartap)', short_pa: 'ਕਾਂਗਰਸ (ਹਰਪ੍ਰਤਾਪ)', name_en: 'Harpartap Singh Ajnala', name_pa: 'ਹਰਪ੍ਰਤਾਪ ਸਿੰਘ ਅਜਨਾਲਾ' },
        SAD: { short_en: 'SAD (Bonny)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਬੋਨੀ)', name_en: 'Amarpal Singh Bonny Ajnala', name_pa: 'ਅਮਰਪਾਲ ਸਿੰਘ ਬੋਨੀ ਅਜਨਾਲਾ' },
        BJP: { short_en: 'BJP (Surjeet)', short_pa: 'ਭਾਜਪਾ (ਸੁਰਜੀਤ)', name_en: 'Surjeet Singh', name_pa: 'ਸੁਰਜੀਤ ਸਿੰਘ' }
      },
      2024: {
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' },
        INC: { short_en: 'INC (Aujla)', short_pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', name_en: 'Gurjeet Singh Aujla', name_pa: 'ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ' },
        SAD: { short_en: 'SAD (Anil Joshi)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਜੋਸ਼ੀ)', name_en: 'Anil Joshi', name_pa: 'ਅਨਿਲ ਜੋਸ਼ੀ' },
        BJP: { short_en: 'BJP (Sandhu)', short_pa: 'ਭਾਜਪਾ (ਸੰਧੂ)', name_en: 'Taranjit Singh Sandhu Samundri', name_pa: 'ਤਰਨਜੀਤ ਸਿੰਘ ਸੰਧੂ ਸਮੁੰਦਰੀ' }
      }
    }
  },
  MAJITHA: {
    id: 'MAJITHA',
    code: '13',
    name_en: '13 - Majitha',
    name_pa: '13 - ਮਜੀਠਾ',
    district_en: 'Amritsar PC',
    district_pa: 'ਅੰਮ੍ਰਿਤਸਰ ਲੋਕ ਸਭਾ',
    total_booths: 187,
    data: majithaData,
    excelFile: './Majitha_Master_Booth_Analysis_AAP_INC.xlsx',
    excelName: 'Majitha_Master_Booth_Analysis_AAP_INC.xlsx',
    csvFile: './Majitha_All_Booths_Comparison.csv',
    csvName: 'Majitha_All_Booths_Comparison.csv',
    candidates: {
      2022: {
        SAD: { short_en: 'SAD (Ganieve Majithia)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਗਨੀਵ ਮਜੀਠੀਆ)', name_en: 'Ganieve Kaur Majithia', name_pa: 'ਗਨੀਵ ਕੌਰ ਮਜੀਠੀਆ' },
        AAP: { short_en: 'AAP (Lalli Majithia)', short_pa: 'ਆਪ (ਲਾਲੀ ਮਜੀਠੀਆ)', name_en: 'Sukhjinder Singh Lalli Majithia', name_pa: 'ਸੁਖਜਿੰਦਰ ਸਿੰਘ ਲਾਲੀ ਮਜੀਠੀਆ' },
        INC: { short_en: 'INC (Jagga)', short_pa: 'ਕਾਂਗਰਸ (ਜੱਗਾ)', name_en: 'Jagwinder Pal Singh Jagga Majitha', name_pa: 'ਜਗਵਿੰਦਰ ਪਾਲ ਸਿੰਘ ਜੱਗਾ ਮਜੀਠਾ' },
        BJP: { short_en: 'BJP (Bhullar)', short_pa: 'ਭਾਜਪਾ (ਭੁੱਲਰ)', name_en: 'Pardeep Singh Bhullar', name_pa: 'ਪ੍ਰਦੀਪ ਸਿੰਘ ਭੁੱਲਰ' }
      },
      2024: {
        SAD: { short_en: 'SAD (Anil Joshi)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਜੋਸ਼ੀ)', name_en: 'Anil Joshi', name_pa: 'ਅਨਿਲ ਜੋਸ਼ੀ' },
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' },
        INC: { short_en: 'INC (Aujla)', short_pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', name_en: 'Gurjeet Singh Aujla', name_pa: 'ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ' },
        BJP: { short_en: 'BJP (Sandhu)', short_pa: 'ਭਾਜਪਾ (ਸੰਧੂ)', name_en: 'Taranjit Singh Sandhu Samundri', name_pa: 'ਤਰਨਜੀਤ ਸਿੰਘ ਸੰਧੂ ਸਮੁੰਦਰੀ' }
      }
    }
  },
  QADIAN: {
    id: 'QADIAN',
    code: '18',
    name_en: '18 - Qadian',
    name_pa: '18 - ਕਾਦੀਆਂ',
    district_en: 'Gurdaspur PC',
    district_pa: 'ਗੁਰਦਾਸਪੁਰ ਲੋਕ ਸਭਾ',
    total_booths: 223,
    data: qadianData,
    excelFile: './Qadian_Master_Booth_Analysis_AAP_INC.xlsx',
    excelName: 'Qadian_Master_Booth_Analysis_AAP_INC.xlsx',
    csvFile: './Qadian_2024_Parliamentary_Booth_Results.csv',
    csvName: 'Qadian_2024_Parliamentary_Booth_Results.csv',
    candidates: {
      2022: {
        INC: { short_en: 'INC (Bajwa)', short_pa: 'ਕਾਂਗਰਸ (ਬਾਜਵਾ)', name_en: 'Partap Singh Bajwa', name_pa: 'ਪ੍ਰਤਾਪ ਸਿੰਘ ਬਾਜਵਾ' },
        AAP: { short_en: 'AAP (Sekhwan)', short_pa: 'ਆਪ (ਸੇਖਵਾਂ)', name_en: 'Jagroop Singh Sekhwan', name_pa: 'ਜਗਰੂਪ ਸਿੰਘ ਸੇਖਵਾਂ' },
        SAD: { short_en: 'SAD (Babbehali)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਬੱਬੇਹਾਲੀ)', name_en: 'Gurcharan Singh Babbehali', name_pa: 'ਗੁਰਚਰਨ ਸਿੰਘ ਬੱਬੇਹਾਲੀ' },
        BJP: { short_en: 'BJP (Fatehjang)', short_pa: 'ਭਾਜਪਾ (ਫ਼ਤਿਹਜੰਗ)', name_en: 'Fatehjang Singh Bajwa', name_pa: 'ਫ਼ਤਿਹਜੰਗ ਸਿੰਘ ਬਾਜਵਾ' }
      },
      2024: {
        INC: { short_en: 'INC (Randhawa)', short_pa: 'ਕਾਂਗਰਸ (ਰੰਧਾਵਾ)', name_en: 'Sukhjinder Singh Randhawa', name_pa: 'ਸੁਖਜਿੰਦਰ ਸਿੰਘ ਰੰਧਾਵਾ' },
        AAP: { short_en: 'AAP (Kalsi)', short_pa: 'ਆਪ (ਕਲਸੀ)', name_en: 'Amansher Singh Sherry Kalsi', name_pa: 'ਅਮਨਸ਼ੇਰ ਸਿੰਘ ਸ਼ੈਰੀ ਕਲਸੀ' },
        SAD: { short_en: 'SAD (Cheema)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਚੀਮਾ)', name_en: 'Daljit Singh Cheema', name_pa: 'ਦਲਜੀਤ ਸਿੰਘ ਚੀਮਾ' },
        BJP: { short_en: 'BJP (Babbu)', short_pa: 'ਭਾਜਪਾ (ਬੱਬੂ)', name_en: 'Dinesh Singh Babbu', name_pa: 'ਦਿਨੇਸ਼ ਸਿੰਘ ਬੱਬੂ' }
      }
    }
  },
  SAMRALA: {
    id: 'SAMRALA',
    code: '58',
    name_en: '58 - Samrala',
    name_pa: '58 - ਸਮਰਾਲਾ',
    district_en: 'Fatehgarh Sahib PC (Ludhiana)',
    district_pa: 'ਫ਼ਤਿਹਗੜ੍ਹ ਸਾਹਿਬ ਲੋਕ ਸਭਾ (ਲੁਧਿਆਣਾ)',
    total_booths: 218,
    data: samralaData,
    excelFile: './Samrala_Master_Booth_Analysis_AAP_INC.xlsx',
    excelName: 'Samrala_Master_Booth_Analysis_AAP_INC.xlsx',
    csvFile: './Samrala_All_Booths_Comparison.csv',
    csvName: 'Samrala_All_Booths_Comparison.csv',
    candidates: {
      2022: {
        AAP: { short_en: 'AAP (Diyalpura)', short_pa: 'ਆਪ (ਦਿਆਲਪੁਰਾ)', name_en: 'Jagtar Singh Diyalpura', name_pa: 'ਜਗਤਾਰ ਸਿੰਘ ਦਿਆਲਪੁਰਾ' },
        INC: { short_en: 'INC (Raja Gill)', short_pa: 'ਕਾਂਗਰਸ (ਰਾਜਾ ਗਿੱਲ)', name_en: 'Rupinder Singh Raja Gill', name_pa: 'ਰੁਪਿੰਦਰ ਸਿੰਘ ਰਾਜਾ ਗਿੱਲ' },
        SAD: { short_en: 'SAD (Dhillon)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਢਿੱਲੋਂ)', name_en: 'Paramjit Singh Dhillon', name_pa: 'ਪਰਮਜੀਤ ਸਿੰਘ ਢਿੱਲੋਂ' },
        BJP: { short_en: 'BJP (Sharma)', short_pa: 'ਭਾਜਪਾ (ਸ਼ਰਮਾ)', name_en: 'Jitender Sharma', name_pa: 'ਜਤਿੰਦਰ ਸ਼ਰਮਾ' }
      },
      2024: {
        INC: { short_en: 'INC (Dr. Amar Singh)', short_pa: 'ਕਾਂਗਰਸ (ਡਾ. ਅਮਰ ਸਿੰਘ)', name_en: 'Dr. Amar Singh', name_pa: 'ਡਾ. ਅਮਰ ਸਿੰਘ' },
        AAP: { short_en: 'AAP (Gurpreet GP)', short_pa: 'ਆਪ (ਗੁਰਪ੍ਰੀਤ ਜੀਪੀ)', name_en: 'Gurpreet Singh GP', name_pa: 'ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਜੀਪੀ' },
        SAD: { short_en: 'SAD (Khalsa)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਖ਼ਾਲਸਾ)', name_en: 'Bikramjit Singh Khalsa', name_pa: 'ਬਿਕਰਮਜੀਤ ਸਿੰਘ ਖ਼ਾਲਸਾ' },
        BJP: { short_en: 'BJP (Valmiki)', short_pa: 'ਭਾਜਪਾ (ਵਾਲਮੀਕਿ)', name_en: 'Gejja Ram Valmiki', name_pa: 'ਗੇਜਾ ਰਾਮ ਵਾਲਮੀਕਿ' }
      }
    }
  }
};
