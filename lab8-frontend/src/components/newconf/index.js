import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import contract from "../../contracts/contract"

class NewConf extends (Component) {
  render() {
    return (
      <Form>
        <Form.Field>
          <input placeholder="Title" value={this.props.title} onChange={this.props.handleChange} />
        </Form.Field>
        <Form.Field>
          <input placeholder="Detail" value={this.props.detail} onChange={this.props.handleChange} />
        </Form.Field>
        <Form.Field>
          <input placeholder="Limitation" value={this.props.limitation} onChange={this.props.handleChange} />
        </Form.Field>
        <Button type='submit' onClick={()=>{this.props.submit(this.props.title,this.props.detail,this.props.limitation)}}>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return (
    {
      title: state.newconf.title,
      detail: state.newconf.detail,
      limitation: state.newconf.limitation,
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit(title,detail,limitation) {
      contract.methods.newConference(title,detail,limitation) //输入参数
      .send({from:window.web3.eth.accounts[0]},function(err,res){console.log(res)})  //function中的res为方法返回值
      .then((res)=>console.log(res)); //该res为交易执行完后的具体交易信息，如TxHash等

      dispatch({
        type: 'submit_newconf'
      })
    },

    handleChange(e) {
      switch (e.target.placeholder) {
        case 'Title':
          dispatch({
            type: 'newconf_title',
            value: e.target.value
          })
          break;
        case 'Detail':
          dispatch({
            type: 'detail',
            value: e.target.value
          })
          break;
        case 'Limitation':
          dispatch({
            type: 'limitation',
            value: e.target.value
          })
          break;
        default:
          break;
      }
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewConf)