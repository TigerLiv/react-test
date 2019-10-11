import React,{PureComponent} from 'react';

export default class Home extends PureComponent{
    componentDidMount(){
        fetch('http://localhost:5000/api/list').then(res=>{
            console.log(res)
        })
    }
    render() {
        return (
            <div> hello world</div>
        )
    }
}