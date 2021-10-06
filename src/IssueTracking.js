import React, { Component } from 'react'
import axios from "axios";
import { Table } from "react-bootstrap";
import './Table.css';
import { Panel, PanelGroup } from 'rsuite';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class IssueTracking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            "issueId": '',
            "assetId": '',
            "assetType": '',
            "subType": '',
            "reportedDateTime": '',
            "reportedBy": '',
            "associateNumber": '',
            "problemType": '',
            "enteredBy": '',
            "issueDiscription": '',
            "fromDate": new Date('10/07/2000, 12:00 AM'),
            "toDate": new Date()

        }
    }
    Changedate = (e) => {
        this.setState({
            fromDate: e,
            reportedDateTime: e,
            toDate: e
        });
    };
    changeIssue = (e) => {
        this.setState({
            issueDiscription: e.target.value
        });
    };

    clearText() {
        this.setState({
            "issueId": '',
            "assetId": '',
            "assetType": '',
            "subType": '',
            "reportedDateTime": '',
            "reportedBy": '',
            "associateNumber": '',
            "problemType": '',
            "enteredBy": '',
            "issueDiscription": ''
        })

    }

    //http://localhost:3004/posts/
    componentDidMount() {
        axios.get('http://localhost:3004/issues')
            .then(response => {
                this.setState({
                    posts: response.data
                })
                console.log(response.data)
            })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {

        const data = {
            issueId: this.state.issueId, assetId: this.state.assetId, assetType: this.state.assetType,
            subType: this.state.subType, reportedDateTime: this.state.reportedDateTime, reportedBy: this.state.reportedBy,
            problemType: this.state.problemType, associateNumber: this.state.associateNumber, enteredBy: this.state.enteredBy,
            issueDiscription: this.state.issueDiscription
        }
        e.preventDefault()
        axios.post('http://localhost:3004/issues', data)
            .then(response => {
                this.componentDidMount()
                console.log(response)
            })

       
        this.clearText();

    }



    render() {
        //const {posts} =this.state
        const { id, anbr, aid } = this.state
        const { assetId, associateNumber, problemType, reportedDateTime, issueDiscription, assetType } = this.state
        return (
            <div>
                <form >
                    <h3 className="m-3 d-flex justify-content-center">Issue Tracking</h3>
                    <PanelGroup>
                        <Panel header="List Issue By------" bordered>
                            <div className="row hdr" >
                                <div className="col-sm-2 form-group">
                                    <DatePicker
                                        placeholderText="From Date" showPopperArrow={true}
                                        onChange={this.Changedate}
                                        showTimeSelect
                                        dateFormat="Pp"
                                        selected={this.state.fromDate}
                                    />

                                </div>
                                <div className="col-sm-2 form-group">
                                    <DatePicker
                                        placeholderText="To Date" showPopperArrow={true}
                                        onChange={this.Changedate}
                                        showTimeSelect
                                        dateFormat="Pp"
                                        selected={this.state.toDate}
                                    />

                                </div>
                                <div className="col-sm-2 form-group">
                                    <input
                                        type='text'
                                        name='assetId'
                                        placeholder="Asset Id"
                                        onChange={this.changeHandler}
                                        value={assetId}></input>
                                </div>
                                <div className="col-sm-2 form-group">
                                    <select style={{ width: '150px', height: '32px' }}>
                                        <option>Asset Type</option>
                                        {
                                            this.state.posts.map((h, id) =>
                                                (<option key={id} value={h.assetType}>{h.assetType}</option>))
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-2 form-group">
                                    <button type='submit' style={{ background: "#161515", color: 'white', width: '100px' }}>Retrieve</button>&nbsp;&nbsp;&nbsp;
                                </div>
                            </div><br />
                            <div className="row hdr" >
                                <div className="col-sm-8 form-group">
                                    <input type="radio" value="DateRange" name="filter" /> All By Date Range &nbsp;&nbsp;
                                    <input type="radio" value="IdDate" name="filter" /> By Asset Id and date Range &nbsp;&nbsp;
                                    <input type="radio" value="AssetId" name="filter" /> By Asset Id &nbsp;&nbsp;
                                    <input type="radio" value="AssetType" name="filter" /> By Asset Type &nbsp;&nbsp;

                                </div>
                                <div className="col-sm-2 form-group">
                                    <button type='button' style={{ background: "#161515", color: 'white', width: '100px' }}>Close</button>&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        </Panel><br /><br /><br />


                        <Panel header="Asset Issues------" bordered >
                            <Table class="center" stiped bordered hover size="sm">

                                <thead >

                                    <tr className="align1" style={{ background: "#161515", color: 'white' }}>


                                        <th >assetId</th>
                                        <th>assetType</th>
                                        <th >subType</th>
                                        <th >reportedDateTime</th>
                                        <th>reportedBy</th>
                                        <th >associateNumber</th>
                                        <th >problemType</th>
                                        <th>enteredBy</th>
                                        <th>issueDiscription</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.posts.map((p, index) => {
                                            return <tr key={index} style={{ textAlign: 'center' }}>


                                                <th>{p.assetId}</th>
                                                <th>{p.assetType}</th>
                                                <th >{p.subType}</th>
                                                <th>{p.reportedDateTime}</th>
                                                <th>{p.reportedBy}</th>
                                                <th >{p.associateNumber}</th>
                                                <th>{p.problemType}</th>
                                                <th>{p.enteredBy}</th>
                                                <th>{p.issueDiscription}</th>


                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Panel><br /><br /><br />
                        <Panel header="Issue Detail Information------" bordered >
                            <div className="row hdr" >
                                <div className="col-sm-2 form-group">
                                    <input
                                        type='text'
                                        name='assetId'
                                        placeholder="Asset Id"
                                        onChange={this.changeHandler}
                                        value={assetId} required></input>
                                </div>
                                <div className="col-sm-2 form-group">
                                    <input
                                        type='text'
                                        name='associateNumber'
                                        placeholder="Reported by Associate nbr"
                                        onChange={this.changeHandler}
                                        value={associateNumber} required></input>
                                </div>
                                <div className="col-sm-2 form-group">
                                    <input
                                        type='text'
                                        name='problemType'
                                        placeholder="Problem Type"
                                        onChange={this.changeHandler}
                                        value={problemType} required></input>
                                    {/* <select style={{ width: '150px', height:'32px'}}
                                        >
                                        <option >Problem Type</option>
                                    {
                                        this.state.posts.map((h, id) =>
                                            (<option key={id} value={h.problemType}>{h.problemType}</option>))
                                    }
                                </select> */}
                                </div>
                                <div className="col-sm-2 form-group">

                                    <DatePicker
                                        placeholderText="Select Date" showPopperArrow={true}
                                        onChange={this.Changedate}
                                        showTimeSelect
                                        dateFormat="Pp"
                                        selected={reportedDateTime}
                                    />
                                </div>
                                <div className="col-sm-4 form-group">
                                    <textarea
                                        //type='textarea'
                                        name='issueDispciption'
                                        placeholder="Issue Discription"
                                        onChange={this.changeIssue}
                                        value={issueDiscription}
                                        //style={{ width: '500px' }}
                                    >
                                    </textarea>
                                </div>


                            </div>

                            <div className="row hdr" >
                                <div className="col-sm-4 form-group ">
                                    <button type='submit' onClick={this.submitHandler} style={{ background: "#161515", color: 'white', width: '100px' }}>Add</button>&nbsp;&nbsp;&nbsp;
                                    {/* </div>
                            <div className="col-sm-4 form-group"> */}
                                    <button type='submit' style={{ background: "#161515", color: 'white', width: '100px' }}>Cancel</button>&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        </Panel>
                    </PanelGroup>



                </form>

            </div>
        )
    }
}

export default IssueTracking