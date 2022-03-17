
const initState={loading:true}

export const fetchingDataReducer=(state=initState,action)=>{
    switch (action.type) {
        case "FETCHING_DATA_REQUEST":
            return {loading:true}
        case "FETCHING_DATA_SUCCESS":
            return {loading:false,allData:action.data}
        case "FETCHING_DATA_FAIL":
            return {loading:false,error:action.error}
        case "FILTERING_DATA_REQUEST":
            return {loading:true}
        case "FILTERING_DATA_SUCCESS":
            // filtredLinksByProtocol returns an array of objects with filtered data (links array) by ptotocol type 
            const filtredLinksByProtocol=action.data.links.filter(el=>el.label.includes(action.payload.protocol))
            // filteredData returns an array of objects with filtered data (data array) by ptotocol and IP address minCount Value & minCount Symbol Size
            let filteredData=[]
            if (action.payload.protocol===""){
                filteredData=action.data.data
                .filter(el=>Number(el.value) >= action.payload.minCountV && Number(el.symbolSize) >= action.payload.minCountSZ)
            }else {
                filteredData=action.data.data
                .filter(el=>Number(el.value) >= action.payload.minCountV && Number(el.symbolSize) >= action.payload.minCountSZ)
                .filter(el=>filtredLinksByProtocol.find(item=>item.source===el.name) || filtredLinksByProtocol.find(item=>item.target===el.name))
            }
            // filteredData returns an array of strings with Ip address as elements of the array
            const filteredDataIp=filteredData.map(el=>el.name)
            // filterdedLinks returns an array of objects with filtered data (links array) by IP address minCount Value & minCount Symbol Size
            const filterdedLinks=action.data.links
            .filter(el=> filteredDataIp.find(ip=>ip===el.source) || filteredDataIp.find(ip=>ip===el.target))
            .filter(el=>el.label.includes(action.payload.protocol))
            return {loading:false,allData:{data:filteredData,links:filterdedLinks}}  
        case "FILTERING_DATA_FAIL":
            return {loading:false}
        default:
            return state;
    }
}

