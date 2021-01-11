const invoices = [
  {
    number: 1,
    vessel: 'MSC Larissa',
    voyage: '001S',
    bl: 'MSCUN0000111',
    container: 'MSCU0000222',

    lines: [
      {
        jobDescription: 'Sea freight',
        quantity: 1,
        cost: 1000,
      },
      {
        jobDescription: 'THC',
        quantity: 1,
        cost: 200,
      },
      {
        jobDescription: 'Storage',
        quantity: 1,
        cost: 100,
      },
    ],
    linesNumber: 3,
    total: 1300,
  },
  {
    number: 2,
    vessel: 'MSC Vega',
    voyage: '001S',
    bl: 'MSCUN0000111',
    container: 'MSCU0000222',

    lines: [
      {
        jobDescription: 'Sea freight',
        quantity: 1,
        cost: 1000,
      },
      {
        jobDescription: 'THC',
        quantity: 1,
        cost: 200,
      },
      {
        jobDescription: 'Storage',
        quantity: 1,
        cost: 100,
      },
    ],
    linesNumber: 3,
    total: 1300,
  },
  {
    number: 3,
    vessel: 'MSC Poti',
    voyage: '001S',
    bl: 'MSCUN0000111',
    container: 'MSCU0000222',

    lines: [
      {
        jobDescription: 'Sea freight',
        quantity: 1,
        cost: 1000,
      },
      {
        jobDescription: 'THC',
        quantity: 1,
        cost: 200,
      },
      {
        jobDescription: 'Storage',
        quantity: 1,
        cost: 100,
      },
    ],
    linesNumber: 3,
    total: 1300,
  },
]

export default invoices
