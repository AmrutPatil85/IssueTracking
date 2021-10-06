import React, { Component } from 'react'
import axios from "axios";
import { Table} from "react-bootstrap";
import './Table.css';
import { Label } from 'reactstrap';

class PostList extends Component{

    constructor(props){
        super(props)
        this.state ={
            posts: [],
            aid:'',
            anbr:'',
            id:0
            
        }
    }
    

    //http://localhost:3004/posts/
    componentDidMount(){
        axios.get('http://localhost:3004/checkin')
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

    submitHandler = (e,id) => {
        
        const data = { anbr:this.state.anbr,aid:this.state.aid}
        e.preventDefault()
        if(id===0){
            axios.post('http://localhost:3004/checkin', data)
                .then(response => {
                    this.componentDidMount()
                    console.log(response)
                })
        }
        else
        {
            axios.put(`http://localhost:3004/checkin/${id}`, data)
                .then(response => {
                    this.componentDidMount()
                    console.log(response)
                })
        }
       

        this.setState({
            aid: '',
            anbr: '',

        })
        
    }

    removeHandler = (e,id) => {
        //const data = { id: this.state.id}
        e.preventDefault()
        axios.delete(`http://localhost:3004/checkin/${id}`)
            .then(response => {
                /* this.setState({
                    posts: response.data
                }) */
                this.componentDidMount()
                console.log(response)
            })

    }

    EditHandler =(e,id) => {
        axios.get(`http://localhost:3004/checkin/${id}`)
        .then(response =>{
            this.setState({
                anbr:response.data.anbr,
                aid: response.data.aid,
                id: response.data.id
            })
        })
    }

    


    render(){
        //const {posts} =this.state
        //const { id, title, author } = this.state
        const {anbr,aid}=this.state
        return(
            <div>
                <form onSubmit={(e) => { this.submitHandler(e, this.state.id) }}>
                    <h3 className="m-3 d-flex justify-content-center">Check In</h3>
                
                     <div className="row hdr" >
                           
                            <div className="col-sm-2 form-group">
                            <Label>Associate nbr:</Label>&nbsp;
                                <input
                                    type='text'
                                    name='anbr'
                                    placeholder="Associate nbr"
                                    onChange={this.changeHandler}
                                    value={anbr}></input>
                            </div>
                            <div className="col-sm-2 form-group">
                            <Label>Asset id:</Label>&nbsp;
                                <input
                                    type='text'
                                    name='aid'
                                    placeholder="Asset id"
                                    onChange={this.changeHandler}
                                    value={aid}
                                    ></input>
                            </div>
                             <div className="col-sm-2 form-group">
                            <button type='submit' 
                            value={this.state.id===0?'Add':'Update'}
                            style={{ background:"#161515", color:'white', width:'100px'}}>
                            Add
                            </button>&nbsp;&nbsp;&nbsp;
                             </div>
                       
                    </div><br/>
                </form>
                    <Table class="center" stiped bordered hover size="sm">

                        <thead >

                            <tr className="align1" style={{ background:"#161515", color:'white'}}>
                                <th>Id</th>
                                <th >Associate nbr</th>
                                <th >Associate Id</th>
                                <th >Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.posts.map((p, index) => {
                                    return <tr key={index} style={{ textAlign:'center' }}>
                                        <th >{p.id}</th>
                                        <th>{p.anbr}</th>
                                        <th>{p.aid}</th>
                                        <th><button type='button' onClick={(e) => { this.removeHandler(e, p.id) }} style={{ background: "#161515", color: 'white', width: '100px' }}>Delete</button>&nbsp;&nbsp;
                                            <button type='button' onClick={(e) => { this.EditHandler(e, p.id) }} style={{ background: "#161515", color: 'white', width: '100px' }}>Update</button></th>
                                        
                                        
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                   
                       
                    
                   
                </div>
        )
    }
}

export default PostList