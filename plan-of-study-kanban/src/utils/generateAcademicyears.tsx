export function generateAcademicYears(years: number) {
    let result = [];
    let startYear = 20; // Assuming starting at AY 20-21
    let endYear = startYear + 1;
  
    for (let i = 0; i < years; i++) {
      let ayStart = startYear + i;
      let ayEnd = endYear + i;
  
      // 1st Semester
      result.push(`1st Semester AY ${ayStart}-${ayEnd}`);
  
      // 2nd Semester
      result.push(`2nd Semester AY ${ayStart}-${ayEnd}`);
  
      // Mid-Year Term
      result.push(`Mid-Year Term AY ${ayStart}-${ayEnd}`);
    }
  
    return result;
  }

