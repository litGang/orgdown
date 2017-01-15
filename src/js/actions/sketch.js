export const INIT_EDITOR = 'INIT_EDITOR';
import db from "../../../main/database";

export function initEditor(nodeId) {
	return function (dispatch) {
		db.nodes.findOne({ _id: nodeId }).exec(function (err, node) {
			dispatch({
				type: INIT_EDITOR,
				data: node
			});
		});
	}
}