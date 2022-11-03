import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import contract from "../../contracts/contract"

class Delegate extends (Component) {
  render() {
    return (
      <Form>
        <Form.Field>
          <input placeholder="trustee's address" value={this.props.address} onChange={this.props.handleChange} />
        </Form.Field>
        <Button type='submit' onClick={()=>{this.props.submit(this.props.address)}}>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return (
    {
      address: state.delegate.address,
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit(address) {
      //调用合约
      contract.methods.delegate(address)
      .send({from: window.web3.eth.accounts[0]}, function(err, res){console.log(res)})
      .then((res) => console.log(res));
      dispatch({
        type: 'submit_delegate'
      })
    },

    handleChange(e) {
      dispatch({
        type: 'address',
        value: e.target.value
      })
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Delegate)