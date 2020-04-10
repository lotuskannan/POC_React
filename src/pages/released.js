import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Released extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
           data: []           
        }          
    };
      
    render() {        
        return (
            <div className="row">              
            <div className="col-md-12">
            <table className="table table-bordered">
                <thead>
                    <tr>                        
                        <td>ID</td>
                        <td>Laboratory Id</td>
                        <td>Reason Code</td>
                        <td>Record ID</td>
                        <td>Sample Point</td>
                        <td>Sample Date</td>
                        <td>Collected By</td>
                        <td>Status</td>
                    </tr>
                </thead>
            <tbody>                    
            {
                this.state.data.length != 0
                ? this.state.data.map((Object, index) => {
                      return (                          
                        <tr key={index}>                            
                            <td>{Object.Id}</td>
                            <td>{Object.LaboratoryId}</td>
                            <td>{Object.ReasonCode}</td>
                            <td>{Object.RecordId}</td>
                            <td>{Object.SamplePoint}</td>
                            <td>{Object.SampleDate}</td>
                            <td>{Object.CollectedBy}</td>
                            <td>{Object.Status}</td>                 
                        </tr>
                      )
                    },
                  )
                : null
            }               
                </tbody>
                </table>
                </div> 
            </div>
        );
    }
    componentDidMount(){
        axios.get("http://localhost/Naga_POC/getReleseList.php").then(res => {            
            var tempData = [];
            for(var i=0;i<res.data.length;i++){
                tempData.push({       
                    "sampleDataID": res.data[i].sampleDataID,            
                    "Id": res.data[i].Id,
                    "LaboratoryId": res.data[i].LaboratoryId,
                    "ReasonCode": res.data[i].ReasonCode,
                    "RecordId": res.data[i].RecordId,
                    "SamplePoint": res.data[i].SamplePoint,
                    "SampleDate": res.data[i].SampleDate,
                    "CollectedBy": res.data[i].CollectedBy,
                    "Status": res.data[i].Status       
                })
            }
            this.setState({data:tempData})
        })
    }     
}

export default Released;
