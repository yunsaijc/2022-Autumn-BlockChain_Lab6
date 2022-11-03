import React, { Component } from 'react'
import { List } from 'antd'
import 'antd/dist/antd.css'
import contract from '../../contracts/contract'
import { connect } from 'react-redux'

const data = [

];

class MyConf extends (Component) {

  constructor(){
    super()
    this.state={loading: false}
  }

  componentDidMount(){
    contract.methods.queryMyConf()
    .call({from:window.web3.eth.accounts[0]},(err,res)=>{
        //将返回的数组依次压入data中
        this.setState({loading: true});
        if(res != null){
            for(var i=0;i<res.length;i=i+1){
                data.push({'title': res[i]});
            }
        }
        else{
            data.push({'title': 'no'});
        }
    })
    .then(()=>{
        //更新状态，使页面数据重新渲染
        this.setState({loading: false});
    });
  }
  
  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        loading={this.state.loading}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default MyConf