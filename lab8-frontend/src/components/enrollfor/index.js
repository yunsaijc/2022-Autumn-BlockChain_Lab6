import React, { Component, useReducer } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import contract from "../../contracts/contract"

class EnrollFor extends (Component) {
  render() {
    return (
      <Form>
        <Form.Field>
          <input placeholder="Title of Conference" value={this.props.title} onChange={this.props.handleChange} />
        </Form.Field>
        <Form.Field>
          <input placeholder="Username" value={this.props.username} onChange={this.props.handleChange} />
        </Form.Field>
        <Button type='submit' onClick={()=>{this.props.submit(this.props.username,this.props.title)}}>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return (
    {
      title: state.enrollfor.title,
      username: state.enrollfor.username
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit(username,title) {
      //在此调用合约
      contract.methods.enrollFor(username, title)
      .send({from: window.web3.eth.accounts[0]}, function(err, res){console.log(res)})
      .then((res) => console.log(res));
      dispatch({
        type: 'submit_enrollfor'
      })
    },

    handleChange(e) {
      if (e.target.placeholder === 'Title of Conference')
        dispatch({
          type: 'enrollfor_title',
          value: e.target.value
        })
      else
        dispatch({
          type: 'enrollfor_username',
          value: e.target.value
        })
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EnrollFor)