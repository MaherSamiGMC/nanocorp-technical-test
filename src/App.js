import { useEffect, useState,Fragment } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getData } from './redux/actions';
import RangeSlider from './components/RangeSlider';
import IpChart from './components/IpChart';
import ProtocolChart from './components/ProtocolChart';
import { Dialog, Transition } from '@headlessui/react';
import logo from './media/logo.png'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'
import Stats from './components/Stats';
import Notice from './components/Notice';

const navigation = [
  { name: 'tabeau de bord', href: '#', icon: HomeIcon, current: true },
  { name: 'Lien 1', href: '#', icon: UsersIcon, current: false },
  { name: 'Lien 2', href: '#', icon: FolderIcon, current: false },
  { name: 'Lien 3', href: '#', icon: CalendarIcon, current: false },
  { name: 'Lien 4', href: '#', icon: InboxIcon, current: false },
  { name: 'Lien 5', href: '#', icon: ChartBarIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [reset, setReset] = useState(false)
  const [protocoles, setProtocoles] = useState(true)
  const [filteringCriteria, setfilteringCriteria] = useState({byValue:0,bySymbolSize:0,byProtocol:""})
  const updatingFilteringValue=(byValue)=>{
    setfilteringCriteria((prevState)=>({...prevState,byValue}))
  }
  const updatingFilteringSymbolSize=(bySymbolSize)=>{
    setfilteringCriteria((prevState)=>({...prevState,bySymbolSize}))
  }
  const updatingFilteringProtocol=(byProtocol)=>{
    setfilteringCriteria((prevState)=>({...prevState,byProtocol}))
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getData())
  }, [dispatch])
  
  const {fetchingDataReducer:{allData}}=useSelector(state=>state)
  const maxValue = allData && allData.data.map(el=>Number(el.value)).reduce((prev, current) => (prev > current) ? prev : current,0)
  const maxSymbolSize = allData && allData.data.map(el=>el.symbolSize).reduce((prev, current) => (prev > current) ? prev : current,0)
  const ipNumber=allData && allData.data.length
  let pieData=[]
  // pieData is an array of objects with two keys : the first one "label" indicates the type of protocol (tcp,http...) 
  // the second one is "value" that indicates how many times the protocol appears in the original array allData.links
  allData && allData.links.forEach((el=>{
    if(pieData.some((val)=>{ return val["label"] === el["label"] })){  
        pieData.forEach((k)=>{
          if(k["label"] === el["label"]){ 
            k["value"]++
          }
      })       
      }else{
        let newObject = {}
        newObject["label"] = el["label"]
        newObject["value"] = 1
        pieData.push(newObject);
      }
  }))

  return (
    <>  
  <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">barre latérale</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src={logo}
                    alt="nanoCorp"
                  />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                          'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">Compte utilisateur</p>
                      <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">Voir profil</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component */}
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="Nanocorp"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Compte utilisateur</p>
                    <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">Voir profil</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">barre latérale </span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord : </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Stats item={{maxValue:maxValue,maxSymbolSize:maxSymbolSize,ipNumber}} />
            </div>
          </div>
          <div className='flex mx-5'>
                <div className="w-1/3 m-1 px-4 py-5   bg-white shadow rounded-lg overflow-hidden sm:p-6" >
                  <div className="text-sm font-medium text-gray-500 truncate">Filtrer par "Value" : </div>
                  <RangeSlider reset={reset} setReset={setReset} type={'value'} maxValue={maxValue} updatingCriteria={updatingFilteringValue} filteringCriteria={filteringCriteria} />
                  <div className="text-sm font-medium text-gray-500 truncate">Filtrer par "symbolSize" : </div>
                  <RangeSlider reset={reset} setReset={setReset} type={'symbolSize'} maxValue={maxSymbolSize} updatingCriteria={updatingFilteringSymbolSize} filteringCriteria={filteringCriteria} />
                  <button
                    onClick={()=>{
                      setProtocoles(true)
                      setReset(true)
                      setfilteringCriteria({byValue:0,bySymbolSize:0,byProtocol:""})
                      dispatch(getData())}}
                    type="button"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Réinitialiser les critères de filtrage
                  </button>
                </div>
                <div className="w-2/3 m-1 px-4 py-5 h-[494px] bg-white shadow rounded-lg overflow-hidden sm:p-6" >
                  <div className="text-sm font-medium text-gray-500 truncate">{protocoles ? "L'ensemble des protocoles :" : "Protocole selectionné :" } </div>
                  <ProtocolChart pieData={pieData} updatingFilteringProtocol={updatingFilteringProtocol} filteringCriteria={filteringCriteria} setProtocoles={setProtocoles} />
                </div>
          </div> 
          <div>
                <div className="m-5 px-4 py-5 h-[494px] bg-white shadow rounded-lg overflow-hidden sm:p-6" >
                  <div className="text-sm font-medium text-gray-500 truncate">Diagramme en bâtons IP/(value,symbolSize) : </div>
                  <IpChart />
                </div>
          </div> 
          <div>
            <Notice/>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

export default App;
