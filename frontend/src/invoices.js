export const invoices = [
  {
    id: 1,
    customerId: 1,
    customerName: 'TSRZ',
    date: '1.1.2020',
    invoiceTotal: 1300,
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
  },
  {
    id: 2,
    customerId: 1,
    customerName: 'Fortuna',
    date: '2.2.2020',
    invoiceTotal: 1850,
    lines: [
      {
        jobDescription: 'Sea freight',
        quantity: 1,
        cost: 1500,
      },
      {
        jobDescription: 'THC',
        quantity: 1,
        cost: 250,
      },
      {
        jobDescription: 'Storage',
        quantity: 1,
        cost: 100,
      },
    ],
  },
]
