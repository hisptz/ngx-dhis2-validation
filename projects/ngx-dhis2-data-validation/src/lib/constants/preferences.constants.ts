export const dateDictionary: any = {
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
  '01': 'Jan',
  '02': 'Feb',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'Aug',
  '09': 'Sept',
  Q1: 'Jan - Mar',
  Q2: 'Apr - June',
  Q3: 'July - Sept',
  Q4: 'Oct - Dec',
  '01B': 'Jan - Feb',
  '02B': 'Mar - Apr',
  '03B': 'May - June',
  '04B': 'July - Aug',
  '05B': 'Sep - Oct',
  '06B': 'Nov - Dec',
  S1: 'January - June',
  S2: 'July - December',
  April: 'Financial April',
  July: 'Financial July',
  Oct: 'Financial October'
};

export const periodTypesReferences: any = {
  Monthly: {
    priority: 2,
    name: 'Monthly',
    identifiers: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12'
    ]
  },
  Quarterly: {
    priority: 2,
    name: 'Quarterly',
    identifiers: ['Q1', 'Q2', 'Q3', 'Q4']
  },
  Yearly: {
    priority: 1,
    name: 'Yearly',
    identifiers: []
  }
};

export const operators: any = {
  less_than_or_equal_to: '<=',
  greater_than_or_equal_to: '>=',
  greater_than: '>',
  less_than: '<'
};
