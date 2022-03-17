import React from 'react'
import notice from '../media/notice.jpg'
const Notice = () => {
  return (
    <div className="mx-5 py-4 px-8 bg-white shadow-lg rounded-lg my-20">
    <div className="flex justify-center md:justify-end -mt-16">
      <img alt='notice' className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src={notice} />
    </div>
    <div>
        <h2 className="text-gray-800 text-3xl font-semibold">Notice d'utilisation : </h2>
        <p className="mt-2 text-gray-700">
            <b>Ce tableau de bord comporte deux graphiques : </b>
            <ul className="list-disc">
                <li>Le premier graphe liste les protocoles sous format de diagramme circulaire et ayant comme valeur le pourcentage de chaque protocole par rapport à l'ensemble des protocoles </li>
                <li>Le second graphe est un diagramme en bâtons qui liste les adresses IP avec leurs "Value" et "symbolSize" respectives  </li>
    
            </ul>
        </p>
        <p className="mt-2 text-gray-700">
            <b>Comment filtrer les données ? </b>
            <ul className="list-disc">
                Vous pouvez filtrer les données en utilisant trois critères de filtrage : "Value" , "symbolSize" et le type de protocole
                <li> Filtrer par "Value" : en faisant progresser la premiere barre les données seront filtrées selon la valeur minimale de "value" </li>
                <li> Filtrer par "symbolSize" : en faisant progresser la seconde barre les données seront filtrées selon la valeur minimale de "symbolSize"</li>
                <li> Filtrer par type de protocole : en cliquant sur le protocole figurant sur le diagramme circulaire les données seront filtrées selon le protocole en question  </li>
                <li> Vous pouvez utiliser l'un de ces criteres de filtrage ou combiner 2 ou les 3 en même temps </li>
                <li> Le bouton "Réinitialiser les critères de filtrage" permet de visualiser les données avant filtrage   </li>
    
            </ul>
        </p>
    </div>

  </div>
  )
}

export default Notice