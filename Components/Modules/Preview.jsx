import {useRef,useState} from "react";
import Template1 from "../Templates/Template1/Template1";
import html2pdf from 'html2pdf.js';
import Image from "next/image";
import {
  
  Document,
  Page,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import styles from "./Preview.module.css";
import Template2 from "../Templates/Template2";

const style = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Preview = ({name, resumeData }) => {
  const [template, setTemplate] = useState(1); 
  const pdfRef = useRef(null);
  console.log(name);

  const generatePDF = () => {
    const element = document.getElementById('pdf-document'); // Replace with the ID of the HTML element you want to convert to PDF
    const pdfOptions = {
      margin: 10,
      filename: `${name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    console.log(element);

    html2pdf()
      .from(element)
      .set(pdfOptions)
      .save()
      
  };
  return (
    <div className={styles.preview}>
      <div className={styles.templates}>
        <h3 className={styles.heading}>Templates</h3>
        {/* template  */}
        <div className={styles.template} onClick={()=>setTemplate(1)}>
        <Image src={'/images/pdf.png'} width={400} height={400} alt='temp1'></Image>
          <label htmlFor="temp">Template 1</label>
        </div>
        {/* template  */}
        <div className={styles.template} onClick={()=>setTemplate(2)}>
        <Image src={'/images/pdf2.png'} width={400} height={400} alt='temp2'></Image>
          <label htmlFor="temp">Template 2</label>
      </div>
      </div>
       <button onClick={generatePDF} className={styles.generate__button}><Image src={'/images/download.gif'} width={20} height={20} alt='download'/> Download </button>
      <div className={styles.preview__tile}>
    
        <Document className="resume" id={'pdf-document'}>
          <Page size="A4" style={style.page}>
            <View style={style.section}>
              {template == 1 &&<Template1 data={resumeData} />}
              { template==2&&<Template2 data={resumeData}/> }
            </View>
          </Page>
        </Document>
      </div>
    </div>
  );
};

export default Preview;

