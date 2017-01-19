// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
import React from "react";
import {Route, IndexRoute} from "react-router";

import Orgdown from './components/Orgdown';
import NoteBook from './components/notebook/NoteBook';

export let routes = [
	{
		path: '/', component: Orgdown, indexRoute: {component: NoteBook},
		childRoutes: [
			// {path: 'login', component: Login},
		]
	}
];
