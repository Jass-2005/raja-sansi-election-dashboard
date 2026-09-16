import rajaSansiData from './raja_sansi_comparison_data.json';
import qadianData from './qadian_comparison_data.json';

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
      2022: {
        INC: { short_en: 'INC (Sarkaria)', short_pa: 'ਕਾਂਗਰਸ (ਸਰਕਾਰੀਆ)', name_en: 'Sukhbinder Singh Sarkaria', name_pa: 'ਸੁਖਬਿੰਦਰ ਸਿੰਘ ਸਰਕਾਰੀਆ' },
        AAP: { short_en: 'AAP (Miadian)', short_pa: 'ਆਪ (ਮਿਆਦੀਆਂ)', name_en: 'Baldev Singh Miadian', name_pa: 'ਬਲਦੇਵ ਸਿੰਘ ਮਿਆਦੀਆਂ' },
        SAD: { short_en: 'SAD (Lopoke)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਲੋਪੋਕੇ)', name_en: 'Vir Singh Lopoke', name_pa: 'ਵੀਰ ਸਿੰਘ ਲੋਪੋਕੇ' },
        BJP: { short_en: 'BJP (Mahal)', short_pa: 'ਭਾਜਪਾ (ਮਾਹਲ)', name_en: 'Mukhwinder Singh Mahal', name_pa: 'ਮੁਖਵਿੰਦਰ ਸਿੰਘ ਮਾਹਲ' }
      },
      2024: {
        INC: { short_en: 'INC (Aujla)', short_pa: 'ਕਾਂਗਰਸ (ਔਜਲਾ)', name_en: 'Gurjeet Singh Aujla', name_pa: 'ਗੁਰਜੀਤ ਸਿੰਘ ਔਜਲਾ' },
        AAP: { short_en: 'AAP (Dhaliwal)', short_pa: 'ਆਪ (ਧਾਲੀਵਾਲ)', name_en: 'Kuldeep Singh Dhaliwal', name_pa: 'ਕੁਲਦੀਪ ਸਿੰਘ ਧਾਲੀਵਾਲ' },
        SAD: { short_en: 'SAD (Anil Joshi)', short_pa: 'ਅਕਾਲੀ ਦਲ (ਜੋਸ਼ੀ)', name_en: 'Anil Joshi', name_pa: 'ਅਨਿਲ ਜੋਸ਼ੀ' },
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
  }
};
