// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
import React from "react";
import {Route, IndexRoute} from "react-router";
import Orgdown from "./components/Orgdown";
import NoteIndex from "./components/notes/NoteIndex";
import NoteShow from "./components/notes/NoteShow";
import Editor from "./components/editor/Editor";
import Studio from "./components/editor/Studio";
import Ace from "./components/editor/Ace";
import Login from './components/user/Login';
import RepertoryIndex from './components/repertory/RepertoryIndex'

export let routes = [
	{
		path: '/', component: Orgdown, indexRoute: {component: NoteIndex},
		childRoutes: [
			{path: 'dashboard', component: NoteIndex},
			{path: 'repertory/:nodeId', component: RepertoryIndex},
			{path: 'note/:nodeId', component: NoteShow},
			{path: 'editor/:nodeId', component: Studio},
			{path: 'login', component: Login},
		]
	}
];
