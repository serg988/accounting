import React from 'react'
import './CompanyDetailsTable.css'

const CompanyDetailsTable = () => {
  return (
    <table className='tg' style={{ width: '100%' }}>
      <thead>
        <tr>
          <th className='tg-54vp text-center' colSpan='9'>
            Образец заполнения платежного поручения
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='tg-fzq1' colSpan='2'>
            ИНН 2315170112
          </td>
          <td className='tg-fzq1' colSpan='3'>
            КПП 231501001
          </td>
          <td className='tg-fzq1' colSpan='4' rowSpan='2'></td>
        </tr>
        <tr>
          <td className='tg-fzq1' colSpan='5'>
           <strong>Получатель: ООО "Бартранс Логистика"</strong> 
          </td>
        </tr>
        <tr>
          <td className='tg-fzq1' colSpan='5'>
            Филиал "Центральный" Банка ВТБ (ПАО) в г. Москва
          </td>
          <td className='tg-fzq1'>р/с</td>
          <td className='tg-fzq1' colSpan='3'>
            <strong>40702810204550000077</strong>
          </td>
        </tr>
        <tr>
          <td className='tg-fzq1' colSpan='5' rowSpan='3'>
            Банк получателя: Филиал "Центральный" Банка ВТБ (ПАО) в г. Москва
          </td>
          <td className='tg-fzq1' rowSpan='2'>
            БИК
          </td>
          <td className='tg-fzq1' colSpan='3' rowSpan='2'>
            <strong>044525411</strong>
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td className='tg-fzq1'>к/c</td>
          <td className='tg-fzq1' colSpan='3'>
            30101810145250000411
          </td>
        </tr>
        <tr>
          <td className='tg-fzq1' colSpan='9'></td>
        </tr>
      </tbody>
    </table>
  )
}

export default CompanyDetailsTable
