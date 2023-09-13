import axios from "axios";
import './App.css'

function parseXml(xmlStr) {
  if (window.DOMParser) {
    const parser = new DOMParser();
    return parser.parseFromString(xmlStr, "text/xml");
  }

  // Fallback for IE
  xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async = false;
  return xmlDoc.loadXML(xmlStr);
}

function App() {
  const handleXmlFile = async () => {
    const url =
      "/colony-boundary.kml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA47WVZIOYRCPZTUHG%2F20230912%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230912T134137Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=2173d0ff044172d9df5b0d95f84c193243a04eed9a807635231cde58dcc9181c";
    const apiCall = await axios.get(url);
    const xmlDoc = await parseXml(apiCall.data);
    const coords = xmlDoc.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
    console.log(coords);
  }
  return (
    <button onClick={handleXmlFile}>Fetch xml/kml doc and read map coords</button>
  )
}

export default App
