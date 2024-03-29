import React from 'react'

const Stats = ({item}) => {
  return (
    <div>
    <h3 className="text-lg leading-6 font-medium text-gray-900">Statistiques : </h3>
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Valeur maximale de "Value" : </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.maxValue}</dd>
        </div>

        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Valeur maximale de "symbolSize" : </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.maxSymbolSize}</dd>
        </div>

        <div  className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Nombre d'adresses IP : </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.ipNumber}</dd>
        </div>
    </dl>
  </div>
  )
}

export default Stats