import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import contract from "../../contracts/contract"

class Enroll extends (Component) {
  render() {
    return (
      <Form>
        <Form.Field>
          <input placeholder="Title of Conference" value={this.props.title} onChange={this.props.handleChange} />
        </Form.Field>
        <Button type='submit' onClick={()=>{this.props.submit(this.props.title)}}>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return (
    {
      title: state.enroll.title,
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit(title) {
    contract.methods.enroll(title) //输入参数
    .send({from:window.web3.eth.accounts[0]},function(err,res){console.log(res)})  //function中的res为方法返回值
    .then(); //该res为交易执行完后的具体交易信息，如TxHash等

    dispatch({
        type: 'submit_enroll'
      })
    },

    handleChange(e) {
      dispatch({
        type: 'enroll_title',
        value: e.target.value
      })
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Enroll)