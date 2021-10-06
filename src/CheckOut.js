import React, { Component } from 'react'
import axios from "axios";
import { Table } from "react-bootstrap";
import './Table.css';

class CheckOut extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            aid: '',
            anbr: ''
            

        }
    }

    //http://localhost:3004/posts/
    componentDidMount() {
        axios.get('http://localhost:3004/checkout')
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

        const data = { anbr: this.state.anbr, aid: this.state.aid }
        e.preventDefault()
        axios.post('http://localhost:3004/checkout', data)
            .then(response => {
                console.log(response)
            })

        this.setState({
            aid: '',
            anbr: '',
            
        })

    }
    


    render() {
        //const {posts} =this.state
        //const { id, title, author } = this.state
        const { anbr, aid } = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <h3 className="m-3 d-flex justify-content-center">Check Out</h3>

                    <div className="row hdr" >
                        
                        <div className="col-sm-2 form-group">
                            <input
                                type='text'
                                name='anbr'
                                placeholder="Associate nbr"
                                onChange={this.changeHandler}
                                value={anbr}></input>
                        </div>
                        <div className="col-sm-2 form-group">
                            <input
                                type='text'
                                name='aid'
                                placeholder="Asset id"
                                onChange={this.changeHandler}
                                value={aid}></input>
                        </div>
                        <div className="col-sm-2 form-group">
                            <button type='submit' style={{ background:"#161515", color:'white', width:'100px'}}>Add</button>&nbsp;&nbsp;&nbsp;
                        </div>

                    </div><br />

                    <Table class="center" stiped bordered hover size="sm">

                        <thead >

                            <tr className="align1" style={{ background: "#161515", color: 'white' }}>
                                <th>Id</th>
                                <th >Associate nbr</th>
                                <th >Associate Id</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.posts.map((p, index) => {
                                    return <tr key={index} style={{ textAlign: 'center' }}>
                                        <th >{p.id}</th>
                                        <th>{p.anbr}</th>
                                        <th>{p.aid}</th>


                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>


                </form>

            </div>
        )
    }
}

export default CheckOut