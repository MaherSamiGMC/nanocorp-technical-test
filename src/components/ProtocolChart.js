import {Tooltip,ResponsiveContainer,PieChart,Pie,Legend,Cell } from 'recharts';
import { useDispatch } from 'react-redux';
import { filterData } from '../redux/actions';

const ProtocolChart = ({pieData,updatingFilteringProtocol,filteringCriteria,setProtocoles}) => {
    const dispatch = useDispatch()
    const COLORS = ["#4D86A5", "#CF0BF1", "#12E2F1", "#3E517A","#98DA1F", "#FC9F5B", "#D60B2D", "#C3C4E9","#9CC76D", "#0000FF"];
  return (
    <ResponsiveContainer width="100%" height="100%" >
    <PieChart>
        <Pie onClick={(x)=>{
        setProtocoles(false)
        updatingFilteringProtocol(x.name)
        dispatch(filterData(filteringCriteria.byValue,filteringCriteria.bySymbolSize,x.name))}} data={pieData} dataKey="value" nameKey="label" cx="50%" cy="50%"  fill="#8884d8" label  >
        {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36}/>
    </PieChart>
    </ResponsiveContainer>
  )
}

export default ProtocolChart