import React, { Component } from 'react';
import service from '../services/services'


const ListItem = ({status, onDelete, callSelect, callChecked})=> {

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-10"><input type="checkbox" id="cbox2" checked={status.checked} onChange={callChecked} />  {status.name} </div>
        <div className="col-md-1"><a className="btn btn-link" onClick={callSelect}>Edit</a></div>
        <div className="col-md-1"><a className="btn btn-link" onClick={onDelete}>Delete</a></div>
      </div>
    </li>
  )

}


const Item = ({onChange, insert, name, clear, id, update}) => {
  return (

      <form className="form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Status Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="statusHelp"
                 placeholder="Enter name" value={name} onChange={onChange}/>
            <small id="statusHelp" className="form-text text-muted">Status Name</small>
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={clear}>Clear</button>
          <button style={{marginLeft:15}} type="button" className="btn btn-primary" onClick={!id? insert: update}>{!id ? 'Add' : 'Update'}</button>
        </div>
      </form>

  )
}


class MainContainer extends Component{

  state = {
    list:[],
    name: '',
    id:null
  }

  onClear = () => this.setState({name:'', id:null})

  onChange = (e) => this.setState({name:e.target.value})

  onSelected = (id) => {
    const {list} = this.state;

    const idx = list.findIndex(item => item.id === id);
    const name = list[idx].name;
    this.setState({id, name})

  }

  getAllStatus = () => {
    service.getAllStatus().then((data)=>{
      const {statusList} = data;

      this.setState({list: statusList})
    })
  }

  onDelete = (id) => {
    service.deleteStatus(id).then((data)=>{
      const {statusList} = data;
      this.setState({list: statusList})
    })
  }

  onUpdate = () => {
    const {name, id} = this.state;

    const idx = this.state.list.findIndex(item => item.id === id);

    const status =  {...this.state.list[idx], name};

    service.updateStatus(status).then((data)=>{
      const {statusList} = data;
      this.setState({list: statusList, name:'', id:null})
    })
  }

  onUpdateChecked = (status) => {
    service.updateStatus(status).then((data)=>{
      const {statusList} = data;
      this.setState({list: statusList, name:'', id:null})
    })
  }

  onInsert = ( ) => {

    const { name} = this.state;

    const status = {name}

    service.addStatus( status).then((data)=>{
      const {statusList} = data;
      this.setState({list: statusList, name:'', id:null})
    })
  }

  onChecked = (id) => {
    const {list} = this.state;

    const idx = list.findIndex(item => item.id === id);

    const item = this.state.list[idx];

    const status = { ...item, checked: !item.checked}

    this.onUpdateChecked(status);

  }

  componentDidMount() {
     this.getAllStatus();
  }

  render(){
    const {list, name, id} = this.state;

    const listView = list && list.length > 0 ? list.map(
      (item,i) => {
                      const callDelete = () => this.onDelete(item.id);
                      const callSelect = () => this.onSelected(item.id);
                      const callChecked = () => this.onChecked(item.id);
                      return(<ListItem key={i} status={item} onDelete={callDelete} callSelect={callSelect} callChecked={callChecked} />)
    }): null

    return(
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-8 col-lg-6">
            <h1>My ToDo</h1>
          </div>
        </div>
        <ul className="list-group">
          {listView}
        </ul>
        <div className="container" style={{marginTop:30}}>
          <div className="row justify-content-md-center">
            <div className="col-8">
              <Item onChange={this.onChange} name={name} id={id} insert={this.onInsert} clear={this.onClear} update={this.onUpdate} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainContainer;