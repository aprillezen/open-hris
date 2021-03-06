import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './app/Routes'
import { createStore, combineReducers, applyMiddleware , compose} from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import loginreducer from './login/reducer'
import profilereducer from './settings/company/profile/reducer'
import {jobTitleReducer, jobFormReducer} from './settings/company/jobtitles/reducer'
import {departmentReducer, deptFormReducer} from './settings/orgunit/department/reducer'
import {branchReducer, branchFormReducer } from './settings/orgunit/branches/reducer'
import { emp_list_reducer,emp_add_form_reducer, emp_general_reducer,emp_employment_reducer } from './employees/reducer'
import {leavetypeReducer,leavetypeFormReducer} from './leave/setup/lt/reducer'
import {taxStatusReducer, taxStatusFormReducer} from './payroll/setup/taxstatus/reducer'

import {shiftReducer, shiftFormReducer} from './ta/setup/shift/reducer'
import {holidayReducer, holidayFormReducer} from './ta/setup/holiday/reducer'
import {policyReducer, policyFormReducer} from './ta/setup/policies/reducer'

import {dailyIOReducer} from './ta/attendance/daily/reducer'

const routermiddleware = routerMiddleware(browserHistory)

const rootReducer = combineReducers({
	policy: policyReducer,
	policyForm:policyFormReducer,
	dailyio: dailyIOReducer,
	holiday: holidayReducer,
	holidayForm: holidayFormReducer,
	shift: shiftReducer,
	shiftForm: shiftFormReducer,
	taxstatusForm: taxStatusFormReducer,
	taxstatus: taxStatusReducer,
	taxstatusForm: taxStatusFormReducer,
	leavetype: leavetypeReducer,
	leavetypeForm: leavetypeFormReducer,
	jobtitle: jobTitleReducer,
	jobtitleForm: jobFormReducer,
	department: departmentReducer,
	departmentForm: deptFormReducer,
	branch: branchReducer,
	branchForm: branchFormReducer,
	employees: emp_list_reducer,
	employeeForm: emp_add_form_reducer,
	employeeGeneral: emp_general_reducer,
	employeeEmployment: emp_employment_reducer,
	login: loginreducer,
	profile: profilereducer,
	routing: routerReducer
})

const store = createStore(
				rootReducer,
				compose(applyMiddleware(thunkMiddleware, routermiddleware),window.devToolsExtension && window.devToolsExtension())
			  )

const history = syncHistoryWithStore(browserHistory, store)

render(
	<Provider store={store}>
  		<Router routes={routes} history={history}/>
	</Provider>,
  document.getElementById('app')
)
