import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
           data: [],
           selectAllCheckbox:false,
           checked: [],
           value: null,
           search:'',
           test:''
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);        
    };
    selectAllCheckbox = (e) => {
        var selectAll = e.target.checked;        
        this.setState({ selectAllCheckbox: selectAll });
        if(e.target.checked == true){
            var TempObject = this.state.data;
            for(var i=0;i<TempObject.length;i++){
                TempObject[i].checkedValue = true;
            }
            this.setState({ data: TempObject });
        }
        if(e.target.checked == false){
            var TempObject = this.state.data;
            for(var i=0;i<TempObject.length;i++){
                TempObject[i].checkedValue = false;
            }
            this.setState({ data: TempObject });
        }
    }
    singleCheckbox = (index,ObjectValue, date) => {
        if(this.state.selectAllCheckbox == true){
            this.setState({ selectAllCheckbox: false });
        }
        var TempObject = this.state.data;
        for(var i=0;i<TempObject.length;i++){
            if(i==index){
                (TempObject[i].checkedValue == true) ? TempObject[i].checkedValue = false:TempObject[i].checkedValue = true; 
            }
        }
        this.setState({ data: TempObject });
    }    
    handleSearchChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({
            search: value
        });
        this.setState({data:""}); 
        axios.get("http://localhost/Naga_POC/index.php?q="+value).then(res => {            
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
                    "Status": res.data[i].Status,
                    "checkedValue":false                 
                })
            }
            this.setState({data:tempData});
        });
    }
    RefreshDataGrid=()=>{  
        this.setState({data:""});      
        axios.get("http://localhost/Naga_POC/index.php").then(res => {            
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
                    "Status": res.data[i].Status,
                    "checkedValue":false                 
                })
            }
            this.setState({data:tempData});
            this.setState({search:''});
            this.setState({});                    
        });        
    }   
    SaveObject=()=>{        
        var TempObject = this.state.data;
        var TempReqObject = [];
        var Flag = 0;
        for(var i=0;i<TempObject.length;i++){
            if(TempObject[i].checkedValue == true){
                Flag = 1;
                TempReqObject.push({
                    "sampleDataID": TempObject[i].sampleDataID
                })
            }
        }
        if(Flag == 1){
            var formData = new FormData()
            formData.append('requestData', JSON.stringify(TempReqObject));
            axios.post('http://localhost/Naga_POC/saveStatus.php', formData) .then(function (response) {                        
            });            
            window.location.href = window.location.href;
        }                      
    }

    ReleaseObject=()=>{
        var TempObject = this.state.data;
        var TempReqObject = [];
        var Flag = 0;
        for(var i=0;i<TempObject.length;i++){
            if(TempObject[i].checkedValue == true){
                var Flag = 1;
                TempReqObject.push({
                    "sampleDataID": TempObject[i].sampleDataID
                })
            }
        }
        if(Flag == 1){        
            var formData = new FormData()
            formData.append('requestData', JSON.stringify(TempReqObject));
            axios.post('http://localhost/Naga_POC/releaseStatus.php', formData) .then(function (response) {                        
            });            
            window.location.href = window.location.href;
        }  
    }
    render() {        
        return (
            <div className="row"> 
            <div className="col-md-12 searchdiv">
                <div className="row">
                    <div className="col-md-8">
                        <input type="text" id="txtSearch" name="txtSearch"
                        placeholder="Search" onChange={this.handleSearchChange} value={this.state.search}/>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-6">
                                <input type="button" id="btnSave" name="btnSave" value="Save" onClick={this.SaveObject}></input>    
                            </div>
                            <div className="col-md-6">
                                <input type="button" id="btnRelease" name="btnRelease" value="Release" onClick={this.ReleaseObject}></input>    
                            </div>
                        </div>
                    </div> 
                </div>    
            </div>
            <div className="col-md-12">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td><input
                        type="checkbox"
                        onChange={this.selectAllCheckbox.bind(this)}
                        checked={this.state.selectAllCheckbox}
                      /></td>
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
                this.state.data.length > 0
                ? this.state.data.map((Object, index) => {
                      return (                          
                        <tr key={index}>
                            <td>
                                <input type="checkbox" checked={Object.checkedValue}
                                onChange={this.singleCheckbox.bind(this,index,Object)}/>
                            </td>
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
        this.setState({data:[]});
        axios.get("http://localhost/Naga_POC/index.php").then(res => {            
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
                    "Status": res.data[i].Status,
                    "checkedValue":false                 
                })
            }
            this.setState({data:tempData})
        })       
    }     

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }
}

export default Search;
