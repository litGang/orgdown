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
			{path: 'repertory', component: RepertoryIndex},
			{path: 'note', component: NoteShow},
			{path: 'editor/:noteId', component: Studio},
			{path: 'login', component: Login},
		]
	}
];
