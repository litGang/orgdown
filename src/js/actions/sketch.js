export const INIT_EDITOR = 'INIT_EDITOR';
import db from "../../../main/database";

export function initEditor(sketchId) {
    return function(dispatch) {
		db.docs.findOne({_id: sketchId}).exec( function (err, sketch) {
		    dispatch({
				type: INIT_EDITOR,
				data: sketch
		    });
		});
    }
}