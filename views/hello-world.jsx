import React, {useEffect, useState} from 'react';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';


export default function HelloWorld() {

  const [issueKey,setIssueKey] = useState("");
  const [newValue,setNewValue] = useState("");


  useEffect(() => {
      console.log("Artık reactla akabilirim abiler ")
      getIssues();
  },[])
    const handleChange = (event) => {
      if(event.target.name === "issueKey"){
          setIssueKey(event.target.value)
      }else{
          setNewValue(event.target.value)
      }
    }


    const getIssueSummary = async () => {
        await AP.request('/rest/api/3/issue/'+issueKey, {
            success: function(response){
                setNewValue(JSON.parse(response).fields.summary)
            },
            error: function (response){
                AP.flag.create({title:"Error",body:JSON.stringify(response),type:'error'})
            }
        });
    }
    const updateIssue = async () => {
        await AP.request('/rest/api/3/issue/'+issueKey, {
            type:"PUT",
            contentType:'application/json',
            data : JSON.stringify({fields : {summary: newValue}}),
            success: function(){
                console.log("success")
                AP.flag.create({title:"Successs",body:";Issue updated",type:'success'})
            },
            error: function (response){
                console.log("sıkıntı var",response)
                AP.flag.create({title:"Error",body:JSON.stringify(response),type:'error'})
            }
        });
    }

    const getIssues = async () => {
      await  AP.request('/rest/api/3/issue/picker?query=test',{
          contentType:'application/json',
          success: (response) => {
              console.log(response);
          }
      })
    }

    const SelectSingleExample = () => (
        <>
            <Select
                inputId="single-select-example"
                className="single-select"
                classNamePrefix="react-select"
                options={[
                    { label: 'Adelaide', value: 'adelaide' },
                    { label: 'Brisbane', value: 'brisbane' },
                    { label: 'Canberra', value: 'canberra' },
                    { label: 'Darwin', value: 'darwin' },
                    { label: 'Hobart', value: 'hobart' },
                    { label: 'Melbourne', value: 'melbourne' },
                    { label: 'Perth', value: 'perth' },
                    { label: 'Sydney', value: 'sydney' },
                ]}
                placeholder="Choose a city"
            />
        </>
    );

    return (<>
      <div className={"container"}>

          <h1>
              Issue Güncelleme ekranı
          </h1>

          <div className="row">
              <div className="col-2">güncellenecek Issue</div>
              <div className="col-9">
                  <SelectSingleExample/>
              </div>
              <div className="w-100 mt-2"></div>
              <div className="col-2">
              </div>
              <div className="col mt-2">
                  <Button appearance="primary" onClick={() => getIssueSummary()}>Get summary</Button>
              </div>
              <div className="w-100 mt-2"></div>
              <div className="col-2">
                  Ne yazmak istersin
              </div>
              <div className="col">
                  <input name="newDesc" onChange={handleChange} value={newValue}/>
              </div>
              <div className="w-100"></div>
              <div className="col-2">
              </div>
              <div className="col mt-2">
                  <Button appearance="primary" onClick={() => updateIssue()}>kaydet</Button>
              </div>
          </div>
      </div>

  </>)
}
