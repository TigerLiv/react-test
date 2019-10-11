import React,{PureComponent} from 'react';

export default class Home extends PureComponent{
    componentDidMount(){
        fetch('/api/list').then(res=>{
            console.log(res)
        })
    }
    render() {
        return (
            <div> hello world</div>
        )
    }
}