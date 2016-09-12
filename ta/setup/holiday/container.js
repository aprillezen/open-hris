import { connect } from 'react-redux'
import { fetchHoliday,loadAddForm,valueChangeForm,saveFailedForm,
		 saveHoliday,loadEdit,
		 loadDeleteDialog, cancelDelete} from './actions'
import List from './components/list'
import HolidayForm from './components/holidayForm'

const mapStateToProps = (state)=>{
	
	return{
		isFetching: state.holiday.isFetching,
		isFetchFailed: state.holiday.isFetching,
		hasError: state.holiday.hasError,
		message: state.holiday.message,
		data: state.holiday.data,
		deleteSuccess: state.holiday.deleteSuccess,
		deletemsg: state.holiday.deletemsg
	}
}

const mapDispatchToProps= (dispatch)=>{
	return {
		fetch: ()=>{
			dispatch(fetchHoliday())
		}
	}

}

export const HolidayListContainer = connect(mapStateToProps, mapDispatchToProps)(List)

const mapStateToPropsForm=(state)=>{
	return{
		editMode : state.holidayForm.editMode,
		isFetching : state.holidayForm.isFetching,	
		isSaving : state.holidayForm.isSaving,
		hasError : state.holidayForm.hasError,
		message : state.holidayForm.message,
		data : state.holidayForm.data,		
		title: state.holidayForm.title,		
		saveAddSuccess: state.holidayForm.saveAddSuccess,
		updateSuccess: state.holidayForm.updateSuccess
	}
}

const mapDispatchToPropsForm = (dispatch)=>{
	const blankdata = { 
						"id": 0, 
						"transyear":'', 						
						"description":'',
						"transdate":'',
						"holidaytype": 0						
					   }
	return {
		add: ()=>{
			dispatch(loadAddForm(blankdata, "Create new holiday"))
		},
		save: (data,editMode)=>{
			dispatch(saveHoliday(data, editMode))
		},
		valueChanged: (data, field, value)=>{
			dispatch(valueChangeForm(data, field, value))
		},
		saveFailed: (message)=>{
			dispatch(saveFailedForm(message))
		},	 
	 	edit: (id)=>{
	 		dispatch(loadEdit(id,"Edit shift"))
	 	}
	}

}

export const HolidayFormContainer = connect(mapStateToPropsForm, mapDispatchToPropsForm)(HolidayForm)





