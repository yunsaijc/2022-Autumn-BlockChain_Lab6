import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import { CalendarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import contract from '../../contracts/contract'

const data = [
];

class ConfList extends (Component) {

  constructor(){
    super()
    this.state={loading: false}
  }

  componentDidMount(){
    //先执行一遍查询操作
    contract.methods.queryConfList()
    .call({from:window.web3.eth.accounts[0]},(err,res)=>{
      //将返回的数组依次压入data中
      this.setState({loading: true});
      if(res != null){
        for(var i=0;i<res.length;i=i+2){
            data.push({title:res[i],detail:res[i+1]});
        }
      }
      else{
          data.push({title:'null',detail:'null'})
      }
    })
    .then(()=>{
      //更新状态，使页面数据重新渲染
      this.setState({loading: false});
    });

    //订阅NewConference事件
    contract.events.NewConference({
        filter: {}, 
        fromBlock: window.web3.eth.getBlockNumber()
    }, (error, event)=>{
      this.setState({loading: true});
      //NewConference事件的returnValues即为合约中emit的会议title和detail
      //将新的会议信息压入data中
      data.push({title:event.returnValues[0],detail:event.returnValues[1]});
      this.setState({loading: false});
     })
    }
    
  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        loading={this.state.loading}
        pagination={{ pageSize: 5, simple: 'true' }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<CalendarOutlined />} />}
              title={item.title}
              description={item.detail}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default ConfList