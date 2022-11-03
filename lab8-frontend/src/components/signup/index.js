import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import contract from '../../contracts/contract'

class SignUp extends (Component) {
  render() {
    return (
      <Form>
        <Form.Field>
          <input placeholder='username' value={this.props.username} onChange={this.props.handleChange} />
        </Form.Field>
        <Form.Field>
          <input placeholder='extra' value={this.props.extra} onChange={this.props.handleChange} />
        </Form.Field>
        <Button type='submit' onClick={()=>{this.props.submit(this.props.username,this.props.extra)}}>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return (
    {
      username: state.signup.username,
      extra: state.signup.extra
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit(username,extra) {
      contract.methods.signUp(username,extra) //调用合约signUp方法
      .send({from:window.web3.eth.accounts[0]},function(err,res){console.log(res)})  //function中的res为方法返回值
      .then((res)=>console.log(res)); //该res为交易执行完后的具体交易信息，如TxHash等

      dispatch({
        type: 'submit_signup'
      })
    },

    handleChange(e) {
      if (e.target.placeholder === 'username')
        dispatch({
          type: 'username',
          value: e.target.value
        })
      else
        dispatch({
          type: 'extra',
          value: e.target.value
        })
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)