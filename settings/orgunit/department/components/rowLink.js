import React, { Component } from 'react'

class RowLink extends Component{


	handleClick(e){

	}

	handleDelete(e){

	}

	render(){

		return(
			  <div className="rowLinkBorder">	
			 		 <table className="griddle-row-table">
						<tbody>
							<tr>
								<td className="griddle-row-table-td2"><h4>{this.props.rowData.desc} </h4></td>								
								<td className="griddle-row-table-td3">
									<button type="button" className="btn btn-default btn-sm" onClick={this.handleClick.bind(this)} ><i className="fa fa-pencil"></i></button>&nbsp;
									<button type="button" className="btn btn-default btn-sm" onClick={this.handleDelete.bind(this)}><i className="fa fa-trash"></i></button>				
								</td>
							</tr>
						</tbody>
					</table>						  									
			  </div>
			)
	}
}



export default RowLink