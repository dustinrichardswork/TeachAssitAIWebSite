import React, { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";

import Login from "./GoogleButtons/Login";
// import Logout from "./GoogleButtons/Logout";
import { gapi } from "gapi-script";


import doc from "../../images/Icons/doc.png";
import docs from "../../images/Icons/google_doc.png";
import excel from "../../images/Icons/excel.png";
import pdf from "../../images/Icons/pdf.png";
import { UsageContext } from "../../context/UsageContext";
import { ChatbotContext } from "../../context/ChatbotContext";


// LocalHost
// const CLIENT_ID = '701706349964-qs7l3rc6td3anqm53l8r04ib83aaqdh7.apps.googleusercontent.com'
// const API_KEY = "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"
// const SCOPES = "https://www.googleapis.com/auth/drive";


// Production
const CLIENT_ID = '700989349221-o958kd0tivmmrtuqd9v1fl51t17jpaa5.apps.googleusercontent.com'
const API_KEY = "AIzaSyDFKgXAsTphgknMumDBBoWJ5jiHOYKv8Uk"
const SCOPES = "https://www.googleapis.com/auth/drive";

const ExportButtons = ({
  componentToPrint,
  // answer 
}) => {

  const { usage } = useContext(UsageContext);
  const { answerForPrint: answer } = useContext(ChatbotContext);

  const generateDocx = () => {
    let documentFileContent = "Title: Lisa The General Lesson Planner\n\n";
    for (let i = 0; i < answer.length; i++) {
      if (i == 0) {
        documentFileContent += answer[i]["answer"] + "\n\n";
        continue;
      }

      documentFileContent += "Question: " + answer[i]["question"] + "\n";
      documentFileContent += "Answer: " + answer[i]["answer"] + "\n\n";
    }

    documentFileContent = documentFileContent.replace(/<br\s*\/?>/g, "\n\n");

    var url =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(documentFileContent);
    const filename = "Lisa-The-General_Lesson-History.doc";
    var downloadLink = document.createElement("a");

    downloadLink.href = url;

    downloadLink.download = filename;
    downloadLink.click();
  };

  const handleToXLSX = () => {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const trH = document.createElement("tr");

    const thQ = document.createElement("th");
    thQ.innerText = "Questions";

    const thA = document.createElement("th");
    thA.innerText = "Answer";

    trH.append(thQ);
    trH.append(thA);

    thead.append(trH);

    table.append(thead);

    const tbody = document.createElement("tbody");

    for (let i = 0; i < answer.length; i++) {
      const tr = document.createElement("tr");
      if (i == 0) {
        tr.append(document.createElement("td"));
        const tdAns = document.createElement("td");
        tdAns.innerText = answer[i]["answer"];
        tr.append(tdAns);
        tbody.append(tr);
        continue;
      }

      const tdQuestion = document.createElement("td");
      tdQuestion.innerText = answer[i]["question"];

      const tdAnswer = document.createElement("td");
      tdAnswer.innerText = answer[i]["answer"];

      tr.append(tdQuestion);
      tr.append(tdAnswer);

      tbody.append(tr);
    }

    table.append(tbody);

    // Extract Data (create a workbook object from the table)
    var workbook = XLSX.utils.table_to_book(table);

    // Process Data (add a new row)
    var ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], {
      origin: -1,
    });

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(workbook, "Report.xlsb");
  };

  const handleToPrint = useReactToPrint({
    content: () => componentToPrint.current,
    documentTitle: "JLegacy-AI",
    onAfterPrint: () => alert("🖨️ Printing Success 🖨️"),
    pageStyle: `@media print {
            * { overflow: visible !important; } 
            @page {
            size: 210mm 297mm;
            margin: 10mm 5mm 10mm 5mm;
            }
        }`,
  });

  const handleGoogleDocClick = () => {
    if (gapi.auth.getToken()) {
      handleGoogleDoc()
    } else {
      alert('You are not loggedin');
    }
  }

  const handleGoogleDoc = () => {

    let tag = 'Test';
    let fileName = tag + ' ' + getDateString() + " " + getTimeString();
    let accessToken = gapi.auth.getToken().access_token


    let documentFileContent = "Title: Lisa The General Lesson Planner\n\n";
    for (let i = 0; i < answer.length; i++) {
      if (i == 0) {
        documentFileContent += answer[i]["answer"] + "\n\n";
        continue;
      }

      documentFileContent += "Question: " + answer[i]["question"] + "\n";
      documentFileContent += "Answer: " + answer[i]["answer"] + "\n\n";
    }

    documentFileContent = documentFileContent.replace(/<br\s*\/?>/g, "\n\n");




    fetch("https://docs.googleapis.com/v1/documents?title=" + fileName, {
      method: 'POST',
      headers: new Headers({ 'Authorization': "Bearer " + accessToken }),

    })
      .then((res) => res.json())
      .then((val) => {
        fetch(`https://docs.googleapis.com/v1/documents/${val.documentId}:batchUpdate`, {
          method: 'POST',
          headers: new Headers({
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            requests: [
              {
                insertText: {
                  location: {
                    index: 1, // Index where you want to insert the text (1 for beginning)
                  },
                  text: documentFileContent,
                },
              },
            ],
          }),
        })
          .then((updateResponse) => {
            if (updateResponse.ok) {
              console.log('Text inserted successfully.');
              console.log(updateResponse);
              // window.open(updateResponse.url.replace(":batchUpdate"))
            } else {
              console.error('Error inserting text:', updateResponse.statusText);
            }
          })
          .catch((error) => {
            console.error('Error updating the document:', error);
          });
        console.log('Value: ', val);
        console.log('Value: ', val.documentId);
        window.open('https://docs.google.com/document/d/' + val.documentId + "/edit")
        // window.open('https://docs.google.com/document/d/' + val.documentId + "/edit", "_blank")
      })

  };


  // helper Functions
  const zerofill = (i) => { return (i < 10 ? "0" : '') + i; }
  const getDateString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = zerofill(date.getMonth() + 1);
    const day = zerofill(date.getDate());
    return year + '-' + month + '-' + day
  }
  const getTimeString = () => {
    const date = new Date();
    return date.toLocaleTimeString();
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
    };

    gapi.load("client:auth2", start)
  }, [])

  return (
    <div className="flex justify-end gap-5 items-center">
      <div>
        {/* <Logout /> */}
      </div>
      <div className=" flex gap-5 relative overflow-hidden">
        {[
          // {
          //   image: excel,
          //   fn: handleToXLSX,
          //   text: 'Export Excel'
          // },
          {
            image: pdf,
            fn: handleToPrint,
            text: 'Export PDF'
          },
          {
            image: doc,
            fn: generateDocx,
            text: 'Export WORD DOC'
          },
          // {
          //   image: docs,
          //   fn: handleGoogleDocClick,
          //   text: 'Export Google DOC'
          // }
        ].map((el, i) => {
          return (
            <div className="flex flex-col gap-1 justify-center items-center">
              {
                usage?.plan === 'Professional' ? (
                  <>
                    <img
                      key={i}
                      src={el.image}
                      alt="icon"
                      className="w-16  cursor-pointer"
                      onClick={() => el.fn()}
                    />
                    <div>{el.text}</div>
                  </>
                ) : (
                  <>
                    <img
                      key={i}
                      src={el.image}
                      alt="icon"
                      className="w-16 cursor-not-allowed"
                    />
                    <div>{el.text}</div>
                  </>
                )
              }
            </div>
          );
        })}
        {/* <Login /> */}
      </div>
    </div>
  );
};

export default ExportButtons;
