import * as ACT from './actionTypes'
import moment from 'moment'

// ********************************************************************************
// LISTS  moment().year(),	
// ********************************************************************************
export function loadList(){	
	return{
		type: ACT.POL_LOAD_LIST,
		isFetching: true,
		isFetchFailed: false,		
		message: '',		
		hasError: false
	}
}

export function loadListSuccess(data){
	return{
		type: ACT.POL_LOAD_LIST_SUCCESS,
		isFetching:false,
		isFetchFailed: false,	
		message: '',
		hasError: false,		
		data
	}
}

export function loadListFailed(message){
	return{
		type: ACT.POL_LOAD_LIST_FAILED,
		isFetching: false,
		isFetchFailed: true,
		hasError: false,
		message
	}
}

export function fetchPolicy(){	
	let pol = [
				{ "id":1,"description": 'Regular Schedule', "scheduleid": 0, "isdefault": true},
				{ "id":2,"description": 'Night Shift', "scheduleid": 0, "isdefault": false},
			] 

	let sched = [ 
					{ value: 0, label: 'Regular' },
					{ value: 1, label: 'Early Morning' },
					{ value: 2, label: 'Night' },
					{ value: 3, label: 'Broken' }								
				]

	let fakedata = { "policies" : pol, "schedules": sched }

	return dispatch=>{
		dispatch(loadList())
		return setTimeout(()=>{
			dispatch(loadListSuccess(fakedata))	
			//dispatch(loadListFailed("test error"))
		}, 1000)
		// fetch('http://localhost:8081/policy/'+ year)
		// .then(response=>response.json()
		// 	.then(ret=>({ ret, response }))
		//  ).then(({ ret, response })=>{		 	
		//  	if (parseInt(ret.status)==1){
		// 		dispatch(loadListSuccess(ret.data))	
		//  	}else{
		//  		dispatch(loadListFailed(data.message))
		//  	}		 	
		//  })
		// .catch(error => { 
		// 	dispatch(loadListFailed('Database error'))			
		// })
	}
}


// ********************************************************************************
//  FORM
// ********************************************************************************
export function loadAddForm(data, title){
	return{
		type: ACT.POL_LOAD_ADD_FORM,
		editMode: false,
		title: title,
		isFetching: false,
		isSaving: false,
		hasError: false,
		message: '',
		saveAddSuccess: false,
		data
	}
}

export function loadFormSuccess(data){
	return{
		type: ACT.POL_LOAD_FORM_SUCCESS,	
		isFetching: false,
		data
	}
}

export function loadFormFailed(message){
	return{
		type: ACT.POL_LOAD_FORM_FAILED,	
		isFetching: false,
		hasError: true,
		message
	}
}

export function loadEditForm(title){
	return{
		type: ACT.POL_LOAD_EDIT_FORM,
		editMode: true,
		title: title,
		isFetching: true,
		isSaving: false,
		hasError: false,
		message: '',		
		updateSuccess: false
	}
}

export function loadEdit(id,title){
	return dispatch=>{
		dispatch(loadEditForm(title))		
		fetch('http://localhost:8081/policy/edit/'+id)
		.then(response=>response.json()
			.then(ret=>({ ret, response }))
		 ).then(({ ret, response })=>{				 		 	 	
		 	if (parseInt(ret.status)==1){			 		
		 		ret.data.transdate= moment(ret.data.transdate)
		 		if (!_.isEmpty(ret.data.requiredworkdate)){
					ret.data.requiredworkdate= moment(ret.data.requiredworkdate)
		 		}		 		
				dispatch(loadFormSuccess(ret.data))	
		 	}else{
		 		dispatch(loadFormFailed(ret.message))
		 	}		 	
		 })
		.catch(error => { 
			dispatch(loadFormFailed('Database error'))			
		})
	}
}

export function saveForm(){
	return{
		type: ACT.POL_SAVE_FORM,
		isSaving: true,
		hasError: false,
		saveAddSuccess: false
	}
}

export function saveSuccessForm(data){
	return{
		type: ACT.POL_SAVE_SUCCESS_FORM,
		isSaving: false,
		hasError: false,
		saveAddSuccess: true,
		updateSuccess: false,
		data
	}
}

export function updateSuccessForm(data){
	return{
		type: ACT.POL_UPDATE_SUCCESS_FORM,
		isSaving: false,
		hasError: false,
		saveAddSuccess: false,
		updateSuccess: true,
		data
	}
}

export function saveFailedForm(message){
	return{
		type: ACT.POL_SAVE_FAILED_FORM,
		isSaving: false,
		hasError: true,		
		message
	}
}

export function valueChangeForm(data, field, value){
	return{
		type: ACT.POL_FORM_VALUE_CHANGED,
		isSaving: false,
		hasError: false,
		message: '',
		data,
		field,
		value
	}
}

export function savePolicy(data, editMode){
	
	let tmpData = Object.assign({}, data)		
	if (!_.isEmpty(tmpData.requiredworkdate)){
		tmpData.requiredworkdate = tmpData.requiredworkdate.format('YYYY/MM/DD HH:mm:ss')	
	}else{
		tmpData.requiredworkdate = null
	}
	if (typeof tmpData.holidaytype=='object'){
		tmpData.holidaytype = tmpData.holidaytype.value	
	}
		    	
	let dataForm = {
		    method: 'POST',
		    headers: { 
		    	 'Accept': 'application/json',
	        	 'Content-Type': 'application/json',
		    },
		    body: JSON.stringify({
		    	id : tmpData.id,		
		    	transyear: tmpData.transyear,    	
		    	description: tmpData.description,
		    	transdate: tmpData.transdate.format('YYYY/MM/DD HH:mm:ss'), 
		    	holidaytype: tmpData.holidaytype,
		    	requiredworkdate: tmpData.requiredworkdate
		    })
  		}	  	

  	let url = 'http://localhost:8081/policy/add'
  	if (editMode==true){
  		url='http://localhost:8081/policy/update'
  	}
	return dispatch=>{
		dispatch(saveForm())		
		fetch(url, dataForm)
		.then(response=>response.json()
			.then(ret=>({ ret, response }))
		 ).then(({ ret, response })=>{		 	
		 	if (parseInt(ret.status)==1){			 		
		 		if (editMode==true) {		 			
		 			dispatch(updateSuccessForm(data))				 			
		 		}else{		 			
		 			data.id = ret.data.id		 					 				 			 
		 			dispatch(saveSuccessForm(data))		
		 		}				
		 	}else{
		 		dispatch(saveFailedForm(ret.message))		 			 		
		 	}
		 	
		 })
		.catch(error => { 					
			dispatch(saveFailedForm(error))			
		})
	}

}

export function loadDeleteDialog(id, msg){
	return{
		type: ACT.POL_LOAD_DELETE_DIALOG,
		isDeleteDialogOpen: true,
		isDeleting: false,
		deleteHasError: false,
		deleteErrorMsg: '',
		deleteSuccess: false,
		id,
		msg		
	}
}

export function cancelDelete(){
	return{
		type: ACT.POL_CANCEL_DELETE,
		isDeleteDialogOpen: false,
		isDeleting: false,
		deleteHasError: false,
		deleteSuccess: false,
		deleteErrorMsg:'',
		deleteId: 0
	}
}

export function deleteAttempt(){
	return{
		type: ACT.POL_DELETE_ATTEMPT,
		isDeleting: true,
		deleteHasError: false,
		deleteSuccess: false,
		deleteErrorMsg:''
		
	}
}
export function deleteFailed(message){
	return{
		type: ACT.POL_DELETE_FAILED,
		isDeleting: false,
		deleteHasError: true,	
		deleteSuccess: false,
		message
	}
}

export function deleteSuccess(id){
	return{
		type: ACT.POL_DELETE_SUCCESS,
		isDeleteDialogOpen: false,
		isDeleting: false,
		deleteHasError: false,
		deleteSuccess: true,
		deleteErrorMsg:'',
		deleteSuccess: true,
		updateSuccess: false,
		saveAddSuccess: false,
		id
	}
}

export function deletePolicy(id){
	return dispatch=>{
		dispatch(deleteAttempt())		
		fetch('http://localhost:8081/policy/delete/'+id)
		.then(response=>response.json()
			.then(ret=>({ ret, response }))
		 ).then(({ ret, response })=>{		 	
		 	if (parseInt(ret.status)==1){
				dispatch(deleteSuccess(id))	
		 	}else{
		 		dispatch(deleteFailed(data.message))
		 	}		 	
		 })
		.catch(error => { 
			dispatch(deleteFailed('Database error'))			
		})
	}
}



