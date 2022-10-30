import React, {useEffect, useState} from 'react';
import Button from '@atlaskit/button';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { R400 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';


export default function HelloWorld() {

  const [issueKey,setIssueKey] = useState("");
  const [newValue,setNewValue] = useState("");


  useEffect(() => {
      console.log("Artık reactla akabilirim abiler ")
  },[])
    const handleChange = (event) => {
      if(event.target.name === "issueKey"){
          setIssueKey(event.target.value)
      }else{
          setNewValue(event.target.value)
      }
    }
    const [flags, setFlags] = useState([]);

    const addFlag = () => {
        const newFlagId = flags.length + 1;
        const newFlags = flags.slice();
        newFlags.splice(0, 0, newFlagId);

        setFlags(newFlags);
    };

    const handleDismiss = () => {
        setFlags(flags.slice(1));
    };


    const updateIssue = async () => {
      console.log(newValue,issueKey);
        await AP.request('/rest/api/3/issue/'+issueKey, {
            success: function(response){
                setNewValue(JSON.parse(response).fields.summary)
            },
            error: function (response){
                AP.flag.create({title:"Error",body:JSON.stringify(response),type:'error'})
            }
        });
    }
    return (<>
      <div className={"container"}>

          <h1>
              Issue Güncelleme ekranı
          </h1>

          <div className="row">
              <div className="col-2">güncellenecek Issue</div>
              <div className="col-9">
                  <input name="issueKey" onChange={handleChange}/>
              </div>
              <div className="w-100 mt-2"></div>
              <div className="col-2">
              </div>
              <div className="col mt-2">
                  <Button appearance="primary" onClick={() => updateIssue()}>Get summary</Button>
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
        <div>
            <FlagGroup onDismissed={handleDismiss}>
                {flags.map((flagId) => {
                    return (
                        <AutoDismissFlag
                            appearance="error"
                            id={flagId}
                            icon={
                                <ErrorIcon
                                    label="Error"
                                    secondaryColor={token('color.background.danger.bold', R400)}
                                />
                            }
                            key={flagId}
                            title={`#${flagId} I'm an error`}
                            description="I will auto dismiss after 8 seconds."
                        />
                    );
                })}
            </FlagGroup>
        </div>
  </>)
}
