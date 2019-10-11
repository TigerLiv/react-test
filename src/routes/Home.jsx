import React,{PureComponent} from 'react';

export default class Home extends PureComponent{
    componentDidMount(){
        fetch('/api/list',{ 
            headers: { 'Content-Type': 'application/json;charset=UTF-8'}
        }).then(res=>{
            // console.log(res.json())
            res.json().then(data=>{
                console.log(data)
            })
        })
    }
    render() {
        return (
            <div> hello world</div>
        )
    }
}