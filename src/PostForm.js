import React, { Component } from 'react'
import axios from "axios";
import { Table } from "react-bootstrap";
import './Table.css';
import { Label } from 'reactstrap';

class PostForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
           userId:'',
           title:'',
           body:''
        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   /*  //http://localhost:3004/posts/
    componentDidMount() {
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
    } */

    submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3004/posts1', this.state)
            .then(response => {
                console.log(response)
            })
    }
   
    render() {
        const { userId, title, body } = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input
                            type='text'
                            name='userId'
                            onChange={this.changeHandler}
                            value={userId}></input>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='title'
                            onChange={this.changeHandler}
                            value={title}></input>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='body'
                            onChange={this.changeHandler}
                            value={body}></input>
                    </div>
                    <button type='submit'>Submit Now</button>
                </form>
            </div>
        )
    }
}

export default PostForm