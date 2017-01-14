// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
import {
	SESSION_INIT,
	SESSION_LOGIN_SUCCESS,
	NAV_PEEK,
	NAV_ACTIVATE,
	NAV_ENABLE,
	NAV_RESPONSIVE,
	ROUTE_CHANGED
} from "../actions/actions";

const initialState = {
	active: true, // start with nav active
	enabled: true, // start with nav disabled
	responsive: 'multiple',
	peek: false,
	items: [
		{
			path: '/dashboard', label: '首页',
			excludeRole: 'virtualization user'
		},
		{path: '/repertory', label: '知识库'},
		{path: '/activity', label: '标签库'},
		{path: '/editor', label: '文档'},
		{path: '/login', label: '备份', excludeRole: 'virtualization user'},
		{
			path: '/virtual-machine-sizes', label: '发布文章',
			excludeRole: 'virtualization user'
		},
		{
			path: '/settings/edit', label: '设置',
			excludeRole: 'virtualization user'
		}
	]
};

const handlers = {
	[SESSION_INIT]: (state, action) => {
		let result = {};
		if (action.role) {
			result.items = initialState.items.filter((item) => {
				return item.excludeRole !== action.role;
			});
		}
		return result;
	},

	[SESSION_LOGIN_SUCCESS]: (state, action) => {
		let result = {};
		if (action.role) {
			result.items = initialState.items.filter((item) => {
				return item.excludeRole !== action.role;
			});
		}
		return result;
	},

	[NAV_PEEK]: (_, action) => ({peek: action.peek}),

	[NAV_ACTIVATE]: (_, action) => (
		{active: action.active, activateOnMultiple: null}
	),

	[NAV_ENABLE]: (_, action) => (
		{enabled: action.enabled}
	),

	[NAV_RESPONSIVE]: (state, action) => {
		let result = {responsive: action.responsive};
		if ('single' === action.responsive && state.active) {
			result.active = false;
			result.activateOnMultiple = true;
		} else if ('multiple' === action.responsive && state.activateOnMultiple) {
			result.active = true;
		}
		return result;
	},

	[ROUTE_CHANGED]: (state, action) => {
		return ('single' === state.responsive && state.active) ?
			{active: false} : {};
	}
};

export default function navReducer(state = initialState, action) {
	let handler = handlers[action.type];
	if (!handler) return state;
	return {...state, ...handler(state, action)};
}
